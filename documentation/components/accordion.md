# Accordion

Цей компонент рендерить акордеон на базі `Radix UI Accordion.Root`.

Підтримує:

- одиночне відкриття елементів (`single`);
- множинне відкриття елементів (`multiple`);
- спеціальний режим для мобільного меню через `isMobileMenu`.

Компонент приймає всі пропси, які підтримує `Radix Accordion`, і передає їх далі.

## Props

| Prop           | Значення за замовчуванням | Опис                                                                         |
| -------------- | ------------------------- | ---------------------------------------------------------------------------- |
| `children`*    | —                         | Обов'язково. Елементи акордеона                                              |
| `type`         | —                         | Необов'язково. Режим роботи акордеона: `single` або `multiple`               |
| `collapsible`  | —                         | Необов'язково. Дозволяє згортати всі елементи (для `single`)                 |
| `isMobileMenu` | `false`                   | Необов'язково. Використовує спеціальний режим рендерингу для мобільного меню |


## Режими рендерингу

### Стандартний режим

За замовчуванням компонент рендерить:

```tsx
<AccordionPrimitive.Root />
```

та додає:

```tsx
data-slot="accordion"
```

### Режим мобільного меню

Якщо передати:

```tsx
isMobileMenu={true}
```

компонент буде використовувати:

```tsx
<AccordionPrimitive.Root asChild>
  <li data-slot="accordion">
    ...
  </li>
</AccordionPrimitive.Root>
```

Це дозволяє використовувати акордеон всередині списків мобільної навігації без створення зайвих DOM-вузлів.

**Примітки**

- Компонент побудований на основі Radix UI.
- Підтримує accessibility можливості Radix з коробки.
- У режимі `isMobileMenu` кореневим елементом стає `<li>`.

---

## AccordionItem

Цей компонент рендерить окремий елемент акордеона.

| Prop        | Значення за замовчуванням | Опис                                    |
| ----------- | ------------------------- | --------------------------------------- |
| `children`  | —                         | Обов'язково. Контент елемента акордеона |
| `className` | `mb-[30px] last:mb-[0px]` | Необов'язково. Додаткові класи          |

**Примітки**

- Додає:

  ```tsx
  data-slot="accordion-item"
  ```

- Автоматично прибирає нижній відступ для останнього елемента.

---

## AccordionTrigger

Цей компонент рендерить кнопку відкриття/закриття елемента акордеона.

Використовує:

```tsx
AccordionPrimitive.Trigger
```

та автоматично додає стилі доступності й анімації.

| Prop        | Значення за замовчуванням | Опис                               |
| ----------- | ------------------------- | ---------------------------------- |
| `children`* | —                         | Обов'язково. Контент кнопки        |
| `className` | —                         | Необов'язково. Додаткові CSS-класи |

**Примітки**

- Додає:

  ```tsx
  data-slot="accordion-trigger"
  ```

- Має підтримку:
  - keyboard navigation;
  - focus-visible;
  - disabled state.

- Рендериться всередині контейнера:

  ```tsx
  <div className="flex w-full">
  ```

- Використовує стандартні стилі:

  ```tsx
  group
  flex
  flex-1
  items-center
  justify-between
  gap-[8px]
  transition-all
  duration-700
  ```

---

## AccordionContent

Цей компонент рендерить контент акордеона.

Використовує:

```tsx
AccordionPrimitive.Content
```

та підтримує анімації відкриття і закриття.

| Prop        | Значення за замовчуванням | Опис                               |
| ----------- | ------------------------- | ---------------------------------- |
| `children`* | —                         | Обов'язково. Контент елемента      |
| `className` | —                         | Необов'язково. Додаткові CSS-класи |

**Примітки**

- Додає:

  ```tsx
  data-slot="accordion-content"
  ```

- Використовує анімації Radix:

  ```tsx
  data-[state=open]:animate-accordion-down
  data-[state=closed]:animate-accordion-up
  ```

- Контент автоматично обгортається у:

  ```tsx
  <div className="pt-0 pb-4 break-words">
  ```

що забезпечує:

- нижній внутрішній відступ;
- коректне перенесення довгих слів і URL.

## Приклад використання

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="faq-1">
    <AccordionTrigger>
      What is DoGood?
    </AccordionTrigger>

    <AccordionContent>
      DoGood is a kindness-powered platform
      connecting people through volunteerism.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```
