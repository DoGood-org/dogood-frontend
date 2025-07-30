import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from 'next-intl';

export const EmptyState: React.FC = () => {
  const isMobileOrTablet = useMediaQuery('(max-width: 1439px)');

  const t = useTranslations('chat');

  const dummyCards = Array.from({ length: 6 });

  if (isMobileOrTablet) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center dark:bg-[#5D5A5A] bg-[#CFCFCF] p-4 gap-4">
        <h3 className="text-foreground text-base text-center">
          {t('emptyState.emptyChatMessage1')}
        </h3>
      </div>
    );
  }

  return (
    <div className="flex h-full gap-9 px-0 py-0">
      <ul className="w-[320px] flex flex-col space-y-4 h-full">
        {dummyCards.map((_, index) => (
          <li
            key={index}
            className="flex-1 rounded-md bg-[#696969] dark:bg-[#393939] animate-[pulse_4.5s_ease-in-out_infinite]"
          />
        ))}
      </ul>

      <div className="w-[704px] flex-1 flex items-center justify-center text-center bg-[#CFCFCF] dark:bg-[#5D5A5A] rounded-md p-6 h-full">
        <h3 className="text-foreground text-base max-w-lg">
          {t('emptyState.emptyChatMessage1')}
        </h3>
      </div>
    </div>
  );
};
