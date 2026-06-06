import type { SVGProps } from 'react';

const UserG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <mask
      id="prefix__userg"
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
      mask="url(#prefix__userg)"
    >
      <path d="M31 25h4M33 23v4M22.5 27a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M14 32c2.08-3.056 5.015-5 8.5-5s6.42 1.944 8.5 5" />
    </g>
  </svg>
);

export default UserG;
