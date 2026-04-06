import type { SVGProps } from 'react';
const Check2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 23 23"
    {...props}
  >
    <g
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#prefix__a)"
    >
      <path d="M4.333 4h-2c-.353 0-.692.21-.942.586C1.14 4.96 1 5.47 1 6s.14 1.04.39 1.414c.25.375.59.586.943.586h1.334c.353 0 .692.21.942.586C4.86 8.96 5 9.47 5 10s-.14 1.04-.39 1.414c-.25.375-.59.586-.943.586H1.333M4 3v1M9.42 4h12.666v16.056c0 .25-.083.49-.232.667a.73.73 0 0 1-.56.277H3.878c-.21 0-.412-.1-.56-.277a1.04 1.04 0 0 1-.232-.667v-4.723M10.086 10h12M8.086 15h14M17.086 10v11" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h23v23H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Check2;
