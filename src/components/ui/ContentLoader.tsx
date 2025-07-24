'use client';
import React from 'react';

type TrailDotProps = {
  delay: string;
  opacity: number;
};

const TrailDot = ({ delay, opacity }: TrailDotProps): React.ReactElement => (
  <div
    className="absolute top-1/2 left-1/2"
    style={{
      animation: 'orbit 1s linear infinite',
      animationDelay: delay,
      transformOrigin: 'center',
      transform: 'rotate(0deg) translate(-50%, -50%)',
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

const createTrail = (startDelay = 0): React.ReactElement[] =>
  Array.from({ length: 6 }).map((_, i) => {
    const delay = `${(i * 0.1 + startDelay).toFixed(2)}s`;
    const opacity = 1 - i * 0.15;
    return (
      <TrailDot key={`${startDelay}-${i}`} delay={delay} opacity={opacity} />
    );
  });

const ContentLoader: React.FC = () => (
  <div className="flex items-center justify-center w-screen h-screen">
    <div className="relative w-16 h-16">
      {createTrail(0)}
      {createTrail(0.5)}
    </div>
  </div>
);

export default ContentLoader;
