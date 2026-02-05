import { JSX, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { StepLayout } from './StepLayout';
import { StepLayoutProps } from '@/types/createTask.type';

interface DynamicStepLayoutProps extends Omit<StepLayoutProps, 'title'> {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const DynamicStepLayout = ({
  children,
  showBack = true,
  title,
  className,
}: DynamicStepLayoutProps): JSX.Element => {
  const { watch } = useFormContext<BasicInfoFormValues>();

  const dynamicTitle = title ?? watch('title') ?? 'Title name';

  return (
    <StepLayout showBack={showBack} title={dynamicTitle} className={className}>
      {children}
    </StepLayout>
  );
};
