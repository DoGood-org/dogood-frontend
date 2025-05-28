import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMessageIcon = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 13 13"
    {...props}
  >
    <path
      fill="#696969"
      d="M12.392 9.245a6.5 6.5 0 1 0-3.147 3.147l2.29.571a1.18 1.18 0 0 0 1.428-1.429zm-8.233-1.55a1.179 1.179 0 1 1 0-2.357 1.179 1.179 0 0 1 0 2.357m4.715 0a1.179 1.179 0 1 1 0-2.357 1.179 1.179 0 0 1 0 2.357"
    />
  </svg>
);
export default SvgMessageIcon;
