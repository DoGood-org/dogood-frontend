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
      className="flex flex-col items-center justify-center cursor-pointer bg-background-secondary text-white rounded-[12px]
      p-[16px] w-[157px] h-[143px]
       md:w-[250px] md:h-[200px] btn-expand-hover"
    >
      <div className=" flex flex-col  gap-3 items-center justify-center w-full">
        <Icon />
        <p
          className="text-white text-center montserrat font-normal mx-auto break-words
        lg:text-[20px] lg:leading-[26px]"
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default AuthChoiceButton;
