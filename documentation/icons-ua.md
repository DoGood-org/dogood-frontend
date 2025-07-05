# Icons (ua)

Іконки svg необхідно завантажувати у папку `src/assets/svg`. В проекті
реалізовано скрипт `watch-barrels.mjs`, який автоматично генерує із svg
компонент React, зберігає його в папці components/icons та автоматично генерує
експорт у файлі `index.ts`. Для запуску скрипту достатньо запустити проект

```bash
npm run dev
```

Для використання іконки в компоненті необхідно її імпортувати в компонент:

```tsx
import { ArrowRight } from '@/components/icons';
```

## Колір

Для можливості зміни кольору іконки (при ховері або за умовою) в компоненті
іконки необхідно змінити `stroke` та/або `fill` на значення `currentColor`

## Розмір

Для зміни розмірів іконки задається class `size-*'`

По дефолту розмір іконки встановлено `size-4` (16px)

```tsx
<CaretDoubleRight className="size-8" /> //24px
```

Іконки нестандартного розміру можуть не відображатись через автоматичне
генерування 'clipPath'. Для вирішення проблеми необхідно видалити `defs`,
`clipPath` та змінити розміри width та height на 100%

```tsx
import type { SVGProps } from 'react';
const Dollar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em" // -> змінюємо width="100%"
    height="1em" // -> змінюємо height="100%"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <g
      stroke="#F1F1F1"
      strokeLinecap="round"
      strokeLinejoin="round"

      // clipPath="url(#prefix__a)" -> видаляємо
    >
      <path d="M12.5 6.75v1.5M12.5 15.75v1.5M12.5 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18" />
      <path d="M10.25 15.75h3.375a1.875 1.875 0 1 0 0-3.75h-2.25a1.875 1.875 0 1 1 0-3.75h3.375" />
    </g>
    ---видаляємо---
    {/* <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.5 0h24v24H.5z" />
      </clipPath>
    </defs> */}
    ------------------
  </svg>
);
export default Dollar;
```
