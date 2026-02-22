'use client';

import { JSX, useMemo } from 'react';
import { OrganizationFromBack, TaskOwnerValue } from '@/types/tasks.type';
import { StepCard } from '@/components/tasks/createPage/StepCard';
import { ConfirmButton } from '@/components/tasks/createPage/Buttons/ConfirmButton';
import { Check } from '@/components/icons/Check';
import { Label } from '@/components/ui/Label';

interface TaskOwnerFormProps {
  value: TaskOwnerValue | undefined;
  onChange: (value: TaskOwnerValue) => void;
  organizations: OrganizationFromBack[];
  userName: string;
}

interface Option {
  id: string;
  label: string;
  disabled?: boolean;
}

export const TaskOwnerForm = ({
  value,
  onChange,
  organizations,
  userName,
}: TaskOwnerFormProps): JSX.Element => {
  const adminOrModeratorOrgs = organizations.filter(
    (org) => org.userRole === 'admin' || org.userRole === 'moderator'
  );

  const options: Option[] = useMemo(() => {
    const userOption = {
      id: 'user',
      label: `${userName || 'User name'} (private)`,
    };

    if (adminOrModeratorOrgs.length === 0) {
      return [
        userOption,
        {
          id: 'org-placeholder',
          label: 'Organization name',
          disabled: true,
        },
      ];
    }

    const orgOptions: Option[] = adminOrModeratorOrgs.map((org) => ({
      id: org.id,
      label: org.name,
    }));

    return [userOption, ...orgOptions];
  }, [adminOrModeratorOrgs, userName]);

  const isChecked = (optId: string): boolean => {
    if (!value) return false;

    if (value.type === 'USER') return optId === 'user';
    if (value.type === 'ORGANIZATION') return value.organizationId === optId;

    return false;
  };

  const handleChange = (optId: string): void => {
    if (optId === 'user') {
      onChange({ type: 'USER' });
    } else {
      onChange({ type: 'ORGANIZATION', organizationId: optId });
    }
  };

  return (
    <StepCard className="h-[456px] md:h-[504px] lg:h-[595px]">
      <div className="h-full flex flex-col justify-between">
        <h2 className="text-[20px] leading-[24px] mb-8 font-medium">
          Create task as:
        </h2>

        <div className="mb-auto flex flex-col gap-4">
          {options.map((opt) => (
            <Label
              key={opt.id}
              className={`group flex items-center gap-3 select-none ${
                opt.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="relative flex items-center justify-center w-6 h-6">
                <input
                  type="radio"
                  name="taskOwner"
                  value={opt.id}
                  disabled={opt.disabled}
                  className={`
                      peer appearance-none w-6 h-6 border-2 rounded-sm bg-transparent transition-all z-10
                      ${opt.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                      border-black dark:border-white
                      checked:border-black dark:checked:border-white
                    `}
                  checked={isChecked(opt.id)}
                  onChange={() => handleChange(opt.id)}
                />
                <div className="absolute inset-0 flex items-center justify-center text-btn-outline opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200">
                  <Check />
                </div>
              </div>
              <span className="text-[18px] text-gray group-hover:text-black transition-colors">
                {opt.label}
              </span>
            </Label>
          ))}
        </div>

        <ConfirmButton disabled={!value} onConfirm={() => {}} />
      </div>
    </StepCard>
  );
};
