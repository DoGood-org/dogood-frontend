import { Button } from '@/components/ui/Button';
import { ButtonPanelProps } from '@/types/errorType';
import Link from 'next/link';
import React from 'react';

export const ButtonPanel: React.FC<ButtonPanelProps> = ({
  variantBtn1,
  hrefBtn1,
  variantBtn2,
  hrefBtn2,
  handleResetBtn,
  handleContactBtn,
  nameBtn1,
  nameBtn2,
}): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-[60px] md:justify-center lg:justify-start">
      {handleResetBtn ? (
        <Button
          variant={variantBtn1}
          className="w-full text-white md:w-[185px]"
          onClick={handleResetBtn}
        >
          {nameBtn1}
        </Button>
      ) : hrefBtn1 ? (
        <Link href={hrefBtn1}>
          <Button
            variant={variantBtn1}
            className="w-full text-white md:w-[185px]"
          >
            {nameBtn1}
          </Button>
        </Link>
      ) : null}
      {handleContactBtn ? (
        <Button
          variant={variantBtn2}
          className="w-full text-base text-foreground md:w-[185px]"
          onClick={handleContactBtn}
        >
          {nameBtn2}
        </Button>
      ) : hrefBtn2 ? (
        <Link href={hrefBtn2}>
          <Button
            variant={variantBtn2}
            className="w-full text-base text-foreground md:w-[185px]"
          >
            {nameBtn2}
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default ButtonPanel;
