import { ReactElement } from 'react';

type Props = {
  icon: ReactElement;
  title: string;
  handleAuthChoice: () => void;
};
const AuthChoiceButton: React.FC<Props> = (props: Props) => {
  const { handleAuthChoice, title, icon } = props;
  const Icon = icon.type as React.FC;

  return (
    <div
      onClick={handleAuthChoice}
      role="button"
      className="flex flex-col items-center justify-center cursor-pointer bg-[var(--card)] text-[var(--foreground)] rounded-[12px]
      p-[24px] w-[203px] h-[188px]
       sm:w-[260px] sm:h-[220px] btn-expand-hover"
    >
      <div className=" flex flex-col  gap-[20px] sm:gap-[12px] items-center justify-center w-full md:gap-[12px]">
        <Icon />
        <p
          className="text-[var(--foreground)] text-center montserrat text-[18px] font-semibold mx-auto break-words
        md:text-[20px] md:leading-[26px]"
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default AuthChoiceButton;
