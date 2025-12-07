import React from 'react';

export const parseRichText = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];

  // Regex, який ловить:
  // 1) посилання [text](url)
  // 2) жирний текст **text**
  // 3) курсив *text*
  // 4) підкреслення __text__
  const regex =
    /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|__([^_]+)__)/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Додати звичайний текст перед знайденим фрагментом
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      // [text](url)
      parts.push(
        <a
          key={parts.length}
          href={match[3]}
          className="text-btn underline hover:text-btn-hover active:text-btn-active"
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      // **bold**
      parts.push(
        <strong key={parts.length} className="font-semibold">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      // *italic*
      parts.push(<em key={parts.length}>{match[5]}</em>);
    } else if (match[6]) {
      // __underline__
      parts.push(
        <span key={parts.length} style={{ textDecoration: 'underline' }}>
          {match[6]}
        </span>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Додати решту тексту
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};
