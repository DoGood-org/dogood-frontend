import type { SVGProps } from 'react';
const UserAvatarMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 64 83"
    {...props}
  >
    <defs>
      <clipPath id="prefix__a">
        <circle cx={32} cy={32} r={25} />
      </clipPath>
    </defs>
    <path fill="#EE0606" d="m32 82.729-25.548-31.5h51.096z" />
    <circle cx={32} cy={32} r={32} fill="#EE0606" />
    <image
      width={50}
      height={50}
      x={7}
      y={7}
      clipPath="url(#prefix__a)"
      href="/avatar.jpg"
      preserveAspectRatio="xMidYMid slice"
    />
  </svg>
);
export default UserAvatarMarker;
