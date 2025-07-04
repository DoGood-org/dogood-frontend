import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAnimal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 27 25"
    fill="currentColor" // this is key
    {...props}
  >
    <path
      fill="currentColor"
      d="m13.98 10 7.958 2.787v11.38a.834.834 0 0 1-.844.833h-3.375c-.468 0-.844-.371-.844-.787v-5.786H8.438v5.787c0 .416-.375.786-.844.786H4.219a.834.834 0 0 1-.844-.833v-11.14C1.418 12.338 0 10.5 0 8.332c0-.917.758-1.62 1.688-1.62s1.687.749 1.687 1.62.758 1.62 1.688 1.62h8.917zM27 4.167v1.62c0 1.842-1.51 3.286-3.375 3.286h-1.687v1.855l-6.75-2.383V.833c0-.742.91-1.113 1.437-.586l1.443 1.42h2.828c.574 0 1.253.41 1.51.924l.375.742h3.375c.47 0 .844.37.844.834m-5.906 0c0-.463-.376-.787-.844-.787s-.844.371-.844.787c0 .415.376.786.844.786s.844-.323.844-.786"
    />
  </svg>
);

export default SvgAnimal;
