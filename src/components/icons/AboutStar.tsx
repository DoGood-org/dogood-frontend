import type { SVGProps } from 'react';
const AboutStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.016 2.812a1 1 0 0 1 1.966 0l1.05 5.558a2 2 0 0 0 1.595 1.594l5.557 1.051a1 1 0 0 1 0 1.967l-5.558 1.05a2 2 0 0 0-1.593 1.595l-1.051 5.557a1 1 0 0 1-1.966 0l-1.052-5.558a2 2 0 0 0-1.594-1.593l-5.558-1.051a1 1 0 0 1 0-1.966L8.37 9.964A2 2 0 0 0 9.964 8.37zM20 2v4M22 4h-4M4 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
    />
  </svg>
);
export default AboutStar;
