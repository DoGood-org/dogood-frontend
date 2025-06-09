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
      className="flex flex-col items-center cursor-pointer   bg-[#303030] text-white 
     py-[64px] px-[60px] w-[260px] h-[220px] rounded-[12px]
     btn-expand-hover"
    >
      <div className=" flex flex-col gap-[12px] items-center justify-center w-full">
        <Icon />
        <p className="text-[#F1F1F1] text-center font-montserrat text-[20px] font-semibold leading-[26px] max-w-[300px] mx-auto break-words">
          {title}
        </p>
      </div>
    </div>
  );
};

export default AuthChoiceButton;
