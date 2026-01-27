'use client';

import { JSX, useMemo } from 'react';
import { OrganizationFromBack, TaskOwnerId } from '@/types/tasks.type';
import { StepCard } from '../../StepCard';
import { ConfirmButton } from '../../Buttons/ConfirmButton';
import { Check } from '@/components/icons/Check';
import { Label } from '@/components/ui/Label';

interface TaskOwnerFormProps {
  value: TaskOwnerId | undefined;
  onChange: (value: TaskOwnerId | undefined) => void;
  organizations: OrganizationFromBack[];
  userName: string;
}

interface Option {
  id: TaskOwnerId;
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
      id: 'user' as TaskOwnerId,
      label: `${userName || 'User name'} (private)`,
    };

    if (adminOrModeratorOrgs.length === 0) {
      return [
        userOption,
        {
          id: 'org-placeholder' as TaskOwnerId,
          label: 'Organization name',
          disabled: true,
        },
      ];
    }

    const orgOptions: Option[] = adminOrModeratorOrgs.map((org) => ({
      id: org.id as TaskOwnerId,
      label: org.name,
    }));

    return [userOption, ...orgOptions];
  }, [adminOrModeratorOrgs, userName]);

  return (
    <StepCard className="h-[456px] md:h-[504px]">
      <div className="h-full flex flex-col justify-between">
        <h2 className="text-[20px] leading-[24px] mb-8 font-medium">
          Create task as:
        </h2>

        <div className="mb-auto flex flex-col gap-4">
          {options.map((opt) => (
            <Label
              key={opt.id}
              className={`group flex items-center gap-3 select-none 
                ${opt.disabled} ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            >
              <div className="relative flex items-center justify-center w-6 h-6">
                <input
                  type="radio"
                  name="taskOwner"
                  disabled={opt.disabled}
                  className={`peer appearance-none w-6 h-6 border-2 border-black rounded-sm bg-transparent checked:border-black transition-all z-10 ${
                    opt.disabled
                      ? 'cursor-not-allowed border-black'
                      : 'cursor-pointer'
                  }`}
                  checked={value === opt.id}
                  onChange={() => onChange(opt.id)}
                />
                <div className="absolute inset-0 flex items-center justify-center text-btn-outline opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200">
                  <Check />
                </div>
              </div>
              <span className="text-[18px] text-gray-800 group-hover:text-black transition-colors">
                {opt.label}
              </span>
            </Label>
          ))}
        </div>

        <ConfirmButton owner={value} disabled={!value} />
      </div>
    </StepCard>
  );
};
