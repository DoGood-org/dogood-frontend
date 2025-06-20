type Props = React.PropsWithChildren<{
  className?: string;
}>;

export const Container: React.FC<Props> = ({ children, className = '' }) => {
  return <div className={`my-container ${className}`}>{children}</div>;
};
