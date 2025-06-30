import { SettingsContentProps } from '@/types';
import { LanguageSwitcher, SpecialToggle, ThemeToggle } from '@/components';

export const SettingsList: React.FC<SettingsContentProps> = ({
  settingItem,
}) => {
  const content = settingItem.content;

  const settingsComponents: Record<string, React.ReactNode> = {
    languages: <LanguageSwitcher />,
    accessibility: <SpecialToggle />,
    theme: <ThemeToggle />,
  };

  return (
    <ul className="">
      {content.map(({ id, name, description }, index) => (
        <li className="px-8 py-3" key={`${index}-${id}`}>
          <div className="">
            <p className="text-base">{name}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-[14px]/5 text-text-gray">{description}</p>
              {settingsComponents[id]}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
