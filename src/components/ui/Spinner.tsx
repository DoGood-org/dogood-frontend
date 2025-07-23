'use client';
import React, { JSX } from 'react';

const totalDots = 9;

type Props = {
  color?: string;
};

export const Spinner = (props: Props): JSX.Element => {
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        position: 'relative',
        animation: 'sk-chase 4s linear infinite',
      }}
    >
      <style>
        {`
          @keyframes sk-chase {
            100% { transform: rotate(360deg); }
          }

          @keyframes sk-chase-dot {
            50%, 100% { transform: rotate(360deg); }
          }

          @keyframes sk-chase-dot-before {
            0%, 50% { transform: scale(1.0); }
            50% { transform: scale(0.2); }
          }
        `}
      </style>

      {Array.from({ length: totalDots }).map((_, i) => {
        const delay = -1.1 + i * 0.1;

        return (
          <div
            key={i}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              animation: 'sk-chase-dot 3s ease-in-out infinite',
              animationDelay: `${delay}s`,
            }}
          >
            <div
              style={{
                display: 'block',
                width: '25%',
                height: '25%',
                backgroundColor: props.color || '#000',
                borderRadius: '50%',
                animation: 'sk-chase-dot-before 3s ease-in-out infinite',
                animationDelay: `${delay}s`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
