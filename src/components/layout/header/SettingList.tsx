import { SettingsContentProps } from '@/types';
import { ThemeToggle } from './ThemeToggle';

export const SettingsList: React.FC<SettingsContentProps> = ({
  settingItem,
}) => {
  const content = settingItem.content;
  console.log(content);

  return (
    <ul className="flex flex-col gap-[25px]">
      {content.map(({ name, description }) => (
        <li className="flex gap-10" key={name}>
          <div className="w-[215px]">
            <h4 className="mb-[22px]">{name}</h4>
            <p className="text-p2-d text-text-gray">{description}</p>
          </div>
          {name === 'Languages' && <p>Switch</p>}
          {name === 'Special features' && <p>features switch</p>}
          {name === 'Theme' && <ThemeToggle />}
        </li>
      ))}
    </ul>
  );
};
