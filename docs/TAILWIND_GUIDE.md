# Atomic Design System - Tailwind CSS v4 Configuration

This project uses Tailwind CSS v4.1.10 with a comprehensive Atomic design system theme and utility classes, configured using the new `@theme` directive syntax.

## 🎨 Color Palette

### Green Color Scale (Primary)

- `green-200`: #D1ECE5
- `green-300`: #A1D9CB
- `green-400`: #8EC5B2
- `green-500`: #27B199 (Primary)
- `green-600`: #288372
- `green-700`: #24584E
- `green-800`: #1B312C

### Navy Color Scale (Secondary)

- `navy-200`: #C4CBD9
- `navy-300`: #8A9AB3
- `navy-400`: #506C8F
- `navy-500`: #01416C (Primary)
- `navy-600`: #103352
- `navy-700`: #14263A
- `navy-800`: #121923

### Black/Gray Scale

- `black-600`: #8F8F8F
- `black-700`: #0A0A0A
- `black-800`: #565656
- `black-900`: #0A0A0A
- `black-900-60`: #0A0A0A (60% opacity)

### White/Gray Scale

- `gray-100`: #FFFFFF
- `gray-200`: #FAFAFA
- `gray-300`: #ECECEC
- `gray-400`: #DFDFDF

### White Scale (Alternative)

- `white-100`: #FFFFFF
- `white-200`: #FAFAFA
- `white-300`: #ECECEC
- `white-400`: #DFDFDF

### Status Colors

#### Positive (Green variants)

- `positive-100`: #F1F9EF
- `positive-200`: #C9E7BF
- `positive-300`: #A0D491
- `positive-400`: #288C7A

#### Progressive (Blue variants)

- `progressive-100`: #EEFAFE
- `progressive-200`: #C3E8FA
- `progressive-300`: #94D8F6
- `progressive-400`: #56CCF2

#### Cautions (Orange variants)

- `cautions-100`: #FFF2D1
- `cautions-200`: #FFDDA0
- `cautions-300`: #FFC86F
- `cautions-400`: #D78E08

#### Negative (Red variants)

- `negative-100`: #FFD7D2
- `negative-200`: #FEAEA7
- `negative-300`: #F7857E
- `negative-400`: #EB5757

### Error Colors

- `error-100`: #FFD7D2
- `error-400`: #EF4C00
- `error-800`: #9D380F

### Warning Colors

- `warning`: #D78E08
- `warning-light`: #FFF2D1
- `warning-100`: #FFF2D1
- `warning-400`: #D78E08
- `warning-800`: #A0772A

### Link Colors

- `link-100`: #EEFAFE
- `link-400`: #007BFF
- `link-800`: #2553A5

## 🎯 Semantic Tokens

### Surface Colors

- `surface-primary-green`: #27B199
- `surface-primary-blue`: #01416C
- `surface-primary-white`: #FFFFFF
- `surface-secondary`: #FAFAFA
- `surface-disable`: #ECECEC
- `surface-popup`: #0A0A0A
- `surface-highlight`: #D1ECE5

### Text Colors

- `text-primary`: #27B199
- `text-secondary`: #FFFFFF
- `text-title`: #0A0A0A
- `text-subtitle`: #565656
- `text-disable`: #8F8F8F
- `text-placeholder`: #8F8F8F

### Soft Colors

- `soft-green`: #F1F9EF
- `soft-blue`: #EEFAFE
- `soft-orange`: #FFF2D1
- `soft-red`: #FFD7D2

### Button Colors

- `button-primary`: #27B199
- `button-hover-primary`: #288372

### Stroke Colors

- `stroke-bold`: #8F8F8F
- `stroke-regular`: #ECECEC

### Icon Colors

- `icon-black`: #0A0A0A
- `icon-white`: #FFFFFF
- `icon-green`: #27B199
- `icon-disable`: #8F8F8F

### Notification Colors

- `notification-error`: #EB5757
- `notification-link`: #007BFF
- `notification-warning`: #D78E08
- `notification-dots`: #EB5757

### Label Colors

- `label-positive`: #288C7A
- `label-progress`: #56CCF2
- `label-warning`: #D78E08
- `label-negative`: #EB5757

