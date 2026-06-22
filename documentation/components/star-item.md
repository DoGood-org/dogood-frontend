
# StarItem

Цей компонент рендерить окрему зірку всередині компонента `Rating`.

## Props

| Name            | Type                                        | Default     | Description                                     |
| --------------- | ------------------------------------------- | ----------- | ----------------------------------------------- |
| `index`*        | number                                      | -           | Обов'язково. Позиція зірки від 0 до 4           |
| `isFilled`*     | boolean                                     | `false`     | Обов'язково. Визначає, чи зафарбована зірка     |
| `isEditable`    | boolean                                     | `false`     | Необов'язково. Чи є зірка інтерактивною         |
| `error`         | FieldError                                  | `undefined` | Необов'язково. Помилка валідації для стилізації |
| `changeDisplay` | `(index: number) => void`                   | -           | Викликається при наведенні миші                 |
| `resetDisplay`  | `() => void`                                | -           | Викликається після виходу курсора               |
| `onClick`       | `(index: number) => void`                   | -           | Викликається при натисканні                     |
| `handleKey`     | `(e: KeyboardEvent) => void`                | -           | Обробник клавіатурних подій                     |
| `computeFocus`  | `(rating: number, index: number) => number` | -           | Обчислює tabindex для навігації                 |


## Примітки

- Відповідає за візуальне відображення заповненої або незаповненої зірки.
- Обробляє події миші та клавіатури.
- Застосовує умовні стилі залежно від:
  - стану заповнення;
  - можливості редагування;
  - наявності помилки.

## Приклад використання

```tsx
<StarItem
  index={0}
  isFilled={true}
  isEditable={true}
  changeDisplay={() => {}}
  resetDisplay={() => {}}
  onClick={() => {}}
  handleKey={() => {}}
  computeFocus={() => 0}
/>
```

Приклад із компонента Rating:

```tsx
<StarItem
  index={index}
  isFilled={index < displayRating}
  isEditable={isEditable}
  error={error}
  changeDisplay={changeDisplay}
  resetDisplay={resetDisplay}
  onClick={onClick}
  handleKey={handleKey}
  computeFocus={computeFocus}
  ref={(el) => {
    ratingArrayRef.current[index] = el;
  }}
/>
```
