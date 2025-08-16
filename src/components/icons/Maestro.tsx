import type { SVGProps } from 'react';
const Maestro = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 120 80"
    {...props}
  >
    <rect width={120} height={80} fill="#fff" rx={4} />
    <path
      fill="#00A2E5"
      fillRule="evenodd"
      d="M97.529 54.656v-.918h-.24l-.275.632-.276-.632h-.24v.918h.17v-.692l.258.597h.175l.259-.599v.694zm-1.518 0v-.761h.307v-.155h-.782v.155h.307v.761z"
      clipRule="evenodd"
    />
    <path
      fill="#7375CF"
      fillRule="evenodd"
      d="M49.652 58.595h20.696v-37.19H49.652z"
      clipRule="evenodd"
    />
    <path
      fill="#00A2E5"
      fillRule="evenodd"
      d="M98.268 40c0 13.063-10.589 23.652-23.65 23.652A23.55 23.55 0 0 1 60 58.596c5.501-4.331 9.034-11.051 9.034-18.596S65.5 25.735 60 21.404a23.55 23.55 0 0 1 14.617-5.056c13.062 0 23.65 10.589 23.65 23.652"
      clipRule="evenodd"
    />
    <path
      fill="#EB001B"
      fillRule="evenodd"
      d="M50.966 40c0-7.545 3.533-14.265 9.034-18.596a23.55 23.55 0 0 0-14.617-5.056c-13.062 0-23.65 10.589-23.65 23.652s10.588 23.652 23.65 23.652A23.55 23.55 0 0 0 60 58.596C54.499 54.265 50.966 47.545 50.966 40"
      clipRule="evenodd"
    />
  </svg>
);
export default Maestro;
