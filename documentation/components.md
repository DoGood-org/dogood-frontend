# 📚 Components API

Each component has its own API. You can find it in the component's folder. This
is a list of more common components and their API.

## Section

This component renders a section element with default top and bottom paddings.
It wraps its content in a `Container` component to center and limit the content
width. You can extend or override styles via the `className` prop.

| Prop            | Default                  | Description                                                      |
| --------------- | ------------------------ | ---------------------------------------------------------------- |
| `children`\*    | `undefined`              | Required. Any text content                                       |
| `className`     | `py-[30px] xl:py-[50px]` | Optional. Additional CSS classes to override or extend styling.  |
| `withContainer` | `true`                   | Optional. Wrap children in a Container. Set to false to disable. |

  <details>
  <summary><b>Details</b></summary>

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

## Container

This component renders a div that centers and constrains its content width
according to responsive breakpoints. It also applies horizontal padding that
adapts to the screen size. You can pass custom classes via the className prop to
extend or override styles.

| Prop         | Default value  | Description                                                 |
| ------------ | -------------- | ----------------------------------------------------------- |
| `children`\* | —              | Required. The content to be wrapped inside the container.   |
| `className`  | `my-container` | Optional. Additional CSS classes to apply to the container. |

<details>
<summary><b>Details</b></summary>

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

## Button

This component renders a customizable button with support for multiple visual
`variants`, `sizes`, and `asChild` rendering via Radix UI's Slot.

| Prop        | Default value | Description                                                                                       |
| ----------- | ------------- | ------------------------------------------------------------------------------------------------- |
| `variant`   | `default`     | Optional. One of the options: `ghost`, `primary`, `secondary`, `filters`, `tag`                   |
| `size`      | `default`     | Optional. One of the options: `sm`, `md`, `lg`, `xl`                                              |
| `asChild`   | `false`       | Optional. If `true`, renders the component using a Radix <Slot /> instead of a native \<button\>. |
| `className` | —             | Optional. Additional classes merged into the button's styles.                                     |
| `...props`  | —             | Any native props for \<button\> or the custom component passed through asChild.                   |

<details>
<summary><b>Details</b></summary>

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

## LinkWithArrow

This React component renders a styled link with accompanying right-pointing
arrow icon. It's built on top of Next.js's Link component and is designed for
internal navigation within your app.

**Props:**

| Name        | Type            | default                                            | Description                                                                   |
| ----------- | --------------- | -------------------------------------------------- | ----------------------------------------------------------------------------- |
| `href`\*    | string          | -                                                  | Requered. The URL or route to navigate to (e.g., /about, /contact).           |
| `text`\*    | string          | -                                                  | Requered. The text label displayed inside the link.                           |
| `className` | string          | ""                                                 | Optional. additional Tailwind classes to customize the appearance externally. |
| `icon`      | React.ReactNode | `<ArrowRight className="stroke-current size-6" />` | Optional. Use to change default icon                                          |
| `onClick`   | `() => void;`   |                                                    | Optional. Use to pass the handler to the click                                |

<details>
<summary><b>Details</b></summary>

**Styling:**

- `text-base`: Default text style.

- `hover:text-btn-hover, focus:text-btn-hover, active:text-btn-active`: Color
  changes on interaction.

- `flex items-center gap-2`: Aligns text and icon horizontally with spacing.

Arrow Icon:

- Uses the `ArrowRight` icon component (default). To change use `icon` props

- Inherits text color via stroke-current.

- Sized with size-6 for consistency.

**Class Merging:**

Uses a utility function cn to conditionally and safely combine base and custom
class names.

**Example Usage:**

```tsx
<LinkWithArrow
  href={`/${locale}/about`}
  text={t('aboutButton')}
  className="mt-auto"
/>

// with optional props

<LinkWithArrow
  text={name}
  href={`/${locale}${src}`}
  icon={iconComponents[icon]}
  onClick={onClose}
  className="flex items-center gap-3 w-full justify-between"
/>

```

</details>

## Accordion

This component renders a list item (\<li>) that serves as the root of an
accordion. It uses Radix UI’s Accordion.Root under the hood and supports
multiple or single item expansion. Useful for organizing collapsible content
like FAQs, lists, or settings panels.

It accepts all native props supported by Radix Accordion and passes through any
additional props.

