# Modal

Цей компонент рендерить модальне вікно з анімованою появою та затемненим фоном.

Модальне вікно:

* рендериться через `Portal`;
* підтримує закриття при кліку поза межами модального вікна;
* підтримує закриття клавішею `Escape`;
* дозволяє налаштувати поведінку `useClickOutside`;
* блокує прокручування сторінки під час відкриття;
* підтримує опціональну кнопку повернення;
* підтримує опціональну кнопку закриття;
* підтримує кастомну стилізацію;
* використовує `Framer Motion` для анімації появи та зникнення.

## Props

| Prop                  | Значення за замовчуванням | Опис                                                                    |
| --------------------- | ------------------------- | ----------------------------------------------------------------------- |
| `isOpen`*             | —                         | Обов'язково. Визначає, чи відкрите модальне вікно.                      |
| `onClose`*            | —                         | Обов'язково. Callback, який викликається при закритті модального вікна. |
| `children`*           | —                         | Обов'язково. Контент модального вікна.                                  |
| `wrapperClassName`    | `""`                      | Додаткові CSS-класи для контейнера модального вікна.                    |
| `buttonClassName`     | `""`                      | Додаткові CSS-класи для кнопки повернення.                              |
| `withBackButton`      | `true`                    | Визначає, чи відображати кнопку повернення.                             |
| `withCloseButton`     | `false`                   | Визначає, чи відображати кнопку закриття (`ModalCloseButton`).          |
| `clickOutsideOptions` | —                         | Додаткові налаштування поведінки `useClickOutside`.                     |

### `clickOutsideOptions`

Prop `clickOutsideOptions` дозволяє перевизначити стандартну поведінку `useClickOutside`.

Підтримуються такі опції:

| Option            | Значення за замовчуванням | Опис                                                                    |
| ----------------- | ------------------------- | ----------------------------------------------------------------------- |
| `enabled`         | `true`                    | Вмикає або вимикає обробку кліків поза модальним вікном.                |
| `eventTypes`      | `['mousedown']`           | Події, які використовуються для визначення кліку поза модальним вікном. |
| `detectEscapeKey` | `true`                    | Дозволяє закривати модальне вікно клавішею `Escape`.                    |
| `once`            | `false`                   | Після першого виклику `callback` обробники подій видаляються.           |
| `delay`           | `50`                      | Затримка перед початком обробки зовнішніх кліків, у мілісекундах.       |
| `ignoreSelectors` | `[]`                      | CSS-селектори елементів, кліки по яких ігноруються.                     |

> `enabled` у `Modal` додатково залежить від `isOpen`: обробка подій активна лише коли модальне вікно відкрите.

## Можливості

### Portal

Модальне вікно рендериться через `Portal`, що дозволяє винести його за межі поточного DOM-контексту.

Це допомагає уникати проблем зі `stacking context` та `z-index` батьківських елементів.

### Анімація

Для появи та зникнення використовується `AnimatePresence` та `motion` з Framer Motion.

```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.3 }}
```

### Закриття при кліку поза модальним вікном

За замовчуванням модальне вікно закривається, якщо користувач натискає поза його контейнером.

Ця поведінка реалізована через `useClickOutside`.

Її можна вимкнути:

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  clickOutsideOptions={{
    enabled: false,
  }}
>
  ...
</Modal>
```

### Ігнорування окремих елементів

За допомогою `ignoreSelectors` можна виключити певні елементи з обробки зовнішнього кліку.

Наприклад:

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  clickOutsideOptions={{
    ignoreSelectors: ['.dropdown', '[data-modal-ignore]'],
  }}
>
  ...
</Modal>
```

У цьому випадку клік по елементу, який відповідає одному з цих селекторів, не закриє модальне вікно.

Це особливо корисно для dropdown, popover або інших елементів, які рендеряться поза контейнером модального вікна.

### Закриття через Escape

За замовчуванням натискання `Escape` закриває модальне вікно.

Поведінку можна вимкнути:

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  clickOutsideOptions={{
    detectEscapeKey: false,
  }}
>
  ...
