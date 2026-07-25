import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from 'next-intl';

export const EmptyState: React.FC = () => {
  const isMobileOrTablet = useMediaQuery('(max-width: 1439px)');

  const t = useTranslations('chat');

  const CARD_COUNT = 6;
  const dummyCards = Array.from({ length: CARD_COUNT });

  if (isMobileOrTablet) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center dark:bg-[#5D5A5A] bg-[#CFCFCF] gap-4 rounded-md">
        <h3 className="text-foreground text-base text-center">
          {t('emptyState.emptyChatMessage1')}
        </h3>
      </div>
    );
  }

  return (
    <div className="flex w-full h-[calc(100vh-120px)] gap-2 min-h-[856px] max-h-screen">
      <ul className="w-[320px] flex flex-col space-y-4 h-full">
        {dummyCards.map((_, index) => (
          <li
            key={index}
            className="flex-1 rounded-md bg-card animate-[pulse_4.5s_ease-in-out_infinite]"
          />
        ))}
      </ul>

      <div className="flex-1 flex items-center justify-center min-w-[608px] text-center bg-[#CFCFCF] dark:bg-[#5D5A5A] rounded-md p-6">
        <h3 className="text-foreground text-base max-w-lg">
          {t('emptyState.emptyChatMessage1')}
        </h3>
      </div>
    </div>
  );
};
