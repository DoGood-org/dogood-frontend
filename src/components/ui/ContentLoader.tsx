'use client';
import React, { useState, useEffect } from 'react';

type TrailDotProps = {
  delay: string;
  opacity: number;
  uniqueKey: number;
};

const TrailDot = ({
  delay,
  opacity,
  uniqueKey,
}: TrailDotProps): React.ReactElement => (
  <div
    key={uniqueKey + delay}
    className="absolute top-1/2 left-1/2"
    style={{
      animation: 'orbit 2s linear',
      animationDelay: delay,
      animationFillMode: 'forwards',
      transformOrigin: 'center',
    }}
  >
    <span
      className="block w-2 h-2 bg-foreground rounded-full"
      style={{
        transform: 'translateX(40px)',
        opacity,
      }}
    />
  </div>
);

const createTrail = (startDelay = 0, key: number): React.ReactElement[] =>
  Array.from({ length: 6 }).map((_, i) => {
    const delay = `${(i * 0.1 + startDelay).toFixed(2)}s`;
    const opacity = 1 - i * 0.15;
    return (
      <TrailDot
        key={`${key}-${startDelay}-${i}`}
        delay={delay}
        opacity={opacity}
        uniqueKey={key}
      />
    );
  });

const ContentLoader: React.FC = () => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 3000); // 2s анімація + 1s пауза
    return (): void => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="relative w-16 h-16">
        {createTrail(0, animationKey)}
        <div
          style={{
            position: 'absolute',
            top: '63%',
            left: '50%',
            width: '100%',
            height: '100%',
            transform: 'translate(-50%, -50%) rotate(180deg)',
            transformOrigin: 'center',
          }}
        >
          {createTrail(0, animationKey)}
        </div>
      </div>
    </div>
  );
};

export default ContentLoader;