| Prop          | Default value | Description                                                              |
| ------------- | ------------- | ------------------------------------------------------------------------ |
| `children`\*  | —             | Required. The accordion items to be displayed inside the root element.   |
| `type`        | —             | Optional. Radix prop to set accordion behavior — 'single' or 'multiple'. |
| `collapsible` | —             | Optional. Whether all items can be collapsed (used with type='single').  |

<details>
<summary><b>Details</b></summary>

**Notes**

- The component renders as \<li> with data-slot="accordion" for consistent
  theming or targeting.

- Supports accessibility out of the box via Radix primitives.

- You can wrap this in a \<ul> or \<div> depending on semantics of the parent
  layout.

**AccordionItem**

This component renders a single collapsible item in the accordion. It adds
spacing below each item (except the last one) to visually separate them.

| Prop        | Default value           | Description                                                      |
| ----------- | ----------------------- | ---------------------------------------------------------------- |
| `children`  | —                       | Required. Usually includes AccordionTrigger and ccordionContent. |
| `className` | mb-[30px] last:mb-[0px] | Optional. Additional classes to customize spacing or style.      |

**Notes**

- Adds data-slot="accordion-item" for easier styling or testing.

- Margin is automatically removed on the last item.

**AccordionTrigger**

This component renders the clickable header of the accordion item. It uses
AccordionPrimitive.Trigger inside a header element and includes accessibility
features and focus styles.

| Prop         | Default value | Description                                          |
| ------------ | ------------- | ---------------------------------------------------- |
| `children`\* | —             | Required. The label for the accordion toggle.        |
| `className`  | —             | Optional. Custom classes to override default styles. |

**Notes**

- Wrapped in a \<header> for semantic correctness.

- Adds data-slot="accordion-trigger" for styling hooks.

- Includes focus and hover styling via Tailwind utilities.

- Fully accessible via keyboard navigation.

**AccordionContent**

This component renders the collapsible panel of an item. It animates open/close
transitions and wraps children with inner padding.

| Prop         | Default value | Description                                               |
| ------------ | ------------- | --------------------------------------------------------- |
| `children`\* | —             | Required. The content to show when item is expanded.      |
| `className`  | pt-0 pb-4     | Optional. Additional classes to modify padding or layout. |

**Notes**

- Applies built-in Radix animation utilities via data-state.

- The content is wrapped in a \<div> to control vertical spacing.

- Adds data-slot="accordion-content" for advanced theming.

**Example usage**

```tsx
<ul>
  <Accordion type="single" collapsible>
    <AccordionItem value="faq-1">
      <AccordionTrigger>What is DoGood?</AccordionTrigger>
      <AccordionContent>
        DoGood is a kindness-powered platform connecting people through
        volunteerism.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="faq-2">
      <AccordionTrigger>How can I contribute?</AccordionTrigger>
      <AccordionContent>
        You can join community efforts, donate, or volunteer for specific tasks
        listed on the site.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</ul>
```

</details>

## Rating

This React component renders a 5-star rating UI. It supports both a read-only
display mode and an editable mode where users can select a rating.

**Props:**

| Name         | Type                     | Default     | Description                                                                       |
| ------------ | ------------------------ | ----------- | --------------------------------------------------------------------------------- |
| `rating`\*   | number                   | -           | Required. Current rating value (1 to 5).                                          |
| `isEditable` | boolean                  | `false`     | Optional. If `true`, allows the user to change the rating via mouse and keyboard. |
| `setRating`  | (rating: number) => void | `undefined` | Optional. Function to update the rating when editable.                            |
| `tabIndex`   | number                   | 0           | Optional. Sets the tabindex for keyboard accessibility.                           |
| `error`      | FieldError               | `undefined` | Optional. Validation error object for displaying error message and styles.        |
| `...props`   | React.HTMLAttributes     | -           | Additional props passed to the container \<ul>.                                   |

<details> <summary><b>Details</b></summary>

**Full Interactivity:**

- Stars visually highlight on hover.

- Clicking a star updates the rating (if `setRating` is provided).

- Supports keyboard navigation (arrow keys).

- Includes appropriate ARIA attributes for accessibility.

- Displays error message below if `error` is present.

**Read-Only Mode:**

