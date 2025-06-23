# Assets

This directory contains static assets for the Qiscus application, including images, icons, fonts, and other media files.

## Naming Conventions

### File Naming

- Use **kebab-case** for asset files: `logo.svg`, `user-avatar.png`
- Use **camelCase** for multi-word assets: `heroImage.jpg`, `backgroundPattern.svg`
- Use descriptive names: `qiscus-logo.svg`, `default-avatar.png`
- Use appropriate file extensions: `.svg`, `.png`, `.jpg`, `.webp`, `.woff2`

### Directory Naming

- Use **kebab-case** for asset directories: `images/`, `icons/`, `fonts/`
- Use descriptive directory names: `brand-assets/`, `ui-elements/`

## File Structure

```
assets/
├── images/
│   ├── logo/
│   │   ├── qiscus-logo.svg
│   │   ├── qiscus-logo-white.svg
│   │   └── qiscus-favicon.ico
│   ├── avatars/
│   │   ├── default-avatar.png
│   │   ├── admin-avatar.png
│   │   └── guest-avatar.png
│   ├── backgrounds/
│   │   ├── hero-bg.jpg
│   │   ├── pattern-bg.svg
│   │   └── gradient-bg.png
│   └── illustrations/
│       ├── empty-state.svg
│       ├── error-404.svg
│       └── success-state.svg
├── icons/
│   ├── ui/
│   │   ├── home.svg
│   │   ├── user.svg
│   │   ├── settings.svg
│   │   └── logout.svg
│   ├── social/
│   │   ├── facebook.svg
│   │   ├── twitter.svg
│   │   └── linkedin.svg
│   └── features/
│       ├── chat.svg
│       ├── analytics.svg
│       └── security.svg
├── fonts/
│   ├── inter/
│   │   ├── Inter-Regular.woff2
│   │   ├── Inter-Medium.woff2
│   │   ├── Inter-Bold.woff2
│   │   └── Inter-Italic.woff2
│   └── roboto/
│       ├── Roboto-Regular.woff2
│       ├── Roboto-Medium.woff2
│       └── Roboto-Bold.woff2
├── styles/
│   ├── variables.css
│   ├── animations.css
│   └── utilities.css
└── README.md
```

## Asset Guidelines

### Image Assets

```css
/* Usage in CSS */
.logo {
  background-image: url('@/assets/images/logo/qiscus-logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
}

.avatar {
  background-image: url('@/assets/images/avatars/default-avatar.png');
  background-size: cover;
  border-radius: 50%;
}

.hero-section {
  background-image: url('@/assets/images/backgrounds/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

```vue
<!-- Usage in Vue components -->
<template>
  <div class="brand-section">
    <img src="@/assets/images/logo/qiscus-logo.svg" alt="Qiscus Logo" />
    <img src="@/assets/images/illustrations/empty-state.svg" alt="Empty State" />
  </div>
</template>

<script setup lang="ts">
// Import assets for dynamic usage
import logoUrl from '@/assets/images/logo/qiscus-logo.svg';
import defaultAvatar from '@/assets/images/avatars/default-avatar.png';

const assets = {
  logo: logoUrl,
  defaultAvatar,
};
</script>
```

### Icon Assets

```vue
<!-- Icon component usage -->
<template>
  <div class="icon-container">
    <img src="@/assets/icons/ui/home.svg" alt="Home" class="icon" />
    <img src="@/assets/icons/ui/settings.svg" alt="Settings" class="icon" />
    <img src="@/assets/icons/features/chat.svg" alt="Chat" class="icon" />
  </div>
