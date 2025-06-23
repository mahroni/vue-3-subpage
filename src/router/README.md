# Router

This directory contains Vue Router configuration and route definitions for the Qiscus application.

## Naming Conventions

### File Naming

- Use **camelCase** for router files: `index.ts`, `routes.ts`
- Use **kebab-case** for route-specific files: `auth-routes.ts`, `admin-routes.ts`
- Use descriptive names: `guards.ts`, `middleware.ts`

### Route Naming

- Use **kebab-case** for route paths: `/user-profile`, `/chat-room`
- Use **camelCase** for route names: `userProfile`, `chatRoom`
- Use descriptive names that match the component: `dashboard`, `userSettings`

## File Structure

```
router/
├── index.ts                 # Main router configuration
├── routes/
│   ├── index.ts            # Route definitions
│   ├── auth.ts             # Authentication routes
│   ├── dashboard.ts        # Dashboard routes
│   ├── chat.ts            # Chat routes
│   ├── admin.ts           # Admin routes
│   └── error.ts           # Error routes
├── guards/
│   ├── auth.ts            # Authentication guards
│   ├── permissions.ts     # Permission guards
│   └── index.ts           # Guard exports
├── middleware/
│   ├── auth.ts            # Authentication middleware
│   ├── loading.ts         # Loading middleware
│   └── index.ts           # Middleware exports
└── README.md
```

## Router Guidelines

### Main Router Configuration

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { authRoutes } from './routes/auth';
import { dashboardRoutes } from './routes/dashboard';
import { chatRoutes } from './routes/chat';
import { adminRoutes } from './routes/admin';
import { errorRoutes } from './routes/error';
import { authGuard } from './guards/auth';
import { permissionGuard } from './guards/permissions';

// Base routes
const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: 'Home',
      requiresAuth: false,
    },
  },
];

// Combine all routes
const routes: RouteRecordRaw[] = [
  ...baseRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...chatRoutes,
  ...adminRoutes,
  ...errorRoutes,
];

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Global navigation guards
router.beforeEach(authGuard);
router.beforeEach(permissionGuard);

// Global after hooks
router.afterEach((to) => {
  // Update page title
  document.title = to.meta.title ? `${to.meta.title} - Qiscus` : 'Qiscus';

  // Track page view
  if (import.meta.env.PROD) {
    // Analytics tracking
    console.log('Page view:', to.path);
  }
});

export default router;
```

### Route Definitions

```typescript
// router/routes/auth.ts
import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: {
      requiresAuth: false,
      layout: 'auth',
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/auth/Login.vue'),
        meta: {
          title: 'Sign In',
          requiresAuth: false,
        },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/auth/Register.vue'),
        meta: {
          title: 'Sign Up',
          requiresAuth: false,
        },
      },
      {
        path: 'forgot-password',
        name: 'forgotPassword',
        component: () => import('@/pages/auth/ForgotPassword.vue'),
        meta: {
          title: 'Forgot Password',
          requiresAuth: false,
        },
      },
      {
        path: 'reset-password',
        name: 'resetPassword',
        component: () => import('@/pages/auth/ResetPassword.vue'),
        meta: {
          title: 'Reset Password',
          requiresAuth: false,
        },
      },
    ],
  },
];

// router/routes/dashboard.ts
export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: {
      requiresAuth: true,
      layout: 'dashboard',
    },
    children: [
      {
        path: '',
        name: 'dashboardHome',
        component: () => import('@/pages/dashboard/Dashboard.vue'),
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
        },
      },
      {
        path: 'analytics',
        name: 'analytics',
        component: () => import('@/pages/dashboard/Analytics.vue'),
        meta: {
          title: 'Analytics',
          requiresAuth: true,
          permissions: ['view_analytics'],
        },
      },
      {
        path: 'settings',
        name: 'dashboardSettings',
        component: () => import('@/pages/dashboard/Settings.vue'),
        meta: {
          title: 'Settings',
          requiresAuth: true,
        },
      },
    ],
  },
];

// router/routes/chat.ts
export const chatRoutes: RouteRecordRaw[] = [
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/layouts/ChatLayout.vue'),
    meta: {
      requiresAuth: true,
      layout: 'chat',
    },
    children: [
      {
        path: '',
        name: 'chatList',
        component: () => import('@/pages/chat/ChatList.vue'),
        meta: {
          title: 'Chat',
          requiresAuth: true,
        },
      },
      {
        path: ':roomId',
        name: 'chatRoom',
        component: () => import('@/pages/chat/ChatRoom.vue'),
        meta: {
          title: 'Chat Room',
          requiresAuth: true,
        },
        props: true,
      },
    ],
  },
];

