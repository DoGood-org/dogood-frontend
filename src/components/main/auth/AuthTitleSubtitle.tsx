import { JSX } from 'react';

type Props = {
  title?: string;
  subtitle?: string;
};
export const AuthTitleSubtitle = (props: Props): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center mb-[24px]">
      <h2
        className="text-[24px] font-normal leading-[32px]
      md:leading-[48px]
      md:text-[32px]
      "
      >
        {props.title}
      </h2>
      <h3 className="text-base">{props.subtitle}</h3>
    </div>
  );
};