</template>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.icon-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
```

### Font Assets

```css
/* Font declarations in CSS */
@font-face {
  font-family: 'Inter';
  src: url('@/assets/fonts/inter/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('@/assets/fonts/inter/Inter-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('@/assets/fonts/inter/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Usage */
body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}
```

## Best Practices

### 1. **Optimize Images**

Use appropriate image formats and sizes for different use cases.

```bash
# Image optimization guidelines
- Use WebP for photos and complex images
- Use SVG for icons and simple graphics
- Use PNG for images with transparency
- Use JPG for photos without transparency
- Compress images to reduce file size
```

### 2. **Responsive Images**

Provide multiple sizes for different screen resolutions.

```vue
<template>
  <picture>
    <source srcset="@/assets/images/hero-bg-large.jpg" media="(min-width: 1024px)" />
    <source srcset="@/assets/images/hero-bg-medium.jpg" media="(min-width: 768px)" />
    <img src="@/assets/images/hero-bg-small.jpg" alt="Hero Background" class="hero-bg" />
  </picture>
</template>
```

### 3. **Lazy Loading**

Implement lazy loading for images to improve performance.

```vue
<template>
  <img src="@/assets/images/avatar.jpg" alt="User Avatar" loading="lazy" class="avatar" />
</template>
```

### 4. **Icon System**

Create a consistent icon system using SVG sprites or icon components.

```vue
<!-- Icon component -->
<template>
  <svg
    :class="['icon', `icon--${size}`, `icon--${color}`]"
    :width="sizeMap[size]"
    :height="sizeMap[size]"
  >
    <use :href="`@/assets/icons/sprite.svg#${name}`" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'error';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
});

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};
</script>

<style scoped>
.icon {
  fill: currentColor;
  vertical-align: middle;
}

.icon--primary {
  color: var(--color-primary);
}
.icon--secondary {
  color: var(--color-secondary);
}
.icon--success {
  color: var(--color-success);
}
.icon--error {
  color: var(--color-error);
}
</style>
```

### 5. **Asset Preloading**

Preload critical assets for better performance.

```html
<!-- In index.html -->
<link
  rel="preload"
  href="/src/assets/fonts/inter/Inter-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link rel="preload" href="/src/assets/images/logo/qiscus-logo.svg" as="image" />
```

## Asset Categories

### Brand Assets

```typescript
// assets/brand/index.ts
export const brandAssets = {
  logo: {
    primary: '/src/assets/images/logo/qiscus-logo.svg',
    white: '/src/assets/images/logo/qiscus-logo-white.svg',
    favicon: '/src/assets/images/logo/qiscus-favicon.ico',
  },
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
  },
  fonts: {
    primary: 'Inter',
    secondary: 'Roboto',
  },
};
```

### UI Assets

```typescript
// assets/ui/index.ts
export const uiAssets = {
  icons: {
    home: '/src/assets/icons/ui/home.svg',
    user: '/src/assets/icons/ui/user.svg',
    settings: '/src/assets/icons/ui/settings.svg',
    logout: '/src/assets/icons/ui/logout.svg',
  },
  avatars: {
    default: '/src/assets/images/avatars/default-avatar.png',
    admin: '/src/assets/images/avatars/admin-avatar.png',
    guest: '/src/assets/images/avatars/guest-avatar.png',
  },
  backgrounds: {
    hero: '/src/assets/images/backgrounds/hero-bg.jpg',
    pattern: '/src/assets/images/backgrounds/pattern-bg.svg',
    gradient: '/src/assets/images/backgrounds/gradient-bg.png',
  },
};
```

### Illustration Assets

```typescript
// assets/illustrations/index.ts
export const illustrationAssets = {
  states: {
    empty: '/src/assets/images/illustrations/empty-state.svg',
    error: '/src/assets/images/illustrations/error-404.svg',
    success: '/src/assets/images/illustrations/success-state.svg',
    loading: '/src/assets/images/illustrations/loading-state.svg',
  },
  features: {
    chat: '/src/assets/images/illustrations/chat-feature.svg',
    analytics: '/src/assets/images/illustrations/analytics-feature.svg',
    security: '/src/assets/images/illustrations/security-feature.svg',
  },
};
```

## Asset Optimization

### Image Optimization

```bash
# Using sharp for image optimization
npm install sharp

