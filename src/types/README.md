# Types

This directory contains TypeScript type definitions, interfaces, and type utilities for the Qiscus application.

## Naming Conventions

### File Naming

- Use **camelCase** for type files: `user.ts`, `chat.ts`
- Use **kebab-case** for multi-word types: `api-response.ts`, `form-validation.ts`
- Use **PascalCase** for complex type collections: `UserTypes.ts`, `ChatTypes.ts`
- Group related types in directories: `api/`, `forms/`, `events/`

### Type Naming

- Use **PascalCase** for interfaces and types: `User`, `ChatMessage`, `ApiResponse`
- Use **camelCase** for type aliases: `userData`, `chatConfig`
- Use **UPPER_SNAKE_CASE** for constants: `API_ENDPOINTS`, `DEFAULT_CONFIG`
- Use **PascalCase** with descriptive suffixes: `UserCreateRequest`, `ChatMessageResponse`

## File Structure

```
types/
├── api/
│   ├── requests.ts
│   ├── responses.ts
│   └── index.ts
├── entities/
│   ├── user.ts
│   ├── chat.ts
│   └── index.ts
├── forms/
│   ├── auth.ts
│   ├── profile.ts
│   └── index.ts
├── events/
│   ├── chat.ts
│   ├── user.ts
│   └── index.ts
├── utils/
│   ├── common.ts
│   ├── helpers.ts
│   └── index.ts
└── README.md
```

## Type Guidelines

### Basic Interface Definition

```typescript
// entities/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// ✅ Good - Clear, descriptive interface
export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  roomId: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  metadata?: Record<string, unknown>;
}
```

### API Types

```typescript
// api/requests.ts
export interface ApiRequest<T = unknown> {
  data: T;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  avatar?: File;
}

// api/responses.ts
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: Date;
}
```

### Form Types

```typescript
// forms/auth.ts
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
  confirmPassword: string;
}

// forms/profile.ts
export interface ProfileForm {
  name: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: File;
}
```

### Event Types

```typescript
// events/chat.ts
export interface ChatEvent {
  type: 'message' | 'typing' | 'read' | 'join' | 'leave';
  roomId: string;
  userId: string;
  timestamp: Date;
  data?: unknown;
}

export interface MessageEvent extends ChatEvent {
  type: 'message';
  data: {
    messageId: string;
    content: string;
    messageType: 'text' | 'image' | 'file';
  };
}

export interface TypingEvent extends ChatEvent {
  type: 'typing';
  data: {
    isTyping: boolean;
  };
}

// events/user.ts
export interface UserEvent {
  type: 'online' | 'offline' | 'status_change';
  userId: string;
  timestamp: Date;
  data?: {
    status?: 'online' | 'offline' | 'away' | 'busy';
    lastSeen?: Date;
  };
}
```

## Best Practices

### 1. **Use Interfaces for Objects**

Prefer interfaces over type aliases for object shapes.

```typescript
// ✅ Good - Interface for object shape
export interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Bad - Type alias for object shape
export type User = {
  id: string;
  name: string;
  email: string;
};
```

### 2. **Use Type Aliases for Unions and Primitives**

Use type aliases for union types, primitive types, and complex type operations.

```typescript
// ✅ Good - Type alias for union
export type UserStatus = 'active' | 'inactive' | 'suspended';

// ✅ Good - Type alias for primitive
export type UserId = string;

// ✅ Good - Type alias for complex type
export type UserWithProfile = User & { profile: UserProfile };
```

### 3. **Extend Interfaces Instead of Intersecting**

Use interface extension for better readability and IntelliSense.

```typescript
// ✅ Good - Interface extension
export interface BaseUser {
  id: string;
  email: string;
}

export interface User extends BaseUser {
  name: string;
  avatar?: string;
}

// ❌ Bad - Type intersection
export type User = BaseUser & {
  name: string;
  avatar?: string;
};
```

### 4. **Use Generic Types for Reusability**

Create generic types for common patterns.

```typescript
// utils/common.ts
export interface ApiResult<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}
```

### 5. **Use Const Assertions for Literal Types**

Use const assertions for better type inference.

```typescript
// ✅ Good - Const assertion
export const USER_STATUSES = ['active', 'inactive', 'suspended'] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

// ❌ Bad - Manual union
export type UserStatus = 'active' | 'inactive' | 'suspended';
```

