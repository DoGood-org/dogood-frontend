# Styles documentation

- [Breakpoints](#breakpoints)
- [Text](#text)
- [Colors](#colors)
- [Radius](#radius)

## Breakpoints

| Name | Width  | Description (usage) |
| ---- | ------ | ------------------- |
| sm   | 393px  | mobile (default)    |
| md   | 768px  | tablet              |
| lg   | 1440px | desktop             |

**Styles**

```css
/* breakpoints */
--breakpoint-*: initial;
--breakpoint-sm: 24.5625rem; /*393px*/
--breakpoint-md: 48rem; /*768px*/
--breakpoint-lg: 90rem; /*1440px*/
```

**Example usage**

```tsx
<Component className="w-full md:w-[100px] lg:w-[200px]">Content</Component>
```

## Text

| Class      | Font-size | Line-height | Description (usage)                        |
| ---------- | --------- | ----------- | ------------------------------------------ |
| .text-sm   | 14px      | 16px        | small paragraph                            |
| .text-base | 16px      | 24px        | base text, paragraph, buttons              |
| .text-md   | 18px      | 26px        | paragraph                                  |
| .text-lg   | 32px      | 48px        | big paragraph                              |
| .text-h1   | 32px      | 48px        | h1 - mobile and tablet (only one to page)  |
| .text-h1-d | 72px      | 92px        | h1 - desktop-version (only one to page)    |
| .text-h2-m | 24px      | 32px        | h2 - mobile-version (when tablet is other) |
| .text-h2   | 32px      | 48px        | h2 (section-titles)                        |
| .text-h2-d | 48px      | 64px        | h2 - desktop-version                       |
| .text-h3   | 24px      | 32px        | h3                                         |
| .text-h3-d | 48px      | 64px        | h3 - desktop-version                       |

<details>
<summary>
<b>Styles</b>
</summary>

```css
@theme {
  /* font sizes and line-height desktop */
  --text-sm: 14px;
  --leading-sm: 16px;
  --text-base: 16px;
  --leading-base: 24px;
  --text-md: 18px;
  --leading-md: 26px;
  --text-lg: 32px;
  --leading-lg: 48px;

  --text-h1-d: 72px;
  --leading-h1-d: 92px;
  --text-h2-d: 48px;
  --leading-h2-d: 64px;
  --text-h3-d: 48px;
  --leading-h3-d: 64px;

  /* font sizes and line-height mobile */
  --text-h1: 32px;
  --leading-h1: 48px;
  --text-h2-m: 24px;
  --leading-h2-m: 32px;
  --text-h2: 32px;
  --leading-h2: 48px;
  --text-h3: 24px;
  --leading-h3: 32px;
}

@layer utilities {
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--leading-sm);
  }

  @media (min-width: 48rem) {
    .md\:text-sm {
      font-size: var(--text-sm);
      line-height: var(--leading-sm);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-sm {
      font-size: var(--text-sm);
      line-height: var(--leading-sm);
    }
  }

  .text-base {
    font-size: var(--text-base);
    line-height: var(--leading-base);
  }

  @media (min-width: 48rem) {
    .md\:text-base {
      font-size: var(--text-base);
      line-height: var(--leading-base);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-base {
      font-size: var(--text-base);
      line-height: var(--leading-base);
    }
  }

  .text-md {
    font-size: var(--text-md);
    line-height: var(--leading-md);
  }

  @media (min-width: 48rem) {
    .md\:text-md {
      font-size: var(--text-md);
      line-height: var(--leading-md);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-md {
      font-size: var(--text-md);
      line-height: var(--leading-md);
    }
  }

  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--leading-lg);
  }

  @media (min-width: 48rem) {
    .md\:text-lg {
      font-size: var(--text-lg);
      line-height: var(--leading-lg);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-lg {
      font-size: var(--text-lg);
      line-height: var(--leading-lg);
    }
  }

  .text-h1 {
    font-size: var(--text-h1);
    line-height: var(--leading-h1);
  }

  @media (min-width: 48rem) {
    .md\:text-h1 {
      font-size: var(--text-h1);
      line-height: var(--leading-h1);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h1 {
      font-size: var(--text-h1);
      line-height: var(--leading-h1);
    }
  }

  .text-h1-d {
    font-size: var(--text-h1-d);
    line-height: var(--leading-h1-d);
  }

  @media (min-width: 48rem) {
    .md\:text-h1-d {
      font-size: var(--text-h1-d);
      line-height: var(--leading-h1-d);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h1-d {
      font-size: var(--text-h1-d);
      line-height: var(--leading-h1-d);
    }
  }

  .text-h2-m {
    font-size: var(--text-h2-m);
    line-height: var(--leading-h2-m);
  }

  @media (min-width: 48rem) {
    .md\:text-h2-m {
      font-size: var(--text-h2-m);
      line-height: var(--leading-h2-m);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h2-m {
      font-size: var(--text-h2-m);
      line-height: var(--leading-h2-m);
    }
  }

  .text-h2 {
    font-size: var(--text-h2);
    line-height: var(--leading-h2);
  }

  @media (min-width: 48rem) {
    .md\:text-h2 {
      font-size: var(--text-h2);
      line-height: var(--leading-h2);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h2 {
      font-size: var(--text-h2);
      line-height: var(--leading-h2);
    }
  }

  .text-h2-d {
    font-size: var(--text-h2-d);
    line-height: var(--leading-h2-d);
  }

  @media (min-width: 48rem) {
    .md\:text-h2-d {
      font-size: var(--text-h2-d);
      line-height: var(--leading-h2-d);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h2-d {
      font-size: var(--text-h2-d);
      line-height: var(--leading-h2-d);
    }
  }

  .text-h3 {
    font-size: var(--text-h3);
    line-height: var(--leading-h3);
  }

  @media (min-width: 48rem) {
    .md\:text-h3 {
      font-size: var(--text-h3);
      line-height: var(--leading-h3);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h3 {
      font-size: var(--text-h3);
      line-height: var(--leading-h3);
    }
  }

  .text-h3-d {
    font-size: var(--text-h3-d);
    line-height: var(--leading-h3-d);
  }

  @media (min-width: 48rem) {
    .md\:text-h3-d {
      font-size: var(--text-h3-d);
      line-height: var(--leading-h3-d);
    }
  }

  @media (min-width: 90rem) {
    .lg\:text-h3-d {
      font-size: var(--text-h3-d);
      line-height: var(--leading-h3-d);
    }
  }
}
```

</details>

**Example usage**

```html
<h1 className="text-h1 lg:text-h1-d">Title 1</h1>

<p className="text-base lg:text-lg">Big paragraph</p>

<p className="text-sm">Small paragraph</p>

<button className="text-base">Button</button>
```

## Colors

<details>
<summary>Styles</summary>

```css
/* colors */
--color-background: var(--background);
--color-foreground: var(--foreground);
--color-text-help: var(--text-help);
--color-text-gray: var(--text-gray);
--color-layout-background: var(--layout-background);
--color-card: var(--card);
--color-toggle: var(--toggle);

/_ buttons _/ --color-border: var(--border); --color-btn: var(--btn);
--color-btn-text: var(--btn-text); --color-btn-hover: var(--btn-hover);
--color-btn-active: var(--btn-active); --color-btn-outline: var(--btn-outline);
--color-btn-outline-hover: var(--btn-outline-hover); --color-btn-outline-active:
var(--btn-outline-active); --color-tag: var(--tag);

--color-error: var(--error); --color-attention: var(--attention);

--color-star: var(--star);

```

Light theme variables

```css
--background: #f1f1f1;
--background-secondary: #696969;
--foreground: #1b1b1b;
--header-bg: #171b19;
--footer-bg: #111215;
--layout-background: #111215;
--text-help: #696969;
--text-gray: #999999;
--white: #f1f1f1;
--text_tag: #010101;
--tag: #696969;
--post: #696969;
--post_gray: #f1f1f1;

--card: #e6e6e6;
--toggle: #303030;

--border: #17814b;
--btn: #17814b;
--btn-primary: #ffffff;
--btn-secondary: #f1f1f1;
--btn-text: #f1f1f1;
--btn-hover: #4caf50;
--btn-active: #0a6f3c;
--btn-outline: #17814b;
--btn-outline-hover: #4caf50;
--btn-outline-active: #0a6f3c;
--map-btn-bg: #999999;
--map-btn-icon: #171b19;
--news-item-hover: #1ad3aa;

--bg-icon: #171b19;
--icon-color: #f1f1f1;
--image-bg: #999999;

--review-bg: #696969;
--review-reverse: #f1f1f1;

--error: #ee0606;
--success: #17814b;

--star: #ffee00;
--medicine: #1f5eff;
--animal: #ff7d57;
--nature: #4caf50;
--food: #e4a23c;
```

Dark theme variables

```css
.dark {
  --background: #171b19;
  --background-secondary: #303030;
  --foreground: #f1f1f1;
  --card: #303030;
  --btn-secondary: #010101;
  --post: #171b19;
  --text_tag: #f1f1f1;
  --post_gray: #696969;
  --gradient:
    linear-gradient(
      238.09deg,
      rgba(26, 211, 170, 0.15) 30.81%,
      rgba(0, 0, 0, 0.15) 82.23%,
      rgba(0, 0, 0, 0.15) 83.94%,
      rgba(26, 211, 170, 0.15) 129.53%
    ),
    radial-gradient(circle, rgba(26, 211, 170, 0.1) 2px, transparent 2px);
  --bg-icon: #f1f1f1;
  --icon-color: #000000;
  --image-bg: #e9e9e9;
  --map-btn-bg: #303030;
  --map-btn-icon: #f1f1f1;
  --review-bg: #171b19;
  --review-reverse: #696969;
}
```

</details>

| Variable             | Light theme | Dark theme | Description                                                  |
| -------------------- | ----------- | ---------- | ------------------------------------------------------------ |
| background           | #f1f1f1     | #171b19    | for primary background-color                                 |
| background-secondary | #696969     | #303030    | for registration, form-cards                                 |
| foreground           | #1B1B1B     | #f1f1f1    | for primary text-color                                       |
| header-bg            | #171B19     |            | header-background                                            |
| footer-bg            | #111215     |            | footer-background                                            |
| layout-background    | #111215     |            | layout-background                                            |
| text-help            | #696969     |            | form-placeholders, filter-background                         |
| text-gray            | #999999     |            | gray-text, lable-color                                       |
| white                | #f1f1f1     |            | for text and bg that doesn't change in dark theme            |
| text_tag             | #010101     | #f1f1f1    |                                                              |
| tag                  | #696969     |            | for tags (filter-buttons)                                    |
| post                 | #696969     | #171b19    |                                                              |
| post_gray            | #f1f1f1     | #696969    |                                                              |
| card                 | #cfcfcf     | #303030    | background for cards (task, organization, review in account) |
| toggle               | #303030     |            | for toggles (theme, special)                                 |
| border               | #17814b     |            | for borders                                                  |
| btn                  | #17814b     |            | button-background                                            |
| btn-primary          | #ffffff     |            | text for primary-buttons (with background)                   |
| btn-secondary        | #f1f1f1     | #010101    | text for secondary-buttons (outline)                         |
| btn-text             | #f1f1f1     |            | for buttons that doesn't change in dark theme                |
| btn-hover            | #4caf50     |            | background-color for button-hover                            |
| btn-active           | #0a6f3c     |            | background-color for active button                           |
| btn-outline          | #17814b     |            | color for border (secondary-button)                          |
| btn-outline-hover    | #4caf50     |            | hover for border (secondary-button)                          |
| btn-outline-active   | #0a6f3c     |            | color for border (active secondary-button)                   |
| map-btn-bg           | #999999     | #303030    |                                                              |
| map-btn-icon         | #171b19     | #f1f1f1    |                                                              |
| news-item-hover      | #1ad3aa     |            |                                                              |
| bg-icon              | #171B19     | #f1f1f1    | background for icons (tasks)                                 |
| icon-color           | #f1f1f1     | #000000    | color for icon (tasks)                                       |
| image-bg             | #999999     | #e9e9e9    | image-background (for example about-section)                 |
| review-bg            | #696969     | #171b19    | background for review-section (tablet-version)               |
| review-reverse       | #f1f1f1     | #696969    | background for review-section (tablet-version)               |
| error                | #EE0606     |            | for errors                                                   |
| star                 | #FFEE00     |            | for rating-stars (profile)                                   |
| medicine             | #1f5eff     |            | medicine-icon                                                |
| animal               | #ff7d57     |            | animal-icon                                                  |
| nature               | #4caf50     |            | nature-icon                                                  |
| food                 | #e4a23c     |            | food-icon                                                    |

|

**How to use**

| Class               | Usage                | Example                                                                                                              |
| ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `bg-<variable>`     | for background-color | `className='bg-background'`;</br>`className='bg-btn hover:bg-btn-hover'`                                             |
| `text-<variable>`   | for text color       | `className='text-foreground'`; </br>`className='text-text-help' `                                                    |
| `border-<variable>` | for border-color     | `className='border-border'`;</br>`className='border-btn-outline hover:border-btn-outline active:border-btn-outline'` |

## Radius

| Variable | Radius | Class      |
| -------- | ------ | ---------- |
| sm       | 4px    | rounded-sm |
| md       | 8px    | rounded-md |
| lg       | 12px   | rounded-lg |
| xl       | 16px   | rounded-xl |

**Styles**

```css
--radius: 0.75rem;

--radius-sm: calc(var(--radius) - 8px); /*4px*/
--radius-md: calc(var(--radius) - 4px); /*8px*/
--radius-lg: var(--radius); /*12px*/
--radius-xl: calc(var(--radius) + 4px); /*16px*/
```
