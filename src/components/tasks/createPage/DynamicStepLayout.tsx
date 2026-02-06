import { JSX, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { StepLayout } from './StepLayout';
import { StepLayoutProps } from '@/types/createTask.type';

interface DynamicStepLayoutProps extends StepLayoutProps {
  title?: string;
}

export const DynamicStepLayout = ({
  children,
  showBack = true,
  title,
  className,
}: DynamicStepLayoutProps): JSX.Element => {
  const formTitle = useWatch({
    name: 'title',
  });

  const dynamicTitle = useMemo(
    () => title || (formTitle?.trim() ? formTitle : 'Title name'),
    [title, formTitle]
  );

  return (
    <StepLayout showBack={showBack} title={dynamicTitle} className={className}>
      {children}
    </StepLayout>
  );
};
