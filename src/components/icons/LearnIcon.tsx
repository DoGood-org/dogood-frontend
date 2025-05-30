import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLearnIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={12} fill="#B8B8B8" />
    <rect
      width={13}
      height={13}
      x={12.191}
      y={3}
      fill="#222121"
      rx={1}
      transform="rotate(45 12.191 3)"
    />
  </svg>
);
export default SvgLearnIcon;
