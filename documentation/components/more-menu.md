# MoreMenu

`MoreMenu` — компонент випадаючого меню, яке відкривається кнопкою з іконкою трьох крапок (`More`).

Компонент побудований на основі `Radix UI Dropdown Menu` та підтримує довільний рендеринг пунктів меню через render-функції.

Меню рендериться через `Radix Portal`, автоматично позиціонується відносно trigger та підтримує налаштування позиціонування.

Компонент також має спеціальну обробку pointer/touch-подій, що дозволяє коректно використовувати його всередині інтерактивних контейнерів, наприклад карток або списків із swipe/drag поведінкою.

## Props

| Prop                   | Значення за замовчуванням | Опис                                                |
| ---------------------- | ------------------------- | --------------------------------------------------- |
| `items`*               | —                         | Обов'язково. Масив пунктів меню.                    |
| `className`            | `""`                      | Додаткові CSS-класи кореневого контейнера.          |
| `triggerClassName`     | `""`                      | Додаткові CSS-класи кнопки відкриття меню.          |
| `menuWrapperClassName` | `""`                      | Додаткові CSS-класи контейнера випадаючого меню.    |
| `menuListClassName`    | `""`                      | Додаткові CSS-класи `<ul>` зі списком пунктів меню. |
| `side`                 | `"bottom"`                | Сторона, з якої відкривається меню.                 |
| `align`                | `"end"`                   | Вирівнювання меню відносно trigger.                 |

## MoreMenuItem

Кожен пункт меню описується через `MoreMenuItem`:

```ts
type MoreMenuItem = {
  id: string;
  content: (close: () => void) => ReactNode;
};
```

| Property   | Type                               | Опис                                                                                    |
| ---------- | ---------------------------------- | --------------------------------------------------------------------------------------- |
| `id`*      | `string`                           | Обов'язково. Унікальний ідентифікатор пункту, який використовується як React `key`.     |
| `content`* | `(close: () => void) => ReactNode` | Обов'язково. Render-функція, яка повертає вміст пункту меню та отримує функцію `close`. |

Render-функція дозволяє використовувати будь-який React-контент:

* `button`;
* посилання;
* кастомні компоненти;
* компоненти з власною логікою.

## Функція `close`

Кожен `content` отримує callback `close`, який дозволяє програмно закрити меню після виконання дії.

```tsx
{
  id: 'edit',
  content: (close) => (
    <button
      onClick={() => {
        handleEdit();
        close();
      }}
    >
      Edit
    </button>
  ),
}
```

Для закриття меню компонент створює та dispatch-ить `KeyboardEvent` з клавішею `Escape`. Radix Dropdown Menu обробляє цю подію та закриває меню.

## `menuListClassName`

`menuListClassName` дозволяє окремо стилізувати список `<ul>`.

За замовчуванням застосовуються:

```ts
flex flex-col gap-3
text-white
items-start
justify-between
```

Наприклад:

```tsx
<MoreMenu
  menuListClassName="gap-2 items-center"
  items={items}
/>
```

Цей prop дозволяє змінювати layout самого списку, не впливаючи на контейнер меню.

## Можливості

### Radix UI Dropdown Menu

Компонент використовує:

```tsx
<DropdownMenu.Root modal={false}>
```

`modal={false}` означає, що меню не переводить весь інший інтерфейс у модальний стан.

Це особливо корисно для меню, яке знаходиться всередині інших інтерактивних компонентів.

### Portal

Контент меню рендериться через:

```tsx
<DropdownMenu.Portal>
```

Тому dropdown не обмежується DOM-контейнером, у якому знаходиться `MoreMenu`.

Це допомагає уникати проблем із:

* `overflow: hidden`;
* stacking context;
* позиціонуванням;
* `z-index` батьківських елементів.

### Avoid Collisions

Для `DropdownMenu.Content` увімкнено:

```tsx
avoidCollisions
```

Radix автоматично коригує позицію меню, якщо вказане розташування не має достатньо місця у viewport.

## Обробка подій

`MoreMenu` містить спеціальну обробку pointer та touch-подій.

### `onPointerDown`

На trigger використовується:

```tsx
onPointerDown={(e) => e.stopPropagation()}
```

Це запобігає поширенню `pointerdown` до батьківських елементів.

Це важливо, якщо `MoreMenu` використовується всередині контейнера, який має власну pointer-логіку.

### Touch events

Компонент відстежує, чи був під час touch взаємодії рух:

```tsx
onTouchStart={() => {
  movedRef.current = false;
}}

onTouchMove={() => {
  movedRef.current = true;
}}
```

