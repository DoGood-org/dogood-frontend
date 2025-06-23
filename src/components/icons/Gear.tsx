import type { SVGProps } from 'react';
const Gear = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <g
      stroke="#F1F1F1"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#prefix__a)"
    >
      <path d="M12.5 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5" />
      <path d="M4.384 16.697a9.3 9.3 0 0 1-.944-2.277l1.573-1.969a8 8 0 0 1 0-.903l-1.572-1.97a9.3 9.3 0 0 1 .942-2.277l2.504-.281q.3-.339.639-.639l.28-2.503a9.3 9.3 0 0 1 2.275-.937l1.969 1.574a8 8 0 0 1 .904 0l1.968-1.573a9.3 9.3 0 0 1 2.279.943l.28 2.504q.34.3.64.638l2.502.281c.415.714.732 1.48.944 2.277l-1.573 1.97q.027.45 0 .903l1.573 1.969a9.3 9.3 0 0 1-.938 2.278l-2.504.281a8 8 0 0 1-.639.639l-.28 2.503a9.3 9.3 0 0 1-2.278.944l-1.969-1.573a8 8 0 0 1-.903 0l-1.97 1.572a9.3 9.3 0 0 1-2.277-.938l-.282-2.504a8 8 0 0 1-.638-.638z" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.5 0h24v24H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default Gear;
