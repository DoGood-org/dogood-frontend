import React from 'react';

export function renderBlock(block: any, key?: React.Key): React.ReactNode {
  if (typeof block === 'string') {
    return (
      <p key={key} className="whitespace-pre-line break-words">
        {block}
      </p>
    );
  }
  if (Array.isArray(block)) {
    return (
      <div key={key} className="mb-2 space-y-2">
        {block.map((item, idx) =>
          renderBlock(item, key ? `${key}-${idx}` : idx)
        )}
      </div>
    );
  }
  return (
    <li key={key} className="mb-2 list-disc">
      {block.title && (
        <h4 className="text-xl font-semibold mt-4 mb-2">{block.title}</h4>
      )}
      {block.heading && (
        <p className="text-[16px] font-bold leading-[24px] mt-3 mb-2">
          {block.heading}
        </p>
      )}
      {block.paragraph && (
        <p className="mb-2 whitespace-pre-line break-words">
          {block.paragraph}
        </p>
      )}
      {block.type && <strong>{block.type}</strong>}
      {block.content && <span> {block.content}</span>}
      {block.content2 && (
        <p className="mb-2 whitespace-pre-line break-words">{block.content2}</p>
      )}
      {block.content3 && (
        <p className="mb-2 whitespace-pre-line break-words">{block.content3}</p>
      )}
      {block.content4 && (
        <p className="mb-2 whitespace-pre-line break-words">{block.content4}</p>
      )}
      {block.description && typeof block.description === 'string' && (
        <p className="mb-2 whitespace-pre-line break-words">
          {block.description}
        </p>
      )}
      {block.description && Array.isArray(block.description) && (
        <div className="mb-2 space-y-2">
          {block.description.map((desc: any, idx: number) =>
            renderBlock(desc, key ? `${key}-desc-${idx}` : `desc-${idx}`)
          )}
        </div>
      )}
      {block.examples &&
        Array.isArray(block.examples) &&
        block.examples.length > 0 && (
          <ul className="pl-5 space-y-1">
            {block.examples.map((ex: any, i: number) => (
              <li key={ex.type ? `${ex.type}-${i}` : i}>
                {ex.type && <strong>{ex.type}: </strong>}
                {ex.description}
              </li>
            ))}
          </ul>
        )}
      {block.items && Array.isArray(block.items) && (
        <ul className="ml-4 pl-4 mt-2">
          {block.items.map((item: any, idx: number) =>
            renderBlock(item, key ? `${key}-item-${idx}` : `item-${idx}`)
          )}
        </ul>
      )}
      {block.moreInfo && <p className="mt-2">{block.moreInfo}</p>}
    </li>
  );
}
