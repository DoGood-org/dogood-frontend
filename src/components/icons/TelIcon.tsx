import * as React from 'react';
import type { SVGProps } from 'react';
const SvgTelIcon = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
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
      d="m12.98 9.826-.59 2.56a.79.79 0 0 1-.773.614C5.211 13 0 7.79 0 1.384 0 1.012.253.694.615.61l2.56-.59a.8.8 0 0 1 .908.46l1.181 2.754a.795.795 0 0 1-.228.926L3.67 5.258a8.88 8.88 0 0 0 4.05 4.05l1.12-1.366a.79.79 0 0 1 .926-.228l2.755 1.18c.331.175.547.561.46.932"
    />
  </svg>
);
export default SvgTelIcon;
