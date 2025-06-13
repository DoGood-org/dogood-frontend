import type { SVGProps } from 'react';
const HandHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 101 101"
    {...props}
  >
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      clipPath="url(#prefix__a)"
    >
      <path d="M19.603 82.094h-12.5a3.125 3.125 0 0 1-3.125-3.125V63.344a3.125 3.125 0 0 1 3.125-3.125h12.5" />
      <path d="M44.603 63.344h12.5l26.171-6.02a6.49 6.49 0 0 1 8.204 6.25 6.48 6.48 0 0 1-3.586 5.801l-15.164 6.469-25 6.25H19.601V60.219l9.766-9.766a9.37 9.37 0 0 1 6.64-2.734H55.54a7.813 7.813 0 1 1 0 15.625z" />
      <path d="M38.638 47.72c-3.801-4.797-6.535-9.938-6.535-15.625 0-8.473 6.902-15.625 15.414-15.625a15.28 15.28 0 0 1 14.273 9.375 15.28 15.28 0 0 1 14.274-9.375c8.511 0 15.414 7.152 15.414 15.625 0 11.418-11.008 21.511-19.618 27.86" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.853.844h100v100h-100z" />
      </clipPath>
    </defs>
  </svg>
);
export default HandHeart;
