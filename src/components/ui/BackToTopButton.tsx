import React from 'react';

interface BackToTopButtonProps {
  show: boolean;
}

export default function BackToTopButton({
  show,
}: BackToTopButtonProps): React.ReactElement | null {
  if (!show) return null;

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={handleClick}
        aria-label="Back to top"
        className="cursor-pointer text-white text-[20px] md:text-[24px] lg:text-[32px] px-4 py-5 md:py-13 rounded bg-primary-600 justify-center items-center hover:bg-primary-700 flex gap-2 flex-col"
        title="Back to top"
        type="button"
      >
        <svg
          className="w-[10px] h-[10px] md:w-[32px] md:h-[32px] text-white-400 rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        Go to the top of the page
      </button>
    </div>
  );
}
