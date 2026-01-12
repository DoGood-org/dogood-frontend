import type { SVGProps } from 'react';
const AboutHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 20"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 6.516a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 21 6.516c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .02L4 12.015c-1.5-1.5-3-3.2-3-5.5"
    />
  </svg>
);
export default AboutHeart;
