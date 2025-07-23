'use client';
import * as React from 'react';

const createTrail = (count: number, startDelay = 0): React.JSX.Element[] => {
  return [...Array(count)].map((_, i) => {
    const delay = (i * 0.1 + startDelay).toFixed(2);
    const opacity = 1 - i * 0.15;
    return (
      <span
        key={i}
        className="absolute top-80 left-240 w-2 h-2 bg-foreground rounded-full"
        style={{
          transformOrigin: 'center',
          animation: 'orbit 1s linear infinite',
          animationDelay: `${delay}s`,
          opacity: `${opacity}`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  });
};

const DoubleDotSpinner: React.FC = () => {
  return (
    <div className="relative w-16 h-16">
      {createTrail(6, 0)}

      {createTrail(6, 0.5)}
    </div>
  );
};

export default DoubleDotSpinner;
