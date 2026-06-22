
# Button

Цей компонент рендерить налаштовувану кнопку з підтримкою різних візуальних `variants`, розмірів (`sizes`) та рендерингу через `asChild` з використанням Radix UI Slot.

## Props
| Prop        | Значення за замовчуванням | Опис                                                                                                  |
| ----------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `variant`   | `default`                 | Необов'язково. Один із варіантів: `ghost`, `primary`, `secondary`, `filters`, `tag`                   |
| `size`      | `default`                 | Необов'язково. Один із варіантів: `sm`, `md`, `lg`, `xl`                                              |
| `asChild`   | `false`                   | Необов'язково. Якщо `true`, компонент рендериться через Radix `<Slot />` замість нативного `<button>` |
| `className` | —                         | Необов'язково. Додаткові класи, що додаються до стилів кнопки                                         |
| `...props`  | —                         | Будь-які нативні пропси для `<button>` або компонента, переданого через `asChild`                     |

## Варіанти (`Variants`)

| Variant   | Styles                                                                                                                                                | Description                                               |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| default   | `bg-btn hover:bg-btn-hover active:bg-btn-hover text-btn-primary rounded-sm px-3 text-base`                                                            |                                                           |
| ghost     | `text-btn-text text-base active:border-btn-outline-hover`                                                                                             | кнопки без фону та рамки, рамка з'являється при наведенні |
| primary   | `'relative px-8 py-3 text-btn-primary text-base bg-btn overflow-hidden hover:bg-btn-hover active:bg-btn-active group transition-colors duration-500'` | кнопки з фоном                                            |
| secondary | `'text-btn-secondary border-1 border-btn-outline hover:border-btn-outline-hover'`                                                                     | кнопки без фону, але з рамкою                             |
| filters   | `'bg-card text-base'`                                                                                                                                 | кнопки з фоном `bg-card`                                  |
| tag       | `'bg-tag text-base gap-2'`                                                                                                                            | кнопки-теги (світло-сірі)                                 |

## Розміри (`Sizes`)

| Size    | Висота | Горизонтальні відступи | Вертикальні відступи | Border-radius    | Використання                 |
| ------- | ------ | ---------------------- | -------------------- | ---------------- | ---------------------------- |
| default | 48px   | 24px                   | 12px                 | 4px              |                              |
| sm      | 36px   | 16px                   | 8px                  | 4px              | кнопки авторизації в хедері  |
| md      | 48px   | 12px                   |                      | 12px             | кнопки меню                  |
| lg      | 48px   | 48px                   |                      | 4px              | кнопки з великими відступами |
| xl      | 52px   | 16px                   | 16px                 | 10px             | теги фільтрів                |
| icon    | 36px   | —                      | —                    | квадратна кнопка | кнопка-іконка                |

## Використання з `asChild`

Використовуйте `asChild`, якщо потрібно застосувати стилі кнопки до іншого елемента, наприклад `<a>` або кастомного компонента.

Всередині використовується Radix `<Slot />`, що дозволяє зберегти семантично правильний HTML.

```tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

<Button asChild variant="primary">
  <Link href="/contact">Contact us</Link>
</Button>;
```

У цьому прикладі компонент `<Link>` успадкує всі стилі та поведінку кнопки, зберігаючи правильну маршрутизацію.