</Modal>
```

### Блокування прокручування

Коли `isOpen === true`, прокручування `body` блокується:

```ts
document.body.style.overflow = 'hidden';
```

Після закриття або демонтування компонента прокручування відновлюється:

```ts
document.body.style.overflow = 'auto';
```

## Backdrop

Компонент використовує повноекранний затемнений backdrop.

Стандартні стилі:

```ts
fixed inset-0 z-[9999]
flex items-center justify-center
overflow-auto
bg-text-gray/70
```

Backdrop також підтримує анімацію прозорості.

## Modal Container

Стандартні стилі контейнера:

```ts
bg-map-btn p-6
w-[353px] md:w-[500px]
max-w-[500px]
rounded-lg
w-full
relative
```

Для зміни стилів використовується:

```tsx
wrapperClassName
```

Наприклад:

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  wrapperClassName="max-w-2xl"
>
  ...
</Modal>
```

## Адаптивна поведінка

| Breakpoint  |  Ширина |
| ----------- | ------: |
| Mobile      | `353px` |
| `md` і вище | `500px` |

При цьому контейнер також має:

```ts
max-w-[500px]
w-full
```

що дозволяє додатково контролювати його ширину через `wrapperClassName`.

## Back Button

Кнопка повернення відображається за замовчуванням:

```tsx
withBackButton={true}
```

Кнопка:

* викликає `onClose`;
* використовує іконку `Back`;
* використовує локалізований текст `settings.payment.back`;
* підтримує hover та active стани;
* підтримує кастомну стилізацію через `buttonClassName`.

Щоб приховати кнопку:

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  withBackButton={false}
>
  ...
</Modal>
```

## Close Button

Компонент підтримує окрему кнопку закриття через `ModalCloseButton`.

За замовчуванням вона вимкнена:

```tsx
withCloseButton={false}
```

Щоб відобразити її:

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  withCloseButton
>
  ...
</Modal>
```

Кнопка викликає `onClose`.

Її позиціонування та стани задаються безпосередньо в `Modal`:

```tsx
className="top-5 right-5 hover:text-btn-hover focus:text-btn-focus active:text-btn-active"
```

Таким чином, компонент може використовувати один із двох варіантів навігації:

* `Back` button;
* `Close` button;

або обидва одночасно, якщо це потрібно конкретному сценарію.

## Доступність

Підтримуються такі способи закриття:

| Дія                        | Результат               |
| -------------------------- | ----------------------- |
| Клік поза модальним вікном | Закриває модальне вікно |
| Натискання `Escape`        | Закриває модальне вікно |
| Натискання Back button     | Закриває модальне вікно |
| Натискання Close button    | Закриває модальне вікно |

Back button має:

```tsx
aria-label="Back"
```

## Приклад використання

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
>
  <h2 className="mb-4 text-xl">Delete Item</h2>

  <p className="mb-6">
    Are you sure you want to delete this item?
  </p>

  <Button onClick={() => setIsOpen(false)}>
    Confirm
  </Button>
</Modal>
```

## Приклад із Close Button

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  withBackButton={false}
  withCloseButton
>
  <CustomForm />
</Modal>
```

## Приклад із кастомним `useClickOutside`

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  clickOutsideOptions={{
    detectEscapeKey: true,
    eventTypes: ['mousedown', 'touchstart'],
    delay: 100,
    ignoreSelectors: ['.dropdown'],
  }}
>
  <CustomContent />
</Modal>
```

## Приклад із вимкненим закриттям при зовнішньому кліку

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  clickOutsideOptions={{
    enabled: false,
  }}
>
  <CustomForm />
</Modal>
```

У цьому випадку модальне вікно не закриватиметься при кліку поза контейнером, але `Escape` все ще працюватиме, якщо `detectEscapeKey` не вимкнено.

## Типові сценарії використання

* Діалоги підтвердження
* Форми
* Панелі налаштувань
* Платіжні діалоги
* Попередній перегляд зображень
* Мобільні overlay
* Action Sheets
* Dropdown / Popover всередині модального вікна
* Сценарії, де потрібно контролювати поведінку зовнішнього кліку

## Залежності

Компонент використовує:

* `Portal` — рендерить модальне вікно поза стандартною DOM-ієрархією.
* `useClickOutside` — обробляє кліки поза модальним вікном та `Escape`.
* `AnimatePresence` і `motion` з `Framer Motion` — забезпечують анімацію.
* `next-intl` — локалізація тексту Back button.
* `cn` — об'єднання та перевизначення CSS-класів.
* `ModalCloseButton` — опціональна кнопка закриття.

---
