# Axios Configuration Setup

This project includes a comprehensive axios configuration with support for three different API versions (v1, v2, v3) and custom headers management using Pinia.

## Files Created

1. **`src/utils/axios.ts`** - Main axios configuration with interceptors and error handling
2. **`src/stores/app-config.ts`** - Pinia store for managing app configuration and headers
3. **`env.example`** - Environment variables template
4. **`src/utils/api-examples.ts`** - Usage examples and API service functions
5. **`src/examples/app-initialization.ts`** - Examples of app initialization with configuration

## Environment Variables

Copy `env.example` to `.env` and update the API base URLs:

```bash
cp env.example .env
```

Update the `.env` file with your actual API endpoints:

```env
# API Base URLs for different versions
VITE_API_BASE_URL_V1=https://your-api-v1.com
VITE_API_BASE_URL_V2=https://your-api-v2.com
VITE_API_BASE_URL_V3=https://your-api-v3.com
```

## App Configuration with Pinia

The project now uses Pinia to manage app configuration including custom headers:

```typescript
import { useAppConfigStore } from '@/stores/app-config';

const appConfigStore = useAppConfigStore();

// Set complete configuration
appConfigStore.setConfig({
  userToken: 'your-user-token',
  appId: 'your-app-id',
  appVersion: '1.0.0',
});

// Or set individual values
appConfigStore.setUserToken('token');
appConfigStore.setAppId('app-id');
appConfigStore.setAppVersion('1.0.0');

// Get headers for API calls
const headers = appConfigStore.getHeaders();
// Returns: {
//   'Authorization': 'your-user-token',
//   'APP_ID': 'your-app-id',
//   'Qiscus-App-Id': 'your-app-id',
//   'App-Version': '1.0.0'
// }
```

## App Initialization

### Method 1: Initialize with configuration during app creation

```typescript
import { createOmnichannelApp } from '@/main';

const app = createOmnichannelApp('#app', {
  userToken: 'your-user-token',
  appId: 'your-app-id',
  appVersion: '1.0.0',
});
```

### Method 2: Initialize without configuration (fallback to localStorage)

```typescript
import { createOmnichannelApp } from '@/main';

const app = createOmnichannelApp('#app', 'your-app-id');
// Will use localStorage.getItem('auth_token') for Authorization header
```

### Method 3: Set configuration after app creation

```typescript
import { createOmnichannelApp } from '@/main';
import { useAppConfigStore } from '@/stores/app-config';

const app = createOmnichannelApp('#app', 'your-app-id');

// Set configuration after app is created
const appConfigStore = useAppConfigStore();
appConfigStore.setConfig({
  userToken: 'your-user-token',
  appId: 'your-app-id',
  appVersion: '1.0.0',
});
```

## Features

### 🔧 Axios Configuration

- **Multiple API versions**: Separate instances for v1, v2, and v3 APIs
- **Custom headers**: Automatic injection of Authorization, APP_ID, Qiscus-App-Id, and App-Version headers
- **Request/Response interceptors**: Automatic token handling and logging
- **Error handling**: Centralized error handling with status code management
- **TypeScript support**: Full type safety with generic types
- **Development logging**: Request/response logging in development mode
- **Fallback support**: Falls back to localStorage if Pinia store is not configured

### 🚀 Available Exports

```typescript
import {
  // API v3 instance
  apiCall,
  apiV1,
  // API v1 instance
  apiV2,
  // API v2 instance
  apiV3,
  // Typed helper function
  createAxiosInstance, // Factory function for custom instances
} from '@/utils/axios';
```

```typescript
import {
  // Pinia store for app configuration
  type AppConfig, // TypeScript interface for app config
  useAppConfigStore,
} from '@/stores/app-config';
```

## Usage Examples

### Basic Usage with Custom Headers

```typescript
import { apiV1, apiV2, apiV3 } from '@/utils/axios';

// API v1 calls (will include custom headers from Pinia store)
const users = await apiV1.get('/users');
const user = await apiV1.get(`/users/${id}`);

// API v2 calls
const posts = await apiV2.get('/posts');
const post = await apiV2.post('/posts', postData);

// API v3 calls
const products = await apiV3.get('/products');
const product = await apiV3.put(`/products/${id}`, productData);
```

### Using Service Functions

```typescript
import { postApi, productApi, userApi } from '@/utils/api-examples';

// User operations (API v1)
const users = await userApi.getUsers();
const newUser = await userApi.createUser({
  name: 'John',
  email: 'john@example.com',
});

// Post operations (API v2)
const posts = await postApi.getPosts();
const userPosts = await postApi.getPostsByUser(userId);

// Product operations (API v3)
const products = await productApi.getProducts();
const electronics = await productApi.getProductsByCategory('electronics');
```

