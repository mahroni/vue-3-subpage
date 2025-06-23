# Layouts

This directory contains Vue 3 layout components that define the overall structure and arrangement of pages in the Qiscus application.

## Naming Conventions

### File Naming

- Use **PascalCase** for layout files: `DefaultLayout.vue`, `AuthLayout.vue`
- Use **kebab-case** for layout directories: `default-layout/`, `auth-layout/`
- Use descriptive names that indicate the layout's purpose: `DashboardLayout.vue`, `ChatLayout.vue`

### Component Naming

- Use **PascalCase** for layout component names: `DefaultLayout`, `AuthLayout`
- Use **kebab-case** for layout component names in template: `<default-layout>`, `<auth-layout>`

## File Structure

```
layouts/
├── DefaultLayout.vue          # Main application layout
├── AuthLayout.vue            # Authentication pages layout
├── DashboardLayout.vue       # Dashboard pages layout
├── ChatLayout.vue           # Chat interface layout
├── AdminLayout.vue          # Admin panel layout
├── MobileLayout.vue         # Mobile-specific layout
├── components/              # Layout-specific components
│   ├── Header.vue
│   ├── Sidebar.vue
│   ├── Footer.vue
│   └── Navigation.vue
└── README.md
```

## Layout Guidelines

### Basic Layout Structure

```vue
<!-- DefaultLayout.vue -->
<template>
  <div class="layout layout--default">
    <!-- Header -->
    <header class="layout__header">
      <slot name="header">
        <LayoutHeader />
      </slot>
    </header>

    <!-- Main Content -->
    <main class="layout__main">
      <slot />
    </main>

    <!-- Sidebar -->
    <aside class="layout__sidebar" v-if="$slots.sidebar">
      <slot name="sidebar" />
    </aside>

    <!-- Footer -->
    <footer class="layout__footer" v-if="$slots.footer">
      <slot name="footer">
        <LayoutFooter />
      </slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from './components/Header.vue';
import LayoutFooter from './components/Footer.vue';

// Layout props
interface Props {
  showSidebar?: boolean;
  showFooter?: boolean;
  sidebarPosition?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  showSidebar: true,
  showFooter: true,
  sidebarPosition: 'left',
});
</script>

<style scoped>
.layout {
  display: grid;
  min-height: 100vh;
  grid-template-areas:
    'header header'
    'sidebar main'
    'footer footer';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
}

.layout__header {
  grid-area: header;
  z-index: 10;
}

.layout__main {
  grid-area: main;
  padding: 1rem;
  overflow-y: auto;
}

.layout__sidebar {
  grid-area: sidebar;
  width: 280px;
  background: var(--color-sidebar-bg);
}

.layout__footer {
  grid-area: footer;
}

/* Responsive */
@media (max-width: 768px) {
  .layout {
    grid-template-areas:
      'header'
      'main'
      'footer';
    grid-template-columns: 1fr;
  }

  .layout__sidebar {
    display: none;
  }
}
</style>
```

### Authentication Layout

```vue
<!-- AuthLayout.vue -->
<template>
  <div class="layout layout--auth">
    <div class="layout__container">
      <!-- Logo/Brand -->
      <div class="layout__brand">
        <slot name="brand">
          <img src="@/assets/logo.svg" alt="Qiscus" class="layout__logo" />
        </slot>
      </div>

      <!-- Auth Form Container -->
      <div class="layout__content">
        <div class="layout__form-container">
          <slot />
        </div>
      </div>

      <!-- Footer -->
      <footer class="layout__footer">
        <slot name="footer">
          <p>&copy; 2024 Qiscus. All rights reserved.</p>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// Auth layout specific props
interface Props {
  title?: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<style scoped>
.layout--auth {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.layout__container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.layout__brand {
  text-align: center;
  padding: 2rem 1rem 1rem;
}

.layout__logo {
  height: 40px;
  width: auto;
}

.layout__content {
  padding: 1rem 2rem 2rem;
}

.layout__form-container {
  width: 100%;
}

.layout__footer {
  text-align: center;
  padding: 1rem 2rem;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
```

### Dashboard Layout

```vue
<!-- DashboardLayout.vue -->
<template>
  <div class="layout layout--dashboard">
    <!-- Sidebar -->
    <aside class="layout__sidebar" :class="{ 'layout__sidebar--collapsed': isSidebarCollapsed }">
      <slot name="sidebar">
        <DashboardSidebar :collapsed="isSidebarCollapsed" />
      </slot>
    </aside>

    <!-- Main Content Area -->
    <div class="layout__main-area">
      <!-- Top Navigation -->
      <header class="layout__top-nav">
        <slot name="top-nav">
          <DashboardTopNav @toggle-sidebar="toggleSidebar" />
        </slot>
      </header>

      <!-- Page Content -->
      <main class="layout__content">
        <slot />
      </main>
    </div>

    <!-- Right Panel (optional) -->
    <aside class="layout__right-panel" v-if="$slots.right - panel">
      <slot name="right-panel" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DashboardSidebar from './components/DashboardSidebar.vue';
import DashboardTopNav from './components/DashboardTopNav.vue';

interface Props {
  initialSidebarCollapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialSidebarCollapsed: false,
});

const isSidebarCollapsed = ref(props.initialSidebarCollapsed);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>

<style scoped>
.layout--dashboard {
  display: grid;
  grid-template-columns: auto 1fr auto;
  min-height: 100vh;
  background: #f8fafc;
}

.layout__sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #e2e8f0;
  transition: width 0.3s ease;
}

.layout__sidebar--collapsed {
  width: 64px;
}

.layout__main-area {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__top-nav {
  height: 64px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
}

.layout__content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.layout__right-panel {
  width: 320px;
  background: white;
  border-left: 1px solid #e2e8f0;
}

/* Responsive */
@media (max-width: 1024px) {
  .layout--dashboard {
    grid-template-columns: 1fr;
  }

  .layout__sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .layout__sidebar--open {
    transform: translateX(0);
  }

  .layout__right-panel {
    display: none;
  }
}
</style>
```

