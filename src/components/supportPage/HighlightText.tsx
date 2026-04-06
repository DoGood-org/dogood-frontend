import React from 'react';

interface HighlightTextProps {
  text: string;
  highlight: string;
  highlightClassName?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  highlight,
  highlightClassName = 'text-btn',
}) => {
  if (!highlight || !text.trim() || !text) return <>{text}</>;

  const trimmedHighlight = highlight.trim();
  if (!trimmedHighlight) return <>{text}</>;

  const regex = new RegExp(
    `\\b(${trimmedHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`,
    'gi'
  );

  const parts = text.split(regex);

  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, index) => {
        if (part.toLowerCase() === trimmedHighlight.toLowerCase()) {
          return (
            <span key={index} className={highlightClassName}>
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
};
