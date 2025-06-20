# Components

This directory contains reusable Vue 3 components for the Qiscus application.

## Naming Conventions

### File Naming

- Use **PascalCase** for component files: `UserProfile.vue`, `ChatMessage.vue`
- Use **kebab-case** for component directories: `user-profile/`, `chat-message/`
- For compound components, use descriptive names: `UserProfileCard.vue`, `ChatMessageBubble.vue`

### Component Naming

- Use **PascalCase** for component names in `<script>`: `UserProfile`, `ChatMessage`
- Use **kebab-case** for component names in template: `<user-profile>`, `<chat-message>`

## File Structure

```
components/
├── ui/                    # Basic UI components (buttons, inputs, etc.)
│   ├── BaseButton.vue
│   ├── BaseInput.vue
│   └── BaseModal.vue
├── layout/               # Layout components
│   ├── Header.vue
│   ├── Sidebar.vue
│   └── Footer.vue
├── feature/              # Feature-specific components
│   ├── chat/
│   │   ├── ChatMessage.vue
│   │   └── ChatInput.vue
│   └── user/
│       ├── UserProfile.vue
│       └── UserAvatar.vue
└── README.md
```

## Component Guidelines

### Script Setup

```vue
<script setup lang="ts">
// Props
interface Props {
  title: string;
  isVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
});

// Emits
interface Emits {
  (e: "update", value: string): void;
  (e: "close"): void;
}

const emit = defineEmits<Emits>();

// Reactive data
const count = ref(0);
const isLoading = ref(false);

// Computed
const displayTitle = computed(() => `${props.title} (${count.value})`);

// Methods
const handleClick = () => {
  emit("update", "new value");
};
</script>
```

### Template Structure

```vue
<template>
  <!-- Always use a single root element or <template> -->
  <div class="component-name">
    <!-- Props validation -->
    <div v-if="title" class="title">{{ displayTitle }}</div>

    <!-- Event handling -->
    <button @click="handleClick" :disabled="isLoading">Click me</button>
  </div>
</template>
```

### Styling

- Use **scoped** styles when possible
- Follow BEM methodology for CSS classes
- Use Tailwind CSS utility classes
- Keep styles close to the component

```vue
<style scoped>
.component-name {
  /* Component styles */
}

.component-name__title {
  /* Element styles */
}

.component-name--active {
  /* Modifier styles */
}
</style>
```

## Best Practices

1. **Single Responsibility**: Each component should have one clear purpose
2. **Props Validation**: Always define prop types and defaults
3. **Event Naming**: Use descriptive event names (kebab-case)
4. **Reusability**: Make components configurable through props
5. **Accessibility**: Include proper ARIA attributes and keyboard navigation
6. **Performance**: Use `v-memo` for expensive computations
7. **Testing**: Write unit tests for complex logic

## Import/Export Pattern

```typescript
// index.ts in component directory
export { default as UserProfile } from "./UserProfile.vue";
export { default as ChatMessage } from "./ChatMessage.vue";

// Usage in other components
import { UserProfile, ChatMessage } from "@/components";
```

## Common Patterns

### Conditional Rendering

```vue
<template>
  <div v-if="isVisible" class="modal">
    <slot />
  </div>
</template>
```

### Slot Usage

```vue
<template>
  <div class="card">
    <header class="card__header">
      <slot name="header" />
    </header>
    <main class="card__body">
      <slot />
    </main>
    <footer class="card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
```

### Composition API

```vue
<script setup lang="ts">
import { useUser } from "@/composables/useUser";
import { useChat } from "@/composables/useChat";

const { user } = useUser();
const { messages, sendMessage } = useChat();
</script>
```
