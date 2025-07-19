import type { SVGProps } from 'react';
const Star = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    // fill="currentColor"
    viewBox="0 0 27 26"
    {...props}
  >
    <path
      stroke="currentColor"
      d="M11.995 2.056c.447-1.386 2.408-1.386 2.855 0l1.727 5.356a2.5 2.5 0 0 0 2.385 1.733l5.629-.012c1.456-.003 2.061 1.861.882 2.715l-4.56 3.298A2.5 2.5 0 0 0 20 17.95l1.751 5.35c.453 1.384-1.133 2.536-2.31 1.678l-4.546-3.319a2.5 2.5 0 0 0-2.948 0l-4.546 3.319c-1.176.858-2.762-.294-2.31-1.678l1.752-5.35a2.5 2.5 0 0 0-.911-2.803l-4.56-3.298c-1.18-.854-.575-2.718.88-2.715l5.63.012a2.5 2.5 0 0 0 2.385-1.733z"
    />
  </svg>
);
export default Star;
