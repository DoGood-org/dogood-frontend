import type { SVGProps } from 'react';
const Rocket = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M3.749 13.752c-1.25 1.05-1.667 4.166-1.667 4.166s3.117-.416 4.167-1.666c.591-.7.583-1.775-.075-2.425a1.817 1.817 0 0 0-2.425-.075M10 12.502l-2.5-2.5A18.3 18.3 0 0 1 9.167 6.71a10.73 10.73 0 0 1 9.166-5.042c0 2.267-.65 6.25-5 9.167A18.6 18.6 0 0 1 10 12.5"
    />
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M7.499 9.999H3.332s.458-2.525 1.667-3.333c1.35-.9 4.166 0 4.166 0M10 12.499v4.166s2.525-.458 3.333-1.666c.9-1.35 0-4.167 0-4.167"
    />
  </svg>
);
export default Rocket;