Якщо користувач рухав пальцем, `click` не повинен відкривати меню:

```tsx
if (movedRef.current) {
  e.preventDefault();
  return;
}
```

Це дозволяє коректно використовувати `MoreMenu` у компонентах зі swipe/drag поведінкою та запобігає випадковому відкриттю меню після жесту.

## Зупинка поширення подій

Для trigger та content використовується зупинка поширення подій.

Trigger:

```tsx
onPointerDown={(e) => e.stopPropagation()}
```

Menu content:

```tsx
onClick={(e) => e.stopPropagation()}
```

Також click на trigger передається до:

```ts
stopEvent(e);
```

Це дозволяє використовувати `MoreMenu` всередині інтерактивних батьківських елементів, не запускаючи їхню click-логіку.

## Позиціонування

Положення меню налаштовується через `side` та `align`.

### `side`

| Значення | Опис                                     |
| -------- | ---------------------------------------- |
| `top`    | Меню відкривається над trigger.          |
| `right`  | Меню відкривається праворуч від trigger. |
| `bottom` | Меню відкривається під trigger.          |
| `left`   | Меню відкривається ліворуч від trigger.  |

За замовчуванням:

```tsx
side="bottom"
```

### `align`

| Значення | Опис                             |
| -------- | -------------------------------- |
| `start`  | Вирівнювання по початку trigger. |
| `center` | Центрування відносно trigger.    |
| `end`    | Вирівнювання по кінцю trigger.   |

За замовчуванням:

```tsx
align="end"
```

Приклад:

```tsx
<MoreMenu
  side="right"
  align="start"
  items={items}
/>
```

## Стилізація

### Root container

Стандартний клас:

```ts
relative
```

Додаткові класи:

```tsx
className
```

### Trigger

Стандартні класи:

```ts
px-2
w-10
h-10
flex
justify-center
align-center
touch-pan-y
```

Іконка `More` має:

```ts
cursor-pointer
size-5
text-foreground
hover:text-btn-hover
active:text-btn-active
```

Додаткові класи trigger:

```tsx
triggerClassName
```

### Menu wrapper

Стандартні класи:

```ts
rounded-lg
bg-review-bg
p-4
shadow-lg
translate-y-3
z-[999]
relative
```

Додаткові класи:

```tsx
menuWrapperClassName
```

### Menu list

Стандартні класи:

```ts
flex flex-col gap-3
text-white
items-start
justify-between
```

Додаткові класи:

```tsx
menuListClassName
```

Таким чином, стилізація розділена на три рівні:

```text
className
  ↓
Root container

triggerClassName
  ↓
Trigger button

menuWrapperClassName
  ↓
Dropdown content

menuListClassName
  ↓
< ul >
```

## Приклад використання

```tsx
<MoreMenu
  items={[
    {
      id: 'edit',
      content: (close) => (
        <button
          onClick={() => {
            handleEdit();
            close();
          }}
        >
          Edit
        </button>
      ),
    },
    {
      id: 'delete',
      content: (close) => (
        <button
          onClick={() => {
            handleDelete();
            close();
          }}
        >
          Delete
        </button>
      ),
    },
  ]}
/>
```

## Приклад із кастомним позиціонуванням

```tsx
<MoreMenu
  side="right"
  align="start"
  menuWrapperClassName="w-56"
  items={[
    {
      id: 'share',
      content: (close) => (
        <button
          onClick={() => {
            handleShare();
            close();
          }}
        >
          Share
        </button>
      ),
    },
  ]}
/>
```

## Приклад із кастомним списком

```tsx
<MoreMenu
  menuWrapperClassName="w-64"
  menuListClassName="gap-2 items-center"
  items={[
    {
      id: 'edit',
      content: (close) => (
        <button
          onClick={() => {
            handleEdit();
            close();
          }}
        >
          Edit
        </button>
      ),
    },
  ]}
/>
```

## Типові сценарії використання

`MoreMenu` підходить для:

* меню дій у картках;
* меню дій у таблицях;
* меню в списках;
* Edit/Delete меню;
* Share/Copy меню;
* контекстних дій;
* інтерактивних елементів усередині swipe/drag контейнерів.

## Залежності

Компонент використовує:

* `@radix-ui/react-dropdown-menu` — логіка dropdown, позиціонування, Portal та керування станом меню;
* `More` — іконка trigger;
* `cn` — об'єднання CSS-класів;
* `stopEvent` — зупинка поширення подій;
* React `useRef` — відстеження touch-руху.
