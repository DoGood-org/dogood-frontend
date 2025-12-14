import { JSX } from 'react';
import { ComponentsProps } from '@/types/cookiesType';
import { parseRichText } from '@/lib/parsRichText';

export const ComponentsList = ({
  component,
}: {
  component: ComponentsProps;
}): JSX.Element => {
  const { type, content, items, moreInfo, content2, content3, content4 } =
    component;

  const extraContent = [moreInfo, content2, content3, content4].filter(Boolean);

  return (
    <li className="text-base font-light">
      <h3 className="font-semibold">{type}</h3>
      <p className="whitespace-pre-line">{parseRichText(content)}</p>
      {items && (
        <ul className="list-disc">
          {items.map(({ type, description }, id) => (
            <li key={id} className="mt-8 ml-8">
              <p className="whitespace-pre-line">
                <b className="font-semibold">{type}</b> -{' '}
                {parseRichText(description)}
              </p>
            </li>
          ))}
        </ul>
      )}
      {extraContent.map((text, idx) => (
        <p key={idx} className="mt-8 whitespace-pre-line">
          {text && parseRichText(text)}
        </p>
      ))}
    </li>
  );
};
