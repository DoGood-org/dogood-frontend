import { JSX } from 'react';

type Props = {
  title?: string;
  subtitle?: string;
};
export const AuthTitleSubtitle = (props: Props): JSX.Element => {
  return (
    <div className="flex flex-col justify-start mb-4 w-full gap-2">
      <h2
        className="text-[24px] leading-[32px] text-start
      md:leading-[48px]
      md:text-[32px]
      "
      >
        {props.title}
      </h2>
      <h3 className="text-base text-start">{props.subtitle}</h3>
    </div>
  );
};