// router/routes/admin.ts
export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      layout: 'admin',
    },
    children: [
      {
        path: 'users',
        name: 'adminUsers',
        component: () => import('@/pages/admin/Users.vue'),
        meta: {
          title: 'User Management',
          requiresAuth: true,
          requiresAdmin: true,
          permissions: ['manage_users'],
        },
      },
      {
        path: 'reports',
        name: 'adminReports',
        component: () => import('@/pages/admin/Reports.vue'),
        meta: {
          title: 'Reports',
          requiresAuth: true,
          requiresAdmin: true,
          permissions: ['view_reports'],
        },
      },
      {
        path: 'system',
        name: 'adminSystem',
        component: () => import('@/pages/admin/System.vue'),
        meta: {
          title: 'System Settings',
          requiresAuth: true,
          requiresAdmin: true,
          permissions: ['manage_system'],
        },
      },
    ],
  },
];

// router/routes/error.ts
export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/error',
    name: 'error',
    component: () => import('@/layouts/ErrorLayout.vue'),
    meta: {
      requiresAuth: false,
      layout: 'error',
    },
    children: [
      {
        path: '404',
        name: 'notFound',
        component: () => import('@/pages/error/NotFound.vue'),
        meta: {
          title: 'Page Not Found',
          requiresAuth: false,
        },
      },
      {
        path: '403',
        name: 'forbidden',
        component: () => import('@/pages/error/Forbidden.vue'),
        meta: {
          title: 'Access Denied',
          requiresAuth: false,
        },
      },
      {
        path: '500',
        name: 'serverError',
        component: () => import('@/pages/error/ServerError.vue'),
        meta: {
          title: 'Server Error',
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404',
  },
];
```

### Navigation Guards

```typescript
// router/guards/auth.ts
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Wait for auth state to be determined
  if (isLoading.value) {
    await new Promise((resolve) => {
      const unwatch = watch(isLoading, (loading) => {
        if (!loading) {
          unwatch();
          resolve(true);
        }
      });
    });
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Redirect to login with return URL
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
    return;
  }

  // Check if user is already authenticated and trying to access auth pages
  if (isAuthenticated.value && to.meta.layout === 'auth') {
    next({ name: 'dashboard' });
    return;
  }

  next();
};

// router/guards/permissions.ts
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useUser } from '@/composables/useUser';

export const permissionGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { user } = useUser();

  // Check admin requirement
  if (to.meta.requiresAdmin && !user.value?.isAdmin) {
    next({ name: 'forbidden' });
    return;
  }

  // Check specific permissions
  if (to.meta.permissions) {
    const requiredPermissions = to.meta.permissions as string[];
    const userPermissions = user.value?.permissions || [];

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      next({ name: 'forbidden' });
      return;
    }
  }

  next();
};

// router/guards/index.ts
export { authGuard } from './auth';
export { permissionGuard } from './permissions';
```

### Route Middleware

```typescript
// router/middleware/auth.ts
import type { RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

export const authMiddleware = async (to: RouteLocationNormalized) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value) {
    throw new Error('Authentication required');
  }
};

// router/middleware/loading.ts
import { ref } from 'vue';

const isLoading = ref(false);

export const loadingMiddleware = async (to: RouteLocationNormalized) => {
  isLoading.value = true;

  try {
    // Simulate loading time for route transitions
    await new Promise((resolve) => setTimeout(resolve, 100));
  } finally {
    isLoading.value = false;
  }
};

// router/middleware/index.ts
export { authMiddleware } from './auth';
export { loadingMiddleware } from './loading';
```

## Best Practices

### 1. **Lazy Loading**

Use dynamic imports for route components to enable code splitting.

```typescript
// ✅ Good - Lazy loading
{
  path: '/dashboard',
  component: () => import('@/pages/Dashboard.vue')
}

// ❌ Bad - Eager loading
import Dashboard from '@/pages/Dashboard.vue'
{
  path: '/dashboard',
  component: Dashboard
}
```

### 2. **Route Meta Information**

Use route meta to store additional information about routes.

```typescript
{
  path: '/admin/users',
  meta: {
    title: 'User Management',
    requiresAuth: true,
    requiresAdmin: true,
    permissions: ['manage_users'],
    layout: 'admin',
    breadcrumb: ['Admin', 'Users']
  }
}
```

### 3. **Nested Routes**

Use nested routes for related pages with shared layouts.

```typescript
{
  path: '/dashboard',
  component: DashboardLayout,
  children: [
    { path: '', component: DashboardHome },
    { path: 'analytics', component: Analytics },
    { path: 'settings', component: Settings }
  ]
}
```

### 4. **Route Guards**

Implement proper authentication and authorization guards.

```typescript
router.beforeEach(async (to, from, next) => {
  // Check authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
    return;
  }

  // Check permissions
  if (to.meta.permissions && !hasPermissions(to.meta.permissions)) {
    next('/forbidden');
    return;
  }

  next();
});
```

### 5. **Error Handling**

Provide proper error routes and handling.

```typescript
// Catch-all route for 404
{
  path: '/:pathMatch(.*)*',
  redirect: '/error/404'
}