## Best Practices

### 1. **Use Named Slots for Flexibility**

Provide named slots to allow customization of layout sections.

```vue
<template>
  <div class="layout">
    <header class="layout__header">
      <slot name="header">
        <!-- Default header content -->
      </slot>
    </header>

    <main class="layout__main">
      <slot />
    </main>

    <footer class="layout__footer">
      <slot name="footer">
        <!-- Default footer content -->
      </slot>
    </footer>
  </div>
</template>
```

### 2. **Responsive Design**

Ensure layouts work well on all screen sizes.

```vue
<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 280px 1fr;
  }
}

@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 280px 1fr 320px;
  }
}
</style>
```

### 3. **CSS Grid for Complex Layouts**

Use CSS Grid for complex layout arrangements.

```vue
<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    'header header header'
    'sidebar main aside'
    'footer footer footer';
  grid-template-columns: 280px 1fr 320px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.layout__header {
  grid-area: header;
}
.layout__sidebar {
  grid-area: sidebar;
}
.layout__main {
  grid-area: main;
}
.layout__aside {
  grid-area: aside;
}
.layout__footer {
  grid-area: footer;
}
</style>
```

### 4. **Layout Props for Customization**

Provide props to customize layout behavior.

```vue
<script setup lang="ts">
interface Props {
  showSidebar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  sidebarWidth?: string;
  headerHeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showSidebar: true,
  showHeader: true,
  showFooter: true,
  sidebarWidth: '280px',
  headerHeight: '64px',
});
</script>
```

### 5. **Layout Composition**

Compose layouts from smaller, reusable components.

```vue
<!-- LayoutHeader.vue -->
<template>
  <header class="layout-header">
    <div class="layout-header__left">
      <slot name="left" />
    </div>

    <div class="layout-header__center">
      <slot name="center" />
    </div>

    <div class="layout-header__right">
      <slot name="right" />
    </div>
  </header>
</template>

<style scoped>
.layout-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 1.5rem;
  height: 64px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.layout-header__left {
  justify-self: start;
}

.layout-header__center {
  justify-self: center;
}

.layout-header__right {
  justify-self: end;
}
</style>
```

## Common Layout Patterns

### Fixed Header with Scrollable Content

```vue
<template>
  <div class="layout layout--fixed-header">
    <header class="layout__header">
      <slot name="header" />
    </header>

    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout--fixed-header {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout__header {
  flex-shrink: 0;
  height: 64px;
}

.layout__main {
  flex: 1;
  overflow-y: auto;
}
</style>
```

### Sidebar with Overlay on Mobile

```vue
<template>
  <div class="layout layout--sidebar-overlay">
    <aside class="layout__sidebar" :class="{ 'layout__sidebar--open': isSidebarOpen }">
      <slot name="sidebar" />
    </aside>

    <div class="layout__overlay" v-if="isSidebarOpen" @click="closeSidebar" />

    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>

<style scoped>
.layout--sidebar-overlay {
  position: relative;
}

.layout__sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 280px;
  background: white;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 50;
}

.layout__sidebar--open {
  transform: translateX(0);
}

.layout__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

@media (min-width: 768px) {
  .layout__sidebar {
    position: static;
    transform: none;
  }

  .layout__overlay {
    display: none;
  }
}
</style>
```

### Centered Content Layout

```vue
<template>
  <div class="layout layout--centered">
    <div class="layout__container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout--centered {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.layout__container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
```

## Usage Examples

### Using Default Layout

```vue
<!-- pages/Dashboard.vue -->
<template>
  <DefaultLayout>
    <template #header>
      <h1>Dashboard</h1>
    </template>

    <template #sidebar>
      <DashboardSidebar />
    </template>

    <div class="dashboard-content">
      <!-- Page content -->
    </div>

    <template #footer>
      <DashboardFooter />
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import DashboardSidebar from '@/components/DashboardSidebar.vue';
import DashboardFooter from '@/components/DashboardFooter.vue';
</script>
```

### Using Auth Layout

```vue
<!-- pages/Login.vue -->
<template>
  <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
    <template #brand>
      <img src="@/assets/logo.svg" alt="Qiscus" />
    </template>

    <LoginForm />

    <template #footer>
      <p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import LoginForm from '@/components/LoginForm.vue';
</script>
```

## Testing Layouts

```vue
<!-- layouts/__tests__/DefaultLayout.test.ts -->
import { describe, it, expect } from 'vitest' import { mount } from '@vue/test-utils' import
DefaultLayout from '../DefaultLayout.vue' describe('DefaultLayout', () => { it('renders header
slot', () => { const wrapper = mount(DefaultLayout, { slots: { header: '
<div>Header Content</div>
' } }) expect(wrapper.text()).toContain('Header Content') }) it('renders default content', () => {
const wrapper = mount(DefaultLayout, { slots: { default: '
<div>Main Content</div>
' } }) expect(wrapper.text()).toContain('Main Content') }) })
```
