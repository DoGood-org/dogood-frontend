import type { SVGProps } from 'react';

const Pig = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <mask
      id="prefix__pig"
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
      mask="url(#prefix__pig)"
    >
      <path
        fill="#00C1AC"
        stroke="#00C1AC"
        strokeWidth={0.25}
        d="M30.5 21.062a1.438 1.438 0 1 1 0 2.876 1.438 1.438 0 0 1 0-2.876Z"
      />
      <path d="M22 17h5M35 13h-9M9 26a3 3 0 0 1 3-3" />
      <path d="M35.543 20H36a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1l-2.263 6.336a1 1 0 0 1-.942.664h-1.59a1 1 0 0 1-.942-.664L28.786 33h-8.572l-.476 1.336a1 1 0 0 1-.943.664h-1.59a1 1 0 0 1-.942-.664l-1.638-4.586A10 10 0 0 1 22 13h4a10 10 0 0 1 9.542 7" />
    </g>
  </svg>
);

export default Pig;
