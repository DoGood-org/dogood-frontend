import type { SVGProps } from 'react';
const ChatCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 19 19"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.97 1.982a7.312 7.312 0 0 0-6.456 10.75l-.798 2.394a1.125 1.125 0 0 0 1.423 1.423l2.394-.798A7.312 7.312 0 1 0 9.97 1.982m0 13.5a6.2 6.2 0 0 1-3.098-.83.56.56 0 0 0-.46-.047l-2.63.877.878-2.63a.56.56 0 0 0-.047-.46 6.188 6.188 0 1 1 5.357 3.09"
    />
  </svg>
);
export default ChatCircle;
