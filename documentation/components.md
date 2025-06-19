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
| sm         | --breakpoint-sm | 393px  | 20px                |
| md         | --breakpoint-md | 768px  | 60px                |
| lg         | --breakpoint-lg | 1440px | 80px                |
| xl         | --breakpoint-xl | 1920px | 80px                |

Applied styles The .my-container class uses Tailwind utilities and custom CSS
variables:

```css
.my-container {
  @apply w-full mx-auto px-5;
  @apply sm:px-5 sm:max-w-[var(--breakpoint-sm)];
  @apply md:px-15 md:max-w-[var(--breakpoint-md)];
  @apply lg:px-20 lg:max-w-[var(--breakpoint-lg)];
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

This component renders a customizable button with support for multiple visual
`variants`, `sizes`, and `asChild` rendering via Radix UI's Slot.

| Prop        | Default value | Description                                                                                       |
| ----------- | ------------- | ------------------------------------------------------------------------------------------------- |
| `variant`   | `default`     | Optional. One of the options: `ghost`, `primary`, `secondary`, `filters`, `tag`                   |
| `size`      | `default`     | Optional. One of the options: `sm`, `md`, `lg`, `xl`                                              |
| `asChild`   | `false`       | Optional. If `true`, renders the component using a Radix <Slot /> instead of a native \<button\>. |
| `className` | —             | Optional. Additional classes merged into the button's styles.                                     |
| `...props`  | —             | Any native props for \<button\> or the custom component passed through asChild.                   |

**Variants**

| Variant   | Styles                                                                                                                                                | Description                                  |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| default   | `bg-btn hover:bg-btn-hover active:bg-btn-hover text-btn-primary rounded-sm px-3 text-base`                                                            |                                              |
| ghost     | `text-btn-text text-base active:border-btn-outline-hover`                                                                                             | buttons without bg and border, hover- border |
| primary   | `'relative px-8 py-3 text-btn-primary text-base bg-btn overflow-hidden hover:bg-btn-hover active:bg-btn-active group transition-colors duration-500'` | buttons with bg                              |
| secondary | `'text-btn-secondary border-1 border-btn-outline hover:border-btn-outline-hover'`                                                                     | buttons without bg, with border              |
| filters   | `'bg-card text-base'`                                                                                                                                 | buttons with bg-card                         |
| tag       | `'bg-tag text-base gap-2'`                                                                                                                            | buttons-tag (light-gray)                     |

**Sizes**

| Size    | Height | Horisontal paddings | Vertical paddings | Border-radius       | Usage                     |
| ------- | ------ | ------------------- | ----------------- | ------------------- | ------------------------- |
| default | 48px   | 24px                | 12px              | 4px                 |                           |
| sm      | 36px   | 16px                | 8px               | 4px                 | header-auth-buttons       |
| md      | 48px   | 12px                |                   | 12px                | menu-buttons              |
| lg      | 48px   | 48px                |                   | 4px                 | buttons with big paddings |
| xl      | 52px   | 16px                | 16px              | 10px                | filter-tags               |
| icon    | 36px   | —                   | —                 | square button shape | button-icon               |

**Usage with asChild**

Use asChild when you want the button styles applied to a different element such
as an anchor \<a\> or custom component. Internally, it uses Radix’s <Slot /> to
preserve semantic HTML.

```tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

<Button asChild variant="primary">
  <Link href="/contact">Contact us</Link>
</Button>;
```

In the example above, the <Link> tag will inherit all button styles and
behaviors while preserving proper routing.

</details>

<details>
<summary><b>Input</b></summary>

</details>

<details>
<summary><b>LinkWithArrow</b></summary>

</details>
