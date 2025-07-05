import { SettingsContentProps } from '@/types';
import { LanguageSwitcher, SpecialToggle, ThemeToggle } from '@/components';

export const SettingsList: React.FC<SettingsContentProps> = ({
  settingItem,
}) => {
  const content = settingItem.content;

  const settingsComponents: Record<string, React.ReactNode> = {
    language: <LanguageSwitcher />,
    accessibility: <SpecialToggle />,
    theme: <ThemeToggle />,
  };

  return (
    <ul className="flex flex-col gap-4 pt-2 lg:pt-0">
      {content.map(({ id, name, description }, index) => (
        <li className="lg:px-8 lg:py-3" key={`${index}-${id}`}>
          <div className="flex items-center justify-between lg:block">
            <p className="text-base">{name}</p>
            <div className="flex justify-between items-center lg:mt-2">
              <p className="hidden lg:block text-[14px]/5 text-text-gray">
                {description}
              </p>
              {settingsComponents[id]}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