### Using Typed Helper Function

```typescript
import { typedApiExamples } from '@/utils/api-examples';

const result = await typedApiExamples.getUsersTyped();
if (result.success) {
  console.log('Users:', result.data);
} else {
  console.error('Error:', result.error);
}
```

### Vue Component Example

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useAppConfigStore } from '@/stores/app-config';
import { userApi } from '@/utils/api-examples';
import type { User } from '@/utils/api-examples';

const users = ref<User[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const appConfigStore = useAppConfigStore();

const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await userApi.getUsers();
    users.value = response.data;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Check if app is configured
const isConfigured = appConfigStore.isConfigured();

onMounted(() => {
  if (isConfigured) {
    fetchUsers();
  } else {
    error.value = 'App not configured';
  }
});
</script>

<template>
  <div>
    <div v-if="!isConfigured" class="error">
      App configuration is missing. Please set userToken, appId, and appVersion.
    </div>
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">{{ user.name }} ({{ user.email }})</li>
    </ul>
  </div>
</template>
```

## Authentication & Headers

The axios configuration automatically handles authentication and custom headers:

### Pinia Store Configuration (Recommended)

- Headers are managed through the Pinia store
- Automatically added to all API requests
- Includes: `Authorization`, `APP_ID`, `Qiscus-App-Id`, `App-Version`

### Fallback to localStorage

- If Pinia store is not configured, falls back to `localStorage.getItem('auth_token')`
- Only adds `Authorization: Bearer <token>` header

### Header Management

```typescript
import { useAppConfigStore } from '@/stores/app-config';

const appConfigStore = useAppConfigStore();

// Set headers
appConfigStore.setConfig({
  userToken: 'your-token',
  appId: 'your-app-id',
  appVersion: '1.0.0',
});

// Get current headers
const headers = appConfigStore.getHeaders();

// Check if configured
const isReady = appConfigStore.isConfigured();

// Clear configuration
appConfigStore.clearConfig();
```

## Error Handling

The configuration includes comprehensive error handling:

- **401 Unauthorized**: Automatically clears both localStorage and Pinia store
- **403 Forbidden**: Logs access forbidden error
- **404 Not Found**: Logs resource not found error
- **500 Server Error**: Logs server error
- **Network errors**: Handles connection issues
- **Development logging**: Detailed logging in development mode

## Customization

### Creating Custom Instances

```typescript
import { createAxiosInstance } from '@/utils/axios';

const customApi = createAxiosInstance('https://custom-api.com', 15000);
```

### Adding Custom Interceptors

```typescript
import { apiV1 } from '@/utils/axios';

// Add custom request interceptor
apiV1.interceptors.request.use((config) => {
  // Custom logic here
  return config;
});

// Add custom response interceptor
apiV1.interceptors.response.use((response) => {
  // Custom logic here
  return response;
});
```

## Best Practices

1. **Use Pinia store**: Always use the Pinia store for managing app configuration
2. **Initialize early**: Set configuration during app initialization for best performance
3. **Use service functions**: Organize API calls into service functions for better maintainability
4. **Type your responses**: Always define interfaces for your API responses
5. **Handle errors gracefully**: Use try-catch blocks or the typed helper function
6. **Environment variables**: Never hardcode API URLs, use environment variables
7. **Loading states**: Always show loading states during API calls
8. **Error boundaries**: Implement error boundaries in your Vue components

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure your API server allows requests from your frontend domain
2. **Authentication issues**: Check that configuration is properly set in Pinia store
3. **Type errors**: Make sure to import types correctly and use proper interfaces
4. **Environment variables**: Ensure all VITE\_ prefixed variables are properly set
5. **Missing headers**: Verify that app configuration is set before making API calls

### Debug Mode

In development mode, all API requests and responses are logged to the console with emojis for easy identification:

- 🚀 API Request logs
- 📋 Headers logs
- ✅ API Response logs
- ❌ API Error logs

### Configuration Check

```typescript
import { useAppConfigStore } from '@/stores/app-config';

const appConfigStore = useAppConfigStore();

if (!appConfigStore.isConfigured()) {
  console.error('App configuration is missing!');
  console.log('Required: userToken, appId, appVersion');
} else {
  console.log('App is properly configured');
  console.log('Headers:', appConfigStore.getHeaders());
}
```
