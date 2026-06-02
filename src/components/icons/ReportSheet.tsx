import type { SVGProps } from 'react';
const ReportSheet = (props: SVGProps<SVGSVGElement>) => (
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
      d="m19.898 7.853-5.25-5.25a.56.56 0 0 0-.398-.166h-9A1.313 1.313 0 0 0 3.938 3.75v16.5a1.313 1.313 0 0 0 1.312 1.313h13.5a1.313 1.313 0 0 0 1.313-1.313v-12c0-.15-.06-.292-.165-.397m-5.085-3.495 3.33 3.33h-3.33zm3.937 16.08H5.25a.19.19 0 0 1-.187-.188V3.75a.187.187 0 0 1 .187-.187h8.438V8.25a.563.563 0 0 0 .562.563h4.688V20.25a.19.19 0 0 1-.188.188m-3.187-7.688a.56.56 0 0 1-.563.563H9a.563.563 0 0 1 0-1.126h6a.56.56 0 0 1 .563.563m0 3a.56.56 0 0 1-.563.563H9a.563.563 0 0 1 0-1.125h6a.56.56 0 0 1 .563.562"
    />
  </svg>
);
export default ReportSheet;
