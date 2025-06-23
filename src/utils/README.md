# Utils

This directory contains utility functions, helpers, and pure functions that provide common functionality across the application.

## Naming Conventions

### File Naming

- Use **camelCase** for utility files: `formatDate.ts`, `validateEmail.ts`
- Use **kebab-case** for multi-word utilities: `string-utils.ts`, `date-helpers.ts`
- Group related utilities in directories: `validation/`, `formatting/`, `api/`

### Function Naming

- Use **camelCase** for function names: `formatDate`, `validateEmail`, `debounce`
- Use **camelCase** for exported variables: `DEFAULT_CONFIG`, `API_ENDPOINTS`
- Use **UPPER_SNAKE_CASE** for constants: `MAX_RETRY_ATTEMPTS`, `DEFAULT_TIMEOUT`

## File Structure

```
utils/
├── validation/
│   ├── email.ts
│   ├── password.ts
│   └── index.ts
├── formatting/
│   ├── date.ts
│   ├── currency.ts
│   └── index.ts
├── api/
│   ├── client.ts
│   ├── endpoints.ts
│   └── index.ts
├── storage/
│   ├── localStorage.ts
│   ├── sessionStorage.ts
│   └── index.ts
├── dom/
│   ├── events.ts
│   ├── elements.ts
│   └── index.ts
└── README.md
```

## Utility Guidelines

### Pure Functions

```typescript
// validation/email.ts
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// ✅ Good - Pure function, no side effects
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
```

### Type-Safe Utilities

```typescript
// types/guards.ts
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

// Usage
function processData(data: unknown) {
  if (isString(data)) {
    return data.toUpperCase();
  }
  if (isNumber(data)) {
    return data * 2;
  }
  throw new Error('Invalid data type');
}
```

### Async Utilities

```typescript
// utils/async.ts
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function retry<T>(fn: () => Promise<T>, maxAttempts = 3, delayMs = 1000): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const attempt = async () => {
      try {
        attempts++;
        const result = await fn();
        resolve(result);
      } catch (error) {
        if (attempts >= maxAttempts) {
          reject(error);
        } else {
          setTimeout(attempt, delayMs);
        }
      }
    };

    attempt();
  });
}

export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
  ]);
}
```

### Functional Utilities

```typescript
// utils/functional.ts
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
```

## Best Practices

### 1. **Pure Functions**

Keep functions pure and avoid side effects.

```typescript
// ✅ Good - Pure function
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// ❌ Bad - Side effect
export function calculateTotal(items: CartItem[]): number {
  console.log('Calculating total...'); // Side effect
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
```

### 2. **Type Safety**

Always provide proper TypeScript types.

```typescript
// ✅ Good - Type safe
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (format === 'short') {
    return dateObj.toLocaleDateString();
  }
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ❌ Bad - No types
export function formatDate(date, format) {
  // Implementation without types
}
```

### 3. **Error Handling**

Provide meaningful error messages and handle edge cases.

```typescript
export function parseJSON<T>(jsonString: string): T {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(
      `Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export function safeDivide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}
```

### 4. **Default Parameters**

Use default parameters for better usability.

```typescript
export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}
```

### 5. **Documentation**

Document complex utilities with JSDoc comments.

```typescript
/**
 * Formats a date according to the specified format
 * @param date - The date to format (Date object or ISO string)
 * @param format - The format to use ('short' | 'long')
 * @returns Formatted date string
 * @example
 * formatDate(new Date(), 'short') // "12/25/2023"
 * formatDate('2023-12-25', 'long') // "Monday, December 25, 2023"
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  // Implementation
}
```

## Common Utility Categories

### Date Utilities

```typescript
// utils/date.ts
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString();
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
```

### String Utilities

```typescript
// utils/string.ts
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateId(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
```

### Array Utilities

```typescript
// utils/array.ts
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function groupBy<T, K extends string | number>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = key(item);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<K, T[]>
  );
}

export function sortBy<T>(
  array: T[],
  key: keyof T | ((item: T) => any),
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aValue = typeof key === 'function' ? key(a) : a[key];
    const bValue = typeof key === 'function' ? key(b) : b[key];

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}
```

### Object Utilities

```typescript
// utils/object.ts
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

export function isEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}
```

## Testing Utilities

```typescript
// utils/__tests__/date.test.ts
import { describe, it, expect } from 'vitest';
import { isToday, formatRelativeTime } from '../date';

describe('Date utilities', () => {
  it('should detect today correctly', () => {
    expect(isToday(new Date())).toBe(true);
    expect(isToday(new Date('2020-01-01'))).toBe(false);
  });

  it('should format relative time correctly', () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);

    expect(formatRelativeTime(oneMinuteAgo)).toBe('1m ago');
  });
});
```

## Export Patterns

```typescript
// utils/index.ts
export * from './validation';
export * from './formatting';
export * from './api';
export * from './storage';
export * from './dom';

// utils/validation/index.ts
export * from './email';
export * from './password';
export * from './common';
```
