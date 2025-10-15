import { CardForm } from '@/components';
import { CardFormProps } from '@/types';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';

export const StyledCardForm = (props: CardFormProps): JSX.Element => {
  const t = useTranslations('card');

  return (
    <div
      className="
[&&_input]:border 
[&&_input]:border-[#111113]
[&&_input]:bg-[#ffffff]
[&&_input]:py-3 
[&&_input]:px-4               
[&&_input]:h-auto
[&&_input]:text-base
[&&_input]:text-[#010101]

[&&_input]:focus:ring-2 
[&&_input]:focus:ring-[#00c1ac]
[&&_input]:focus:border-[#00c1ac]
[&&_input]:focus:text-[#010101]

[&&_input]:ring-0
[&&_input]:focus-within:ring-0      
[&&_input]:rounded-sm 
[&&_input]:shadow-none
[&&_input]:outline-none

      [&&_div.relative]:border
[&&_div.relative]:border-[#111113] 
      [&&_div.relative]:bg-[#ffffff]
      [&&_div.relative]:h-12
      [&&_div.relative]:p-3
      [&&_div.relative]:rounded-sm

      [&&_.w-\[175px\]]:border 
      [&&_.w-\[133px\]]:border
      [&&_.w-\[175px\]]:border-[#111113] 
      [&&_.w-\[133px\]]:border-[#111113]
 [&&_.w-\[175px\]]:bg-[#ffffff]
 [&&_.w-\[133px\]]:bg-[#ffffff]
"
    >
      <h2 className="text-base text-center mb-3">{t('title')}</h2>
      <CardForm {...props} />
    </div>
  );
};
