'use client';

interface ProgressBarProps {
  currentAmount: number;
  goalAmount: number;
}

export const DonationProgressBar: React.FC<ProgressBarProps> = ({
  currentAmount,
  goalAmount,
}) => {
  const percentage = Math.min(
    Math.max((currentAmount / goalAmount) * 100, 0),
    100
  );
  return (
    <div className="relative w-[236px] h-[28px] bg-text-gray">
      <div
        className="h-full bg-[#00c1ac] transition-all duration-500 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-white">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};
