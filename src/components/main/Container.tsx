type Props = React.PropsWithChildren<{
  className?: string;
}>;

export const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={`my-container ${className}`}>{children}</div>;
};

// w-full mx-auto px-5
// tablet:px-10 tablet:max-w-[1194px]
// desktop:px-20 desktop:max-w-[1920px]
