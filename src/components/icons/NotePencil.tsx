import type { SVGProps } from 'react';
const NotePencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 49 48"
    {...props}
  >
    <g
      stroke="#F1F1F1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      clipPath="url(#prefix__a)"
    >
      <path d="M24.5 30h-6v-6l18-18 6 6zM32 10.5l6 6" />
      <path d="M41 24v15a1.5 1.5 0 0 1-1.5 1.5h-30A1.5 1.5 0 0 1 8 39V9a1.5 1.5 0 0 1 1.5-1.5h15" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.5 0h48v48H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default NotePencil;
