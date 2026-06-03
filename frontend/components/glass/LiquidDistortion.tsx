'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function LiquidDistortion() {
  const baseFreqRef1 = useRef<SVGFETurbulenceElement>(null);
  const baseFreqRef2 = useRef<SVGFETurbulenceElement>(null);
  const baseFreqRef3 = useRef<SVGFETurbulenceElement>(null);
  const baseFreqRef4 = useRef<SVGFETurbulenceElement>(null);
  
  useEffect(() => {
    // Animate the seed at a lower frequency to reduce CPU/GPU load.
    // SVG filter attribute updates are expensive — we throttle by using
    // a longer duration and fewer updates via gsap's ticker lag-smoothing.
    const obj = { seed: 0 };
    const tween = gsap.to(obj, {
      seed: 100,
      duration: 40, // Slower = fewer updates per second
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: () => {
        const s = Math.round(obj.seed); // integer seeds avoid sub-pixel re-raster
        baseFreqRef1.current?.setAttribute('seed', s.toString());
        baseFreqRef2.current?.setAttribute('seed', (s + 100).toString());
        baseFreqRef3.current?.setAttribute('seed', (s + 200).toString());
        baseFreqRef4.current?.setAttribute('seed', (s + 300).toString());
      }
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <svg style={{ width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }}>
      <defs>
        <filter id="liquidLight" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            ref={baseFreqRef1}
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="liquidMedium" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            ref={baseFreqRef2}
            type="fractalNoise"
            baseFrequency="0.015 0.025"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="liquidHeavy" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            ref={baseFreqRef3}
            type="fractalNoise"
            baseFrequency="0.02 0.03"
            numOctaves="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        {/* We use liquidLight as the default #liquidDistortion for the glass panels */}
        <filter id="liquidDistortion" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            ref={baseFreqRef4}
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