### Semantic Colors

- `primary`: #27B199
- `primary-hover`: #288372
- `secondary`: #FAFAFA
- `success`: #288C7A
- `success-light`: #F1F9EF
- `info`: #56CCF2
- `info-light`: #EEFAFE
- `danger`: #EB5757
- `danger-light`: #FFD7D2

## 🔤 Typography

### Font Families

Tailwind CSS v4 includes optimized font stacks:

- **Sans**: System fonts with fallbacks
- **Mono**: Monospace fonts with fallbacks
- **Serif**: Serif fonts with fallbacks

### Font Sizes

- `text-xs` to `text-9xl` - Complete size scale
- Custom line heights for optimal readability

## 📐 Spacing & Layout

### Default Spacing Scale

Tailwind CSS v4 includes a comprehensive spacing scale from `0` to `96` with additional custom values.

### Border Radius

- `rounded-none` to `rounded-full` - Complete radius scale
- Custom radius values available

## 🎭 Shadows & Effects

### Default Shadows

- `shadow-sm`: Small shadow
- `shadow`: Default shadow
- `shadow-md`: Medium shadow
- `shadow-lg`: Large shadow
- `shadow-xl`: Extra large shadow
- `shadow-2xl`: Double extra large shadow

## 🎬 Animations

### Default Animations

- `animate-spin`: Rotating animation
- `animate-ping`: Pulsing animation
- `animate-pulse`: Fading animation
- `animate-bounce`: Bouncing animation

## 🧩 Utility Classes

### Background Colors

```css
.bg-green-500          /* Primary green background */
/* Primary green background */
/* Primary green background */
/* Primary green background */
/* Primary green background */
/* Primary green background */
/* Primary green background */
/* Primary green background */
.bg-navy-500           /* Primary navy background */
.bg-surface-primary-green /* Semantic surface color */
.bg-text-primary       /* Semantic text color background */
.bg-positive-400       /* Positive status background */
.bg-progressive-400    /* Progressive status background */
.bg-cautions-400       /* Warning status background */
.bg-negative-400; /* Error status background */
```

### Text Colors

```css
.text-green-500        /* Primary green text */
/* Primary green text */
/* Primary green text */
/* Primary green text */
/* Primary green text */
/* Primary green text */
/* Primary green text */
/* Primary green text */
.text-navy-500         /* Primary navy text */
.text-text-primary     /* Semantic primary text */
.text-text-title       /* Semantic title text */
.text-text-subtitle    /* Semantic subtitle text */
.text-text-disable; /* Semantic disabled text */
```

### Border Colors

```css
.border-green-500      /* Primary green border */
/* Primary green border */
/* Primary green border */
/* Primary green border */
/* Primary green border */
/* Primary green border */
/* Primary green border */
/* Primary green border */
.border-navy-500       /* Primary navy border */
.border-stroke-bold    /* Semantic bold stroke */
.border-stroke-regular; /* Semantic regular stroke */
```

## 🎯 Component Examples

### Buttons

```html
<!-- Primary Button -->
<button
  class="bg-button-primary hover:bg-button-hover-primary text-white px-4 py-2 rounded-lg transition-colors"
>
  Primary Button
</button>

<!-- Secondary Button -->
<button
  class="bg-surface-secondary text-text-title px-4 py-2 rounded-lg border border-stroke-regular hover:bg-gray-200 transition-colors"
>
  Secondary Button
</button>

<!-- Success Button -->
<button
  class="bg-success hover:bg-positive-400 text-white px-4 py-2 rounded-lg transition-colors"
>
  Success Button
</button>

<!-- Danger Button -->
<button
  class="bg-danger hover:bg-negative-400 text-white px-4 py-2 rounded-lg transition-colors"
>
  Danger Button
</button>
```

### Cards

```html
<!-- Basic Card -->
<div class="bg-white rounded-lg shadow-md p-6 border border-stroke-regular">
  <h3 class="text-text-title text-lg font-semibold mb-2">Card Title</h3>
  <p class="text-text-subtitle">Card content goes here</p>
</div>

<!-- Surface Card -->
<div class="bg-surface-secondary rounded-lg p-6">
  <h3 class="text-text-title text-lg font-semibold mb-2">Surface Card</h3>
  <p class="text-text-subtitle">This card uses semantic surface colors</p>
</div>
```

