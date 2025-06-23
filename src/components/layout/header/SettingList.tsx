import { SettingsContentProps } from '@/types';
import { LanguageSwitcher, ThemeToggle } from '@/components';

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
      {content.map(({ id, name, description }, index) => (
        <li
          className="flex gap-10 justify-between px-8 py-3"
          key={`${index}-${id}`}
        >
          <div className="w-[215px]">
            <p className="mb-[22px]">{name}</p>
            <p className="text-p2-d text-text-gray">{description}</p>
          </div>
          {settingsComponents[id]}
        </li>
      ))}
    </ul>
  );
};
