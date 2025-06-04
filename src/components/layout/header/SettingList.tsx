import { SettingsContentProps } from '@/types';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export const SettingsList: React.FC<SettingsContentProps> = ({
  settingItem,
}) => {
  const content = settingItem.content;

  const settingsComponents: Record<string, React.ReactNode> = {
    languages: <LanguageSwitcher />,
    accessibility: <p>features switch</p>,
    theme: <ThemeToggle />,
  };

  return (
    <ul className="flex flex-col gap-[25px]">
      {content.map(({ id, name, description }) => (
        <li className="flex gap-10 justify-between" key={name}>
          <div className="w-[215px]">
            <h4 className="mb-[22px]">{name}</h4>
            <p className="text-p2-d text-text-gray">{description}</p>
          </div>
          {settingsComponents[id]}
        </li>
      ))}
    </ul>
  );
};
