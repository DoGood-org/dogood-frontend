import type { SVGProps } from 'react';

const ShieldSlash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 72 72"
    {...props}
  >
    <rect width={72} height={72} fill="#EE0606" fillOpacity={0.2} rx={36} />
    <rect
      width={71.513}
      height={71.513}
      x={0.243}
      y={0.243}
      stroke="#EE0606"
      strokeOpacity={0.5}
      strokeWidth={0.486}
      rx={35.757}
    />
    <g
      stroke="#EE0606"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      strokeWidth={3.041}
    >
      <path d="m16 18 40 36" />
      <path d="M50.662 43.089c1.256-2.782 2.062-6.127 2.062-10.129V22.318a1.52 1.52 0 0 0-1.52-1.52H30.397" />
      <path d="M22.18 20.798h-1.382a1.52 1.52 0 0 0-1.52 1.52V32.96C19.277 51.203 36 55.764 36 55.764s6.383-1.74 11.264-7.375" />
    </g>
  </svg>
);

export default ShieldSlash;
