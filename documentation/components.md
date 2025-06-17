## 📚 Components API

Each component has its own API. You can find it in the component's folder. This
is a list of more common components and their API.

<details>
<summary><b>Section</b></summary>

This component renders a section element with default top and bottom paddings.
It wraps its content in a `Container` component to center and limit the content
width. You can extend or override styles via the `className` prop.

| Prop            | Default                  | Description                                                      |
| --------------- | ------------------------ | ---------------------------------------------------------------- |
| `children`\*    | `undefined`              | Required. Any text content                                       |
| `className`     | `py-[30px] xl:py-[50px]` | Optional. Additional CSS classes to override or extend styling.  |
| `withContainer` | `true`                   | Optional. Wrap children in a Container. Set to false to disable. |

**Notes**

- The component adds vertical padding: 30px on smaller screens and 50px on xl
  screens and larger.

- You can pass any valid React nodes as children, not just text.

- The className you provide will be appended to the default padding classes. If
  you want to override the padding, specify your own padding utility classes in
  className.

**Example usage**

```tsx
// Default (with Container)
<Section className="bg-gray-100">
  <h2>Inside container</h2>
</Section>

// without Container
<Section withContainer="{false}" className="bg-gray-100">
  <h2>Without container</h2>
</Section>
```

</details>

<details>
<summary><b>Container</b></summary>

This component renders a div that centers and constrains its content width
according to responsive breakpoints. It also applies horizontal padding that
adapts to the screen size. You can pass custom classes via the className prop to
extend or override styles.

| Prop         | Default value  | Description                                                 |
| ------------ | -------------- | ----------------------------------------------------------- |
| `children`\* | —              | Required. The content to be wrapped inside the container.   |
| `className`  | `my-container` | Optional. Additional CSS classes to apply to the container. |

Responsive breakpoints (CSS variables) The container width is limited based on
these breakpoints:

| Breakpoint | Variable name   | Width  | Horisontal paddings |
| ---------- | --------------- | ------ | ------------------- |
| xs         | --breakpoint-xs | 393px  | 20px                |
| sm         | --breakpoint-sm | 768px  | 60px                |
| md         | --breakpoint-md | 1440px | 80px                |
| xl         | --breakpoint-xl | 1920px | 80px                |

Applied styles The .my-container class uses Tailwind utilities and custom CSS
variables:

```css
.my-container {
  @apply w-full mx-auto px-5;
  @apply xs:px-5 xs:max-w-[var(--breakpoint-xs)];
  @apply sm:px-15 sm:max-w-[var(--breakpoint-sm)];
  @apply md:px-20 md:max-w-[var(--breakpoint-md)];
  @apply xl:px-20 xl:max-w-[var(--breakpoint-xl)];
}
```

✅ Explanation:

- `w-full`: The container takes the full width of the viewport.

- `mx-auto`: The container is horizontally centered.

- `px-\*`: Horizontal padding varies by breakpoint.

- `max-w-\*`: The maximum width is limited by the corresponding CSS variable at
  each breakpoint.

**Example usage**

```tsx
<Container className="bg-gray-100">
  <p>This content is centered and responsive.</p>
</Container>
```

**Notes**

- The container ensures that your content stays within reasonable widths on
  large screens while providing appropriate padding on smaller screens.

- If you want to override the padding or max-width, pass your own utility
  classes via className.

</details>

<details>
<summary><b>Button</b></summary>

</details>

<details>
<summary><b>Input</b></summary>

</details>

<details>
<summary><b>Accordion</b></summary>

</details>

<details>
<summary><b>LinkWithArrow</b></summary>

</details>
