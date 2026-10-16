import type { SVGProps } from 'react';
const Pending = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 21 21"
    {...props}
  >
    <path
      fill="#FFCD29"
      d="M20.522 11.126A10.28 10.28 0 1 1 9.399.003a.792.792 0 1 1 .13 1.58 8.7 8.7 0 1 0 9.413 9.412.793.793 0 0 1 1.58.13M9.464 4.742v5.529a.79.79 0 0 0 .79.79h5.529a.79.79 0 0 0 0-1.58h-4.74V4.74a.79.79 0 0 0-1.58 0m3.95-2.37a1.185 1.185 0 1 0-.001-2.37 1.185 1.185 0 0 0 0 2.37m3.553 2.37a1.185 1.185 0 1 0 0-2.37 1.185 1.185 0 0 0 0 2.37m2.37 3.554a1.185 1.185 0 1 0 0-2.37 1.185 1.185 0 0 0 0 2.37"
    />
  </svg>
);
export default Pending;