- If `isEditable` is `false` or omitted, the rating is displayed statically.

- No interaction or keyboard support.

**Implementation Notes:**

- Uses internal state to show temporary hover effects without updating the main
  rating state.

**Example Usage:**

```tsx
// Simple read-only rating display
<Rating rating={4} />;

// Editable rating with change handler and error display
const [rate, setRate] = useState(3);

<Rating
  rating={rate}
  isEditable={true}
  setRating={setRate}
  error={errors.rating}
/>;
```

</details>

## StarItem

This component renders a single star within the `Rating` component.

**Props:**

| Name            | Type                                      | Default     | Description                                                       |
| --------------- | ----------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `index`\*       | number                                    | -           | Required. The star’s position index (0 to 4).                     |
| `isFilled`\*    | boolean                                   | `false`     | Required. Whether the star is filled (highlighted).               |
| `isEditable`    | boolean                                   | `false`     | Optional. Whether the star is interactive (clickable, focusable). |
| `error`         | FieldError                                | `undefined` | Optional. Validation error for styling.                           |
| `changeDisplay` | (index: number) => void                   | -           | Function called on mouse hover (to show temporary fill).          |
| `resetDisplay`  | () => void                                | -           | Function called on mouse leave (to reset temporary fill).         |
| `onClick`       | (index: number) => void                   | -           | Function called when the star is clicked.                         |
| `handleKey`     | (e: KeyboardEvent) => void                | -           | Keyboard event handler (e.g., arrow keys).                        |
| `computeFocus`  | (rating: number, index: number) => number | -           | Determines tabindex value for keyboard navigation.                |

<details> <summary><b>Details</b></summary>

- Responsible for the visual fill state of the star.

- Handles mouse and keyboard events for interactivity.

- Applies conditional styling depending on filled state, editability, and
  errors.

**Example Usage:**

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

//Exemple from Rating-component
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

</details>

## AnimationTabs

This React component renders an animated tab selector, designed for use in
account/profile pages where the user can switch between different content views
(e.g. Tasks, Organization, Reviews). It supports swipe gestures on mobile,
animated underline for active tab, and optional horizontal scrolling.

**Props:**

| Name                             | Type                   | Default | Description                                                              |
| -------------------------------- | ---------------------- | ------- | ------------------------------------------------------------------------ |
| `views`\*                        | { view: string }[]     | —       | Required. Array of tab view objects. Each must have a view string label. |
| `activeView`\*                   | string                 | —       | Required. The currently selected tab value.                              |
| `onChange`\*                     | (view: string) => void | —       | Required. Callback when a                                                |
| different tab is clicked/swiped. |
| `isScroll`                       | boolean                | `false` | Optional. Enables horizontal scroll for mobile if true.                  |
| `buttonClass`                    | string                 | ""      | Optional. Additional Tailwind classes for tab buttons.                   |
| `refClass`                       | string                 | ""      | Optional. Additional Tailwind classes for the container of tab buttons.  |
| `headClass`                      | string                 | ""      | Optional. Classes for the outermost wrapper of the component.            |

<details> <summary><b>Details</b></summary>

**Behavior:**

- On mobile with `isScroll: true`, tabs become horizontally scrollable and
  swipeable (left swipe activates the next tab).

- The active tab is visually highlighted with a motion.div underline animation.

- An optional next arrow button (`CaretDoubleRight`) appears on mobile to jump
  to the next tab manually.

**Interactivity:**

- Click or tap on a tab to trigger `onChange(view)`.

- Swipe left to go to the next tab (only if `isScroll === true` and on mobile).

- On `desktop/tablet (min-width: 768px)`, all tabs are visible statically (no
  scrolling/swiping).

**Dependencies:**

- framer-motion is used for the animated active underline.

- Custom hooks:

  - `useMediaQuery` — detects screen size.

  - `useScrollToActive` — scrolls the active tab into view.

  - `useSwipe` — tracks swipe gestures.

**Example Usage:**

```tsx
<AnimationTabs
  views={[{ view: 'Tasks' }, { view: 'Organization' }, { view: 'Reviews' }]}
  activeView={activeView}
  onChange={setActiveView}
  isScroll={true}
  buttonClass="p-3"
  refClass="gap-2"
  headClass="mb-4"
/>
```

</details>
