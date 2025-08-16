import type { SVGProps } from 'react';
const Diners = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 120 80"
    {...props}
  >
    <rect width={120} height={80} fill="url(#prefix__diners)" rx={4} />
    <path
      fill="#3477B9"
      fillRule="evenodd"
      d="M65.4 64.834c13.621.065 26.054-11.07 26.054-24.618 0-14.815-12.433-25.056-26.054-25.05H53.677c-13.785-.005-25.131 10.238-25.131 25.05 0 13.55 11.346 24.683 25.13 24.618z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M53.685 17.152c-12.596.004-22.803 10.18-22.806 22.738.003 12.556 10.21 22.73 22.806 22.734 12.6-.004 22.808-10.178 22.81-22.734-.002-12.559-10.21-22.734-22.81-22.738M39.23 39.89c.012-6.137 3.858-11.37 9.28-13.45v26.896c-5.422-2.079-9.268-7.309-9.28-13.446m19.63 13.452V26.44c5.425 2.074 9.276 7.31 9.286 13.45-.01 6.141-3.861 11.373-9.286 13.452"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id="prefix__diners"
        x1={0}
        x2={120}
        y1={21}
        y2={54}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3479C0" />
        <stop offset={1} stopColor="#133362" />
      </linearGradient>
    </defs>
  </svg>
);
export default Diners;
