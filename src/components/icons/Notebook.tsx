import type { SVGProps } from 'react';
const Notebook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M17.063 10.5a.56.56 0 0 1-.563.563h-6a.562.562 0 1 1 0-1.126h6a.56.56 0 0 1 .563.563m-.563 2.438h-6a.562.562 0 1 0 0 1.124h6a.562.562 0 1 0 0-1.124M20.813 4.5v15a1.313 1.313 0 0 1-1.313 1.313h-15A1.313 1.313 0 0 1 3.188 19.5v-15A1.313 1.313 0 0 1 4.5 3.188h15A1.313 1.313 0 0 1 20.813 4.5M4.5 19.688h2.438V4.313H4.5a.187.187 0 0 0-.187.187v15a.19.19 0 0 0 .187.188M19.688 4.5a.19.19 0 0 0-.188-.187H8.063v15.375H19.5a.19.19 0 0 0 .188-.188z"
    />
  </svg>
);
export default Notebook;
