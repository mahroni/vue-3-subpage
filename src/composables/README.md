# Composables

This directory contains reusable Vue 3 composables that encapsulate and reuse stateful logic across components.

## Naming Conventions

### File Naming

- Use **camelCase** with `use` prefix: `useUser.ts`, `useChat.ts`
- Use **kebab-case** for multi-word composables: `use-user-profile.ts`, `use-chat-message.ts`
- Group related composables in directories: `auth/useAuth.ts`, `chat/useChat.ts`

### Function Naming

- Use **camelCase** for composable functions: `useUser`, `useChat`
- Use **camelCase** for returned properties and methods: `user`, `isLoading`, `fetchUser`

## File Structure

```
composables/
├── auth/
│   ├── useAuth.ts
│   ├── usePermissions.ts
│   └── index.ts
├── chat/
│   ├── useChat.ts
│   ├── useMessages.ts
│   └── index.ts
├── ui/
│   ├── useModal.ts
│   ├── useToast.ts
│   └── index.ts
├── utils/
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── index.ts
└── README.md
```

## Composable Guidelines

### Basic Structure

```typescript
// useUser.ts
import { ref, computed, onMounted } from "vue";
import type { User } from "@/types";

export function useUser() {
  // State
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const isAuthenticated = computed(() => !!user.value);
  const displayName = computed(() => user.value?.name || "Guest");

  // Methods
  const fetchUser = async (id: string) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await fetch(`/api/users/${id}`);
      user.value = await response.json();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
    } finally {
      isLoading.value = false;
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    // Implementation
  };

  const logout = () => {
    user.value = null;
  };

  // Lifecycle
  onMounted(() => {
    // Auto-fetch user if needed
  });

  // Return reactive state and methods
  return {
    // State
    user: readonly(user),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Computed
    isAuthenticated,
    displayName,

    // Methods
    fetchUser,
    updateUser,
    logout,
  };
}
```

### TypeScript Integration

```typescript
// useCounter.ts
import { ref, computed } from "vue";

interface CounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
}

interface CounterReturn {
  count: Readonly<Ref<number>>;
  isMin: ComputedRef<boolean>;
  isMax: ComputedRef<boolean>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export function useCounter(options: CounterOptions = {}): CounterReturn {
  const { initialValue = 0, min = -Infinity, max = Infinity } = options;

  const count = ref(initialValue);

  const isMin = computed(() => count.value <= min);
  const isMax = computed(() => count.value >= max);

  const increment = () => {
    if (!isMax.value) count.value++;
  };

  const decrement = () => {
    if (!isMin.value) count.value--;
  };

  const reset = () => {
    count.value = initialValue;
  };

  return {
    count: readonly(count),
    isMin,
    isMax,
    increment,
    decrement,
    reset,
  };
}
```

### Async Composables

```typescript
// useAsyncData.ts
import { ref, computed } from "vue";

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useAsyncData<T>() {
  const state = ref<AsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = async (asyncFn: () => Promise<T>) => {
    state.value.isLoading = true;
    state.value.error = null;

    try {
      state.value.data = await asyncFn();
    } catch (err) {
      state.value.error = err instanceof Error ? err.message : "Unknown error";
    } finally {
      state.value.isLoading = false;
    }
  };

  return {
    ...toRefs(state.value),
    execute,
  };
}
```

## Best Practices

### 1. **Single Responsibility**

Each composable should focus on one specific piece of functionality.

```typescript
// ✅ Good - Single responsibility
export function useUser() {
  /* user management */
}
export function usePermissions() {
  /* permission logic */
}

// ❌ Bad - Multiple responsibilities
export function useUserAndPermissions() {
  /* too many concerns */
}
```

### 2. **Return Readonly Refs**

Prevent external mutations of internal state.

```typescript
// ✅ Good
return {
  user: readonly(user),
  isLoading: readonly(isLoading),
};

// ❌ Bad
return {
  user,
  isLoading,
};
```

### 3. **Provide Options Pattern**

Allow customization through options parameter.

```typescript
export function useLocalStorage<T>(
  key: string,
  options: {
    defaultValue?: T;
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
  } = {}
) {
  // Implementation
}
```

### 4. **Error Handling**

Always handle errors gracefully and provide error state.

```typescript
export function useApiCall<T>() {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const execute = async (apiCall: () => Promise<T>) => {
    try {
      isLoading.value = true;
      error.value = null;
      data.value = await apiCall();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data: readonly(data),
    error: readonly(error),
    isLoading: readonly(isLoading),
    execute,
  };
}
```

### 5. **Cleanup on Unmount**

Clean up subscriptions, timers, and event listeners.

```typescript
import { onUnmounted } from "vue";

export function useInterval(callback: () => void, delay: number) {
  const intervalId = ref<number | null>(null);

  const start = () => {
    intervalId.value = setInterval(callback, delay);
  };

  const stop = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  };

  onUnmounted(() => {
    stop();
  });

  return { start, stop };
}
```

## Common Patterns

### State Management

```typescript
// useStore.ts
import { reactive, readonly } from "vue";

const state = reactive({
  user: null,
  theme: "light",
  language: "en",
});

export function useStore() {
  const setUser = (user: User) => {
    state.user = user;
  };

  const setTheme = (theme: string) => {
    state.theme = theme;
  };

  return {
    state: readonly(state),
    setUser,
    setTheme,
  };
}
```

### Event Bus Pattern

```typescript
// useEventBus.ts
import { ref } from "vue";

const events = ref<Map<string, Function[]>>(new Map());

export function useEventBus() {
  const on = (event: string, callback: Function) => {
    if (!events.value.has(event)) {
      events.value.set(event, []);
    }
    events.value.get(event)!.push(callback);
  };

  const emit = (event: string, data?: any) => {
    const callbacks = events.value.get(event) || [];
    callbacks.forEach((callback) => callback(data));
  };

  const off = (event: string, callback?: Function) => {
    if (!callback) {
      events.value.delete(event);
    } else {
      const callbacks = events.value.get(event) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  };

  return { on, emit, off };
}
```

### Form Handling

```typescript
// useForm.ts
import { reactive, computed } from "vue";

export function useForm<T extends Record<string, any>>(initialData: T) {
  const form = reactive({ ...initialData });
  const errors = reactive<Partial<Record<keyof T, string>>>({});
  const isDirty = ref(false);

  const isValid = computed(() => Object.keys(errors).length === 0);

  const setField = (field: keyof T, value: T[keyof T]) => {
    form[field] = value;
    isDirty.value = true;
    delete errors[field];
  };

  const setError = (field: keyof T, message: string) => {
    errors[field] = message;
  };

  const reset = () => {
    Object.assign(form, initialData);
    Object.keys(errors).forEach((key) => delete errors[key]);
    isDirty.value = false;
  };

  return {
    form: readonly(form),
    errors: readonly(errors),
    isDirty: readonly(isDirty),
    isValid,
    setField,
    setError,
    reset,
  };
}
```

## Testing Composables

```typescript
// useCounter.test.ts
import { describe, it, expect } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("should initialize with default value", () => {
    const { count } = useCounter();
    expect(count.value).toBe(0);
  });

  it("should increment correctly", () => {
    const { count, increment } = useCounter();
    increment();
    expect(count.value).toBe(1);
  });
});
```
