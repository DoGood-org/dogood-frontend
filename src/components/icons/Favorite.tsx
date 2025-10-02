import type { SVGProps } from 'react';

const Favorite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5938 21.627C12.5938 21.627 2.84375 16.377 2.84375 10.1895C2.84375 8.84679 3.37712 7.55913 4.32652 
      6.60973C5.27592 5.66032 6.56359 5.12695 7.90625 5.12695C10.0241 5.12695 11.8381 6.28102 12.5938 
      8.12695C13.3494 6.28102 15.1634 5.12695 17.2812 5.12695C18.6239 5.12695 19.9116 5.66032 20.861 
      6.60973C21.8104 7.55913 22.3437 8.84679 22.3438 10.1895C22.3438 16.377 12.5938 21.627 12.5938 21.627Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Favorite;
