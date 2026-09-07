
# useClickOutside

`useClickOutside` — кастомний React hook для виконання callback при взаємодії користувача поза заданим DOM-елементом.

Hook підтримує:

* визначення кліку поза елементом;
* кілька типів DOM-подій;
* закриття через `Escape`;
* одноразове виконання callback;
* затримку перед активацією обробників;
* ігнорування певних DOM-елементів через CSS-селектори;
* повне вимкнення обробки.

## Тип `UseClickOutsideOptions`

```ts
type UseClickOutsideOptions = {
  enabled?: boolean;
  eventTypes?: ('mousedown' | 'click' | 'touchstart')[];
  detectEscapeKey?: boolean;
  once?: boolean;
  delay?: number;
  ignoreSelectors?: string[];
};
```

## Options

| Option            | Default         | Опис                                                                  |
| ----------------- | --------------- | --------------------------------------------------------------------- |
| `enabled`         | `true`          | Вмикає або вимикає hook.                                              |
| `eventTypes`      | `['mousedown']` | DOM-події, які перевіряються для визначення зовнішнього кліку.        |
| `detectEscapeKey` | `true`          | Вмикає обробку клавіші `Escape`.                                      |
| `once`            | `false`         | Видаляє event listeners після першого виклику callback.               |
| `delay`           | `50`            | Затримка перед початком обробки подій, у мілісекундах.                |
| `ignoreSelectors` | `[]`            | CSS-селектори елементів, кліки по яких не повинні викликати callback. |

## Базове використання

```tsx
const ref = useRef<HTMLDivElement>(null);

useClickOutside({
  ref,
  callback: handleClose,
});
```

У цьому випадку `handleClose` буде викликаний при:

* `mousedown` поза `ref`;
* натисканні `Escape`.

## Event Types

За замовчуванням використовується:

```ts
eventTypes = ['mousedown'];
```

Можна передати кілька подій:

```tsx
useClickOutside({
  ref,
  callback: handleClose,
  options: {
    eventTypes: ['mousedown', 'click', 'touchstart'],
  },
});
```

## Ignore Selectors

`ignoreSelectors` дозволяє визначити елементи, які повинні ігноруватися під час перевірки зовнішнього кліку.

```tsx
useClickOutside({
  ref,
  callback: handleClose,
  options: {
    ignoreSelectors: [
      '.dropdown',
      '[data-modal-ignore]',
    ],
  },
});
```

Для перевірки використовується `Element.closest()`, тому selector також може відповідати батьківському елементу target.

Наприклад, якщо користувач натисне на:

```html
<div class="dropdown">
  <button>Option</button>
</div>
```

клік буде проігнорований, оскільки `button` знаходиться всередині `.dropdown`.

## Delay

Hook використовує невелику затримку перед підключенням event listeners:

```ts
delay = 50;
```

Це дозволяє уникнути небажаного спрацьовування зовнішнього кліку одразу після відкриття компонента.

Значення можна змінити:

```tsx
useClickOutside({
  ref,
  callback: handleClose,
  options: {
    delay: 100,
  },
});
```

## Once

За замовчуванням callback може викликатися багато разів:

```ts
once = false;
```

Якщо встановити:

```tsx
useClickOutside({
  ref,
  callback: handleClose,
  options: {
    once: true,
  },
});
```

після першого виклику `callback` hook видалить встановлені event listeners.

## Escape

За замовчуванням `Escape` активний:

```ts
detectEscapeKey = true;
```

Його можна вимкнути:

```tsx
useClickOutside({
  ref,
  callback: handleClose,
  options: {
    detectEscapeKey: false,
  },
});
```

## Enabled

Hook можна повністю вимкнути:

```tsx
useClickOutside({
  ref,
  callback: handleClose,
  options: {
    enabled: false,
  },
});
```

У цьому випадку event listeners не додаються.

## Безпечна перевірка Event Target

Hook перевіряє, що `event.target` є `Node` перед використанням:

```ts
if (!(target instanceof Node)) return;
```

Це дозволяє безпечно використовувати `contains()` та `closest()` без припущення щодо типу `EventTarget`.

## Очищення Event Listeners

Hook автоматично видаляє всі додані event listeners при:

* `enabled === false`;
* зміні залежностей;
* unmount компонента;
* використанні `once === true` після першого спрацювання.

Це запобігає накопиченню глобальних listeners у `document`.

## Використання з Modal

`Modal` передає власний `modalRef` у `useClickOutside`:

```tsx
useClickOutside({
  ref: modalRef,
  callback: onClose,
  options: {
    detectEscapeKey: true,
    ...clickOutsideOptions,
    enabled: isOpen && (clickOutsideOptions?.enabled ?? true),
  },
});
```

Таким чином, `Modal` автоматично:

* активує `useClickOutside` лише коли відкритий;
* дозволяє користувачу перевизначити його поведінку;
* зберігає `Escape` увімкненим за замовчуванням;
* підтримує `ignoreSelectors`, `delay`, `once` та інші опції безпосередньо через `clickOutsideOptions`.

## Залежності

`useClickOutside` використовує тільки стандартні React API:

* `useEffect`
* `useState`
* `RefObject`

Додаткові бібліотеки не потрібні.

