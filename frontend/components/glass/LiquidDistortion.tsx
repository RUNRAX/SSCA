'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function LiquidDistortion() {
  const baseFreqRef1 = useRef<SVGFETurbulenceElement>(null);
  const baseFreqRef2 = useRef<SVGFETurbulenceElement>(null);
  
  useEffect(() => {
    // Animate the seed of the turbulence to create a flowing liquid effect
    if (baseFreqRef1.current && baseFreqRef2.current) {
      const obj = { seed: 0 };
      gsap.to(obj, {
        seed: 100,
        duration: 20,
        repeat: -1,
        ease: "none",
        onUpdate: () => {
          baseFreqRef1.current?.setAttribute('seed', obj.seed.toString());
          baseFreqRef2.current?.setAttribute('seed', (obj.seed + 100).toString());
        }
      });
    }
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
        {/* We use liquidLight as the default #liquidDistortion for the glass panels */}
        <filter id="liquidDistortion" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
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