### 6. **Use Utility Types**

Leverage TypeScript utility types for common transformations.

```typescript
// utils/helpers.ts
export type PartialUser = Partial<User>;
export type RequiredUser = Required<User>;
export type UserKeys = keyof User;
export type UserValues = User[UserKeys];
export type OptionalUser = Pick<User, 'id' | 'email'> & Partial<Omit<User, 'id' | 'email'>>;
```

## Common Type Patterns

### API Response Types

```typescript
// api/types.ts
export interface BaseApiResponse {
  success: boolean;
  message?: string;
  timestamp: Date;
}

export interface SuccessResponse<T> extends BaseApiResponse {
  success: true;
  data: T;
}

export interface ErrorResponse extends BaseApiResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Usage
export interface UserApiResponse extends ApiResponse<User> {}
export interface UsersApiResponse extends ApiResponse<User[]> {}
```

### Form Validation Types

```typescript
// forms/validation.ts
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean | string;
}

export interface FormField<T = unknown> {
  value: T;
  error?: string;
  touched: boolean;
  valid: boolean;
}

export interface FormState<T> {
  fields: Record<keyof T, FormField<T[keyof T]>>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

// Usage
export interface LoginFormState extends FormState<LoginForm> {}
```

### Event Types

```typescript
// events/types.ts
export interface BaseEvent {
  id: string;
  type: string;
  timestamp: Date;
  source: string;
}

export interface UserEvent extends BaseEvent {
  type: 'user.created' | 'user.updated' | 'user.deleted';
  data: {
    userId: string;
    changes?: Record<string, unknown>;
  };
}

export interface ChatEvent extends BaseEvent {
  type: 'chat.message' | 'chat.typing' | 'chat.read';
  data: {
    roomId: string;
    userId: string;
    messageId?: string;
  };
}

export type AppEvent = UserEvent | ChatEvent;
```

### State Management Types

```typescript
// store/types.ts
export interface StoreState {
  user: UserState;
  chat: ChatState;
  ui: UIState;
}

export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface ChatState {
  rooms: ChatRoom[];
  currentRoom: ChatRoom | null;
  messages: Record<string, ChatMessage[]>;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  modals: Record<string, boolean>;
}
```

## Type Guards and Utilities

### Type Guards

```typescript
// utils/guards.ts
export function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value &&
    'name' in value
  );
}

export function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'success' in value &&
    typeof (value as ApiResponse<T>).success === 'boolean'
  );
}

export function isErrorResponse(value: unknown): value is ErrorResponse {
  return isApiResponse(value) && !value.success;
}
```

### Type Utilities

```typescript
// utils/helpers.ts
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

// Usage
export type PartialUser = DeepPartial<User>;
export type StringFields = PickByType<User, string>;
export type NonStringFields = OmitByType<User, string>;
```

## Export Patterns

### Barrel Exports

```typescript
// types/index.ts
export * from './api';
export * from './entities';
export * from './forms';
export * from './events';
export * from './utils';

// types/api/index.ts
export * from './requests';
export * from './responses';
export * from './types';

// types/entities/index.ts
export * from './user';
export * from './chat';
export * from './common';
```

### Named Exports

```typescript
// Usage
import type { User, UserRole, UserStatus } from '@/types/user';

// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserStatus = 'active' | 'inactive' | 'suspended';
export type UserRole = 'admin' | 'user' | 'moderator';
```

## Testing Types

```typescript
// types/__tests__/user.test.ts
import { describe, expect, it } from 'vitest';

import type { User } from '../user';

describe('User type', () => {
  it('should have required properties', () => {
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(user.id).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
  });
});
```

## Documentation

### JSDoc Comments

```typescript
/**
 * Represents a user in the system
 * @interface User
 */
export interface User {
  /** Unique identifier for the user */
  id: string;

  /** User's full name */
  name: string;

  /** User's email address (must be unique) */
  email: string;

  /** Optional avatar URL */
  avatar?: string;

  /** When the user was created */
  createdAt: Date;

  /** When the user was last updated */
  updatedAt: Date;
}

/**
 * User status enumeration
 * @typedef {string} UserStatus
 */
export type UserStatus = 'active' | 'inactive' | 'suspended';
```
