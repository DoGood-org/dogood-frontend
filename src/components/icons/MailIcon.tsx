import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMailIcon = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 17 13"
    {...props}
  >
    <path
      fill="#696969"
      d="M8.5 9.688c-.549 0-1.098-.18-1.566-.545L0 3.75v7.53c0 .88.714 1.594 1.594 1.594h13.812c.88 0 1.594-.713 1.594-1.594v-7.53l-6.933 5.395a2.56 2.56 0 0 1-1.567.541M.54 2.824l7.047 5.482c.537.419 1.29.419 1.828 0l7.045-5.482c.31-.265.54-.674.54-1.105 0-.88-.714-1.594-1.594-1.594H1.594C.714.125 0 .839 0 1.719c0 .431.2.84.54 1.105"
    />
  </svg>
);
export default SvgMailIcon;
