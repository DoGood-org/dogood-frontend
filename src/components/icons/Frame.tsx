import type { SVGProps } from 'react';
const Frame = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <mask
      id="prefix__b"
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
      mask="url(#prefix__b)"
    >
      <path d="M21 28h6M21 24h6M27.2 16h4c.212 0 .416.087.566.242a.84.84 0 0 1 .234.584v17.348a.84.84 0 0 1-.234.584.79.79 0 0 1-.566.242H16.8a.79.79 0 0 1-.566-.242.84.84 0 0 1-.234-.584V16.826c0-.219.084-.43.234-.584A.79.79 0 0 1 16.8 16h4M20 16v-.667c0-.884.421-1.732 1.172-2.357S22.939 12 24 12s2.078.351 2.828.976S28 14.45 28 15.333V16z" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h48v48H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Frame;
