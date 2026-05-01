import type { SVGProps } from 'react';

const Bell = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <mask
      id="prefix__bell"
      width={48}
      height={48}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <path
        fill="#fff"
        d="M40 0H8a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h32a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8"
      />
    </mask>
    <g
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      mask="url(#prefix__bell)"
    >
      <path d="M21 31c0 .796.369 1.559 1.025 2.121.657.563 1.547.879 2.475.879s1.819-.316 2.475-.879S28 31.796 28 31M30 13c1.703.986 3.084 2.367 4 4M14 17c.916-1.633 2.297-3.014 4-4" />
      <path d="M16.632 22.579c0-2.01.776-3.938 2.158-5.36A7.26 7.26 0 0 1 23.999 15c1.954 0 3.828.799 5.21 2.22a7.7 7.7 0 0 1 2.157 5.359c0 3.77.849 5.958 1.524 7.158a.86.86 0 0 1-.297 1.15.8.8 0 0 1-.409.113h-16.37a.8.8 0 0 1-.408-.115.83.83 0 0 1-.298-.308.86.86 0 0 1 .002-.84c.674-1.2 1.522-3.389 1.522-7.158" />
    </g>
  </svg>
);

export default Bell;
