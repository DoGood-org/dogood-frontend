import type { SVGProps } from 'react';
const HandHeart = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M9.5 39h-6A1.5 1.5 0 0 1 2 37.5V30a1.5 1.5 0 0 1 1.5-1.5h6M21.5 30h6l12.563-2.89a3.115 3.115 0 0 1 3.937 3 3.11 3.11 0 0 1-1.721 2.785L35 36l-12 3H9.5V28.5l4.688-4.687a4.5 4.5 0 0 1 3.187-1.313h9.375a3.75 3.75 0 0 1 0 7.5z" />
      <path d="M18.637 22.5C16.812 20.199 15.5 17.73 15.5 15c0-4.066 3.313-7.5 7.399-7.5A7.335 7.335 0 0 1 29.75 12a7.335 7.335 0 0 1 6.851-4.5C40.687 7.5 44 10.935 44 15c0 5.481-5.284 10.326-9.416 13.373" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.5 0h48v48H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default HandHeart;
