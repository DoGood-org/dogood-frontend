import type { SVGProps } from 'react';

const List = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <mask
      id="prefix__list"
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
      mask="url(#prefix__list)"
    >
      <path d="M14 14h20M14 24h20M14 34h20" />
    </g>
  </svg>
);

export default List;