// Error routes
{
  path: '/error',
  children: [
    { path: '404', component: NotFound },
    { path: '403', component: Forbidden },
    { path: '500', component: ServerError }
  ]
}
```

## Common Patterns

### Route with Parameters

```typescript
{
  path: '/users/:userId',
  name: 'userDetail',
  component: () => import('@/pages/UserDetail.vue'),
  props: true, // Pass route params as props
  meta: {
    title: 'User Details',
    requiresAuth: true
  }
}
```

### Route with Query Parameters

```typescript
{
  path: '/search',
  name: 'search',
  component: () => import('@/pages/Search.vue'),
  meta: {
    title: 'Search Results',
    requiresAuth: false
  }
}

// Usage: /search?q=query&category=all
```

### Route with Optional Parameters

```typescript
{
  path: '/chat/:roomId?',
  name: 'chat',
  component: () => import('@/pages/Chat.vue'),
  props: true,
  meta: {
    title: 'Chat',
    requiresAuth: true
  }
}

// Matches: /chat and /chat/123
```

### Route with Multiple Parameters

```typescript
{
  path: '/organizations/:orgId/projects/:projectId',
  name: 'projectDetail',
  component: () => import('@/pages/ProjectDetail.vue'),
  props: true,
  meta: {
    title: 'Project Details',
    requiresAuth: true
  }
}
```

## Route Utilities

### Route Helpers

```typescript
// router/utils/route-helpers.ts
import type { RouteLocationNormalized } from 'vue-router';

export const getRouteTitle = (route: RouteLocationNormalized): string => {
  return (route.meta.title as string) || 'Qiscus';
};

export const getRouteBreadcrumb = (route: RouteLocationNormalized): string[] => {
  return (route.meta.breadcrumb as string[]) || [];
};

export const hasRoutePermission = (
  route: RouteLocationNormalized,
  permissions: string[]
): boolean => {
  const requiredPermissions = (route.meta.permissions as string[]) || [];
  return requiredPermissions.every((permission) => permissions.includes(permission));
};

export const isRouteActive = (route: RouteLocationNormalized, path: string): boolean => {
  return route.path.startsWith(path);
};
```

### Route Constants

```typescript
// router/constants.ts
export const ROUTE_NAMES = {
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
  DASHBOARD: 'dashboard',
  CHAT: 'chat',
  CHAT_ROOM: 'chatRoom',
  USER_PROFILE: 'userProfile',
  ADMIN_USERS: 'adminUsers',
  NOT_FOUND: 'notFound',
  FORBIDDEN: 'forbidden',
} as const;

export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  CHAT: '/chat',
  USER_PROFILE: '/profile',
  ADMIN: '/admin',
  ERROR: '/error',
} as const;

export const ROUTE_META = {
  REQUIRES_AUTH: 'requiresAuth',
  REQUIRES_ADMIN: 'requiresAdmin',
  LAYOUT: 'layout',
  TITLE: 'title',
  PERMISSIONS: 'permissions',
} as const;
```

## Testing Routes

```typescript
// router/__tests__/routes.test.ts
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '../routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('Routes', () => {
  it('should have valid route configurations', () => {
    routes.forEach((route) => {
      expect(route.path).toBeDefined();
      expect(route.name).toBeDefined();
      expect(route.component).toBeDefined();
    });
  });

  it('should resolve dashboard route', async () => {
    const resolved = await router.resolve({ name: 'dashboard' });
    expect(resolved.matched.length).toBeGreaterThan(0);
  });

  it('should require auth for protected routes', () => {
    const dashboardRoute = routes.find((r) => r.name === 'dashboard');
    expect(dashboardRoute?.meta?.requiresAuth).toBe(true);
  });
});
```

## Usage Examples

### Programmatic Navigation

```typescript
import { useRouter } from 'vue-router';

const router = useRouter();

// Navigate to route
router.push('/dashboard');

// Navigate with params
router.push({ name: 'userDetail', params: { userId: '123' } });

// Navigate with query
router.push({ name: 'search', query: { q: 'query', category: 'all' } });

// Replace current route
router.replace('/login');

// Go back
router.back();
```

### Route Guards in Components

```typescript
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

// Before leaving route
onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    return confirm('You have unsaved changes. Are you sure you want to leave?');
  }
});

// Before route update
onBeforeRouteUpdate((to, from) => {
  // Handle route parameter changes
  if (to.params.userId !== from.params.userId) {
    fetchUserData(to.params.userId as string);
  }
});
```
