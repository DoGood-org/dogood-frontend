type Props = {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
  stroke?: string;
};

export const Facebook: React.FC<Props> = (
  { width = 24, height = 24, className, fill = 'var(--foreground)', stroke } = {
    width: 24,
    height: 24,
    className: '',
    fill: 'var(--foreground)',
  }
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={`w-[${width}px] h-[${height}px] ${className}`}
      aria-label="Facebook"
      role="img"
      stroke={stroke}
    >
      <path
        d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z"
        fill={fill}
      />
    </svg>
  );
};
