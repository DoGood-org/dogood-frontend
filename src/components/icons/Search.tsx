import * as React from 'react';
import type { SVGProps } from 'react';
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path
      fill="#fff"
      d="M12.188 1.875c-5.686 0-10.313 4.627-10.313 10.313 0 5.685 4.627 10.312 10.313 10.312 5.685 0 10.312-4.627 10.312-10.312 0-5.686-4.627-10.313-10.312-10.313m0 18.75c-4.652 0-8.438-3.785-8.438-8.437S7.536 3.75 12.188 3.75s8.437 3.786 8.437 8.438-3.785 8.437-8.437 8.437M27.85 26.525 22.223 20.9a.937.937 0 1 0-1.326 1.326l5.626 5.625a.935.935 0 0 0 1.325 0 .936.936 0 0 0 0-1.326"
    />
  </svg>
);
export default SvgSearch;