### Status Indicators

```html
<!-- Positive Status -->
<div class="bg-positive-100 text-positive-400 px-3 py-1 rounded-full text-sm">
  Success
</div>

<!-- Progressive Status -->
<div
  class="bg-progressive-100 text-progressive-400 px-3 py-1 rounded-full text-sm"
>
  In Progress
</div>

<!-- Warning Status -->
<div class="bg-cautions-100 text-cautions-400 px-3 py-1 rounded-full text-sm">
  Warning
</div>

<!-- Error Status -->
<div class="bg-negative-100 text-negative-400 px-3 py-1 rounded-full text-sm">
  Error
</div>
```

### Form Elements

```html
<!-- Input Field -->
<div class="space-y-2">
  <label class="text-text-title text-sm font-medium">Email</label>
  <input
    type="email"
    class="w-full px-3 py-2 border border-stroke-regular rounded-lg focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
    placeholder="Enter your email"
  />
</div>

<!-- Textarea -->
<div class="space-y-2">
  <label class="text-text-title text-sm font-medium">Message</label>
  <textarea
    class="w-full px-3 py-2 border border-stroke-regular rounded-lg focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
    rows="4"
    placeholder="Enter your message"
  ></textarea>
</div>
```

### Alerts

```html
<!-- Success Alert -->
<div
  class="bg-success-light border border-success text-success px-4 py-3 rounded-lg"
>
  <p>Success! Your changes have been saved.</p>
</div>

<!-- Info Alert -->
<div class="bg-info-light border border-info text-info px-4 py-3 rounded-lg">
  <p>Information: Please review the details below.</p>
</div>

<!-- Warning Alert -->
<div
  class="bg-warning-light border border-warning text-warning px-4 py-3 rounded-lg"
>
  <p>Warning: Please check your input before proceeding.</p>
</div>

<!-- Error Alert -->
<div
  class="bg-danger-light border border-danger text-danger px-4 py-3 rounded-lg"
>
  <p>Error: Something went wrong. Please try again.</p>
</div>
```

## 📱 Responsive Design

```html
<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-surface-secondary p-4 rounded-lg">Card 1</div>
  <div class="bg-surface-secondary p-4 rounded-lg">Card 2</div>
  <div class="bg-surface-secondary p-4 rounded-lg">Card 3</div>
</div>

<!-- Responsive Text -->
<h1 class="text-2xl md:text-3xl lg:text-4xl text-text-title">
  Responsive Heading
</h1>
```

## 🌙 Dark Mode Support

Tailwind CSS v4 includes automatic dark mode support. You can use the `dark:` prefix for dark mode variants:

```html
<div class="bg-white dark:bg-gray-900 text-text-title dark:text-white">
  <p>This content adapts to dark mode automatically</p>
</div>
```

## 📁 File Structure

```
src/
├── tailwind.css       # Main Tailwind CSS with @theme configuration
├── style.css          # Additional base styles
└── main.ts           # Imports CSS files and initializes app
```

## 🚀 Configuration

The theme is configured using Tailwind CSS v4's new `@theme` directive in `src/tailwind.css`:

```css
@import "tailwindcss";

@theme {
  --color-green-500: #27b199;
  --color-navy-500: #01416c;
  --color-surface-primary-green: #27b199;
  --color-text-primary: #27b199;
  /* ... more color definitions */
}
```

## 🔧 Customization

To add new colors or modify existing ones, edit the `@theme` section in `src/tailwind.css`:

```css
@theme {
  /* Add your custom colors here */
  --color-custom-color: #your-color;
  --color-custom-surface: #your-surface-color;
}
```

## 📚 Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## 🎨 Design Tokens

This design system follows atomic design principles with semantic color tokens that provide:

- **Consistency**: Standardized color palette across components
- **Accessibility**: High contrast ratios for better readability
- **Maintainability**: Centralized color definitions
- **Scalability**: Easy to extend with new colors and variants

The semantic tokens make it easy to maintain brand consistency while providing flexibility for different use cases and states.
