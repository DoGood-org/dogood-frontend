import type { SVGProps } from 'react';
const Vector = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      strokeWidth={2}
      d="m12.959 18.64-.001.004-.021.076a2 2 0 0 1-.1-.182l-.019-.04-.021-.038-3.958-6.927-.136-.236-.236-.136L1.54 7.203l-.038-.022-.04-.019-.188-.099.08-.02.006-.002 17.398-5.8z"
    />
  </svg>
);
export default Vector;
