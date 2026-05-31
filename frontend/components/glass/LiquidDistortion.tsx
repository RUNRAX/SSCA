'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function LiquidDistortion() {
  const baseFreqRef1 = useRef<SVGFETurbulenceElement>(null);
  const baseFreqRef2 = useRef<SVGFETurbulenceElement>(null);
  const baseFreqRef3 = useRef<SVGFETurbulenceElement>(null);
  const baseFreqRef4 = useRef<SVGFETurbulenceElement>(null);
  
  useEffect(() => {
    // Animate the seed of the turbulence to create a flowing liquid effect
    // We only need one object to animate all seeds
    const obj = { seed: 0 };
    gsap.to(obj, {
      seed: 100,
      duration: 25, // Slowed down slightly for smoother effect
      repeat: -1,
      yoyo: true, // Yoyo with sine.inOut creates a more natural ebb and flow
      ease: "sine.inOut",
      onUpdate: () => {
        baseFreqRef1.current?.setAttribute('seed', obj.seed.toString());
        baseFreqRef2.current?.setAttribute('seed', (obj.seed + 100).toString());
        baseFreqRef3.current?.setAttribute('seed', (obj.seed + 200).toString());
        baseFreqRef4.current?.setAttribute('seed', (obj.seed + 300).toString());
      }
    });
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
