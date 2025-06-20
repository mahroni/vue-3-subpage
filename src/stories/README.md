# Button Component Stories

This directory contains Storybook stories for the Button component, showcasing all its variants, states, and usage patterns.

## Stories Overview

### Button.stories.ts

Main stories file containing:

- **Default**: Basic button with default props
- **Primary/Secondary/Danger/Flat**: Different intent variants
- **Small/Medium/Large**: Size variants
- **Rounded/Rectangular**: Shape variants
- **Disabled**: Disabled state
- **RouterLink**: Router link functionality
- **AllVariants**: Comprehensive showcase of all variants
- **Playground**: Interactive playground with controls

### ButtonExamples.stories.ts

Advanced usage examples:

- **FormSubmit**: Form submission buttons
- **Navigation**: Router link navigation
- **ActionButtons**: Different sized action buttons
- **DangerActions**: Danger/delete actions
- **LoadingStates**: Loading state simulation
- **ButtonGroups**: Button group layouts
- **ResponsiveDesign**: Responsive design patterns

## Component Props

| Prop       | Type                                             | Default     | Description                          |
| ---------- | ------------------------------------------------ | ----------- | ------------------------------------ |
| `intent`   | `"primary" \| "secondary" \| "danger" \| "flat"` | `"primary"` | Visual style of the button           |
| `size`     | `"small" \| "medium" \| "large"`                 | `"medium"`  | Size of the button                   |
| `shape`    | `"rounded" \| "rectangular"`                     | `"rounded"` | Shape of button corners              |
| `disabled` | `boolean`                                        | `false`     | Whether button is disabled           |
| `to`       | `string`                                         | `undefined` | Router link destination              |
| `type`     | `"button" \| "submit" \| "reset"`                | `"button"`  | Button type (when not a router-link) |

## Usage Examples

### Basic Button

```vue
<Button>Click me</Button>
```

### Primary Action Button

```vue
<Button intent="primary" size="large">Save Changes</Button>
```

### Secondary Button

```vue
<Button intent="secondary" shape="rectangular">Cancel</Button>
```

### Danger Button

```vue
<Button intent="danger" size="small">Delete</Button>
```

### Router Link

```vue
<Button to="/dashboard" intent="primary">Go to Dashboard</Button>
```

### Disabled Button

```vue
<Button disabled intent="primary">Disabled</Button>
```

## Running Stories

To run Storybook and view these stories:

```bash
npm run storybook
```

Then navigate to the "Components/Button" section in the Storybook sidebar.

## Customization

The Button component uses Tailwind CSS with custom color definitions. The main colors used are:

- `primary`: `#27B199` (green)
- `primary-hover`: `#288372` (darker green)
- `danger`: `#EB5757` (red)

These colors are defined in `src/assets/css/tailwind.css` and can be customized there.
