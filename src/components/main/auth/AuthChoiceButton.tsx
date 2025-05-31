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
      className="flex flex-col items-center justify-center  cursor-pointer   bg-[#303030] text-white 
     p-6 w-[270px] h-[250px] rounded-[10px]
     btn-expand-hover"
    >
      <div className="flex flex-col gap-[30px] items-center justify-center">
        <Icon />
        <p className="text-wrap text-center">{title}</p>
      </div>
    </div>
  );
};

export default AuthChoiceButton;