# Optimize images
npx sharp -i src/assets/images/raw/ -o src/assets/images/optimized/ --format webp --quality 80
```

### SVG Optimization

```bash
# Using SVGO for SVG optimization
npm install -g svgo

# Optimize SVG files
svgo src/assets/icons/ -o src/assets/icons/optimized/
```

### Font Optimization

```css
/* Font loading optimization */
@font-face {
  font-family: 'Inter';
  src: url('@/assets/fonts/inter/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Prevents FOIT */
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074,
    U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

## Asset Management

### Asset Registry

```typescript
// assets/registry.ts
export interface Asset {
  id: string;
  path: string;
  type: 'image' | 'icon' | 'font' | 'video';
  category: string;
  tags: string[];
  metadata?: Record<string, any>;
}

export const assetRegistry: Asset[] = [
  {
    id: 'qiscus-logo',
    path: '/src/assets/images/logo/qiscus-logo.svg',
    type: 'image',
    category: 'brand',
    tags: ['logo', 'brand', 'primary'],
  },
  {
    id: 'home-icon',
    path: '/src/assets/icons/ui/home.svg',
    type: 'icon',
    category: 'ui',
    tags: ['navigation', 'home', 'menu'],
  },
  {
    id: 'inter-font',
    path: '/src/assets/fonts/inter/Inter-Regular.woff2',
    type: 'font',
    category: 'typography',
    tags: ['font', 'primary', 'sans-serif'],
  },
];

export const getAsset = (id: string): Asset | undefined => {
  return assetRegistry.find((asset) => asset.id === id);
};

export const getAssetsByCategory = (category: string): Asset[] => {
  return assetRegistry.filter((asset) => asset.category === category);
};

export const getAssetsByTag = (tag: string): Asset[] => {
  return assetRegistry.filter((asset) => asset.tags.includes(tag));
};
```

### Asset Loading Utilities

```typescript
// assets/utils/loader.ts
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadFont = (family: string, src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const font = new FontFace(family, `url(${src})`);
    font
      .load()
      .then(() => {
        document.fonts.add(font);
        resolve();
      })
      .catch(reject);
  });
};

export const preloadAssets = async (assets: string[]): Promise<void> => {
  const promises = assets.map((asset) => {
    if (asset.endsWith('.woff2') || asset.endsWith('.woff') || asset.endsWith('.ttf')) {
      return preloadFont('Inter', asset);
    } else {
      return preloadImage(asset);
    }
  });

  await Promise.all(promises);
};
```

## Testing Assets

```typescript
// assets/__tests__/assets.test.ts
import { describe, it, expect } from 'vitest';
import { assetRegistry, getAsset, getAssetsByCategory } from '../registry';

describe('Asset Registry', () => {
  it('should have valid asset entries', () => {
    assetRegistry.forEach((asset) => {
      expect(asset.id).toBeDefined();
      expect(asset.path).toBeDefined();
      expect(asset.type).toBeDefined();
      expect(asset.category).toBeDefined();
      expect(asset.tags).toBeInstanceOf(Array);
    });
  });

  it('should find asset by id', () => {
    const logo = getAsset('qiscus-logo');
    expect(logo).toBeDefined();
    expect(logo?.type).toBe('image');
  });

  it('should filter assets by category', () => {
    const brandAssets = getAssetsByCategory('brand');
    expect(brandAssets.length).toBeGreaterThan(0);
    brandAssets.forEach((asset) => {
      expect(asset.category).toBe('brand');
    });
  });
});
```

## Build Configuration

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];

          if (/\.(woff2?|ttf|eot)$/.test(assetInfo.name)) {
            return `fonts/[name]-[hash][extname]`;
          }

          if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
            return `images/[name]-[hash][extname]`;
          }

          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
});
```
