# Pages

This directory contains Vue 3 page components that represent individual routes in the Qiscus application. Each page component is responsible for a specific route and its associated functionality.

## Naming Conventions

### File Naming

- Use **PascalCase** for page files: `Dashboard.vue`, `UserProfile.vue`
- Use **kebab-case** for page directories: `user-profile/`, `chat-room/`
- Use descriptive names that match the route: `Login.vue`, `Register.vue`, `Chat.vue`

### Component Naming

- Use **PascalCase** for page component names: `Dashboard`, `UserProfile`
- Use **kebab-case** for page component names in template: `<dashboard>`, `<user-profile>`

## File Structure

```
pages/
├── auth/
│   ├── Login.vue
│   ├── Register.vue
│   ├── ForgotPassword.vue
│   └── ResetPassword.vue
├── dashboard/
│   ├── Dashboard.vue
│   ├── Analytics.vue
│   └── Settings.vue
├── chat/
│   ├── ChatList.vue
│   ├── ChatRoom.vue
│   └── ChatSettings.vue
├── user/
│   ├── Profile.vue
│   ├── Settings.vue
│   └── Preferences.vue
├── admin/
│   ├── Users.vue
│   ├── Reports.vue
│   └── System.vue
├── error/
│   ├── NotFound.vue
│   ├── Unauthorized.vue
│   └── ServerError.vue
└── README.md
```

## Page Guidelines

### Basic Page Structure

```vue
<!-- Dashboard.vue -->
<template>
  <div class="page page--dashboard">
    <!-- Page Header -->
    <header class="page__header">
      <h1 class="page__title">Dashboard</h1>
      <p class="page__subtitle">Welcome back, {{ user?.name }}</p>
    </header>

    <!-- Page Content -->
    <main class="page__content">
      <!-- Loading State -->
      <div v-if="isLoading" class="page__loading">
        <LoadingSpinner />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="page__error">
        <ErrorMessage :message="error" @retry="fetchData" />
      </div>

      <!-- Success State -->
      <div v-else class="page__success">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import ErrorMessage from '@/components/ui/ErrorMessage.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import { useUser } from '@/composables/useUser';

// Route
const route = useRoute();

// Composables
const { user } = useUser();

// Page state
const isLoading = ref(false);
const error = ref<string | null>(null);

// Methods
const fetchData = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    // Fetch page data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data';
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.page {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page__header {
  margin-bottom: 2rem;
}

.page__title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.page__subtitle {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.page__content {
  min-height: 400px;
}

.page__loading,
.page__error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}
</style>
```

### Authentication Page

```vue
<!-- auth/Login.vue -->
<template>
  <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
    <template #brand>
      <img src="@/assets/logo.svg" alt="Qiscus" class="auth-logo" />
    </template>

    <LoginForm :loading="isLoading" :error="error" @submit="handleLogin" />

    <template #footer>
      <div class="auth-footer">
        <p>
          Don't have an account?
          <router-link to="/register" class="auth-link">Sign up</router-link>
        </p>
        <router-link to="/forgot-password" class="auth-link"> Forgot your password? </router-link>
      </div>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import LoginForm from '@/components/auth/LoginForm.vue';
import { useAuth } from '@/composables/useAuth';
import AuthLayout from '@/layouts/AuthLayout.vue';

// Router
const router = useRouter();

// Composables
const { login } = useAuth();

// Page state
const isLoading = ref(false);
const error = ref<string | null>(null);

// Methods
const handleLogin = async (credentials: LoginCredentials) => {
  try {
    isLoading.value = true;
    error.value = null;

    await login(credentials);
    router.push('/dashboard');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login failed';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.auth-logo {
  height: 40px;
  width: auto;
}

.auth-footer {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.auth-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.auth-link:hover {
  text-decoration: underline;
}
</style>
```

### Chat Room Page

```vue
<!-- chat/ChatRoom.vue -->
<template>
  <ChatLayout>
    <template #sidebar>
      <ChatSidebar :rooms="rooms" :current-room-id="roomId" @select-room="handleRoomSelect" />
    </template>

    <template #main>
      <div class="chat-room">
        <!-- Chat Header -->
        <ChatHeader
          :room="currentRoom"
          :participants="participants"
          @open-settings="openSettings"
        />

        <!-- Messages -->
        <ChatMessages :messages="messages" :loading="isLoading" @load-more="loadMoreMessages" />

        <!-- Message Input -->
        <ChatInput :disabled="!currentRoom" @send-message="sendMessage" />
      </div>
    </template>

    <!-- Settings Modal -->
    <ChatSettingsModal
      v-if="showSettings"
      :room="currentRoom"
      @close="closeSettings"
      @update-room="handleRoomUpdate"
    />
  </ChatLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ChatHeader from '@/components/chat/ChatHeader.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatSettingsModal from '@/components/chat/ChatSettingsModal.vue';
import ChatSidebar from '@/components/chat/ChatSidebar.vue';
import { useChat } from '@/composables/useChat';
import ChatLayout from '@/layouts/ChatLayout.vue';

// Route
const route = useRoute();
const router = useRouter();

// Composables
const {
  rooms,
  currentRoom,
  messages,
  participants,
  isLoading,
  joinRoom,
  leaveRoom,
  sendMessage: sendChatMessage,
  loadMessages,
} = useChat();

// Computed
const roomId = computed(() => route.params.roomId as string);

// Page state
const showSettings = ref(false);

// Methods
const handleRoomSelect = (roomId: string) => {
  router.push(`/chat/${roomId}`);
};

const handleRoomUpdate = (updatedRoom: ChatRoom) => {
  // Handle room updates
  closeSettings();
};

const openSettings = () => {
  showSettings.value = true;
};

const closeSettings = () => {
  showSettings.value = false;
};

const sendMessage = async (content: string) => {
  if (!currentRoom.value) return;

  try {
    await sendChatMessage(currentRoom.value.id, content);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

const loadMoreMessages = async () => {
  if (!currentRoom.value) return;

  try {
    await loadMessages(currentRoom.value.id);
  } catch (error) {
    console.error('Failed to load messages:', error);
  }
};

// Lifecycle
onMounted(async () => {
  if (roomId.value) {
    await joinRoom(roomId.value);
  }
});

onUnmounted(() => {
  if (roomId.value) {
    leaveRoom(roomId.value);
  }
});
</script>

<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-room__header {
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-border);
}

.chat-room__messages {
  flex: 1;
  overflow-y: auto;
}

.chat-room__input {
  flex-shrink: 0;
  border-top: 1px solid var(--color-border);
}
</style>
```

## Best Practices

### 1. **Use Layouts**

Wrap page content in appropriate layouts.

```vue
<template>
  <DashboardLayout>
    <template #header>
      <h1>User Profile</h1>
    </template>

    <UserProfileForm />
  </DashboardLayout>
</template>

<script setup lang="ts">
import UserProfileForm from '@/components/user/UserProfileForm.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
</script>
```

### 2. **Handle Loading and Error States**

Always provide loading and error states for better UX.

```vue
<template>
  <div class="page">
    <div v-if="isLoading" class="page__loading">
      <LoadingSpinner />
    </div>

    <div v-else-if="error" class="page__error">
      <ErrorMessage :message="error" @retry="fetchData" />
    </div>

    <div v-else class="page__content">
      <!-- Page content -->
    </div>
  </div>
</template>
```

### 3. **Use Composables for Logic**

Extract business logic into composables.

```vue
<script setup lang="ts">
import { useChat } from '@/composables/useChat';
import { useUser } from '@/composables/useUser';

const { user, updateProfile } = useUser();
const { rooms, joinRoom } = useChat();
</script>
```

### 4. **Handle Route Parameters**

Properly handle route parameters and navigation.

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const userId = computed(() => route.params.userId as string);

const navigateToUser = (id: string) => {
  router.push(`/users/${id}`);
};
</script>
```

### 5. **Clean Up Resources**

Clean up subscriptions and listeners on unmount.

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

let subscription: Subscription;

onMounted(() => {
  subscription = subscribeToData();
});

onUnmounted(() => {
  subscription?.unsubscribe();
});
</script>
```

## Common Page Patterns

### List Page Pattern

```vue
<!-- users/UserList.vue -->
<template>
  <div class="page">
    <header class="page__header">
      <h1>Users</h1>
      <button @click="openCreateModal" class="btn btn--primary">Add User</button>
    </header>

    <div class="page__filters">
      <SearchInput v-model="searchQuery" placeholder="Search users..." />
      <FilterDropdown v-model="statusFilter" :options="statusOptions" />
    </div>

    <div class="page__content">
      <UserTable
        :users="filteredUsers"
        :loading="isLoading"
        @edit="editUser"
        @delete="deleteUser"
      />

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="handlePageChange"
      />
    </div>

    <UserModal v-if="showModal" :user="selectedUser" @close="closeModal" @save="saveUser" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useUsers } from '@/composables/useUsers';

const { users, isLoading, createUser, updateUser, deleteUser } = useUsers();

const searchQuery = ref('');
const statusFilter = ref('all');
const currentPage = ref(1);
const showModal = ref(false);
const selectedUser = ref<User | null>(null);

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = statusFilter.value === 'all' || user.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const openCreateModal = () => {
  selectedUser.value = null;
  showModal.value = true;
};

const editUser = (user: User) => {
  selectedUser.value = user;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedUser.value = null;
};

const saveUser = async (userData: Partial<User>) => {
  try {
    if (selectedUser.value) {
      await updateUser(selectedUser.value.id, userData);
    } else {
      await createUser(userData);
    }
    closeModal();
  } catch (error) {
    console.error('Failed to save user:', error);
  }
};
</script>
```

### Detail Page Pattern

```vue
<!-- users/UserDetail.vue -->
<template>
  <div class="page">
    <header class="page__header">
      <div class="page__breadcrumb">
        <router-link to="/users">Users</router-link>
        <span>/</span>
        <span>{{ user?.name || 'Loading...' }}</span>
      </div>

      <div class="page__actions">
        <button @click="editUser" class="btn btn--secondary">Edit</button>
        <button @click="deleteUser" class="btn btn--danger">Delete</button>
      </div>
    </header>

    <div v-if="isLoading" class="page__loading">
      <LoadingSpinner />
    </div>

    <div v-else-if="error" class="page__error">
      <ErrorMessage :message="error" />
    </div>

    <div v-else-if="user" class="page__content">
      <UserProfile :user="user" />
      <UserActivity :user-id="user.id" />
    </div>

    <UserModal v-if="showEditModal" :user="user" @close="closeEditModal" @save="saveUser" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsers } from '@/composables/useUsers';

const route = useRoute();
const router = useRouter();
const { getUser, updateUser, deleteUser } = useUsers();

const user = ref<User | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);
const showEditModal = ref(false);

const fetchUser = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    user.value = await getUser(route.params.userId as string);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load user';
  } finally {
    isLoading.value = false;
  }
};

const editUser = () => {
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveUser = async (userData: Partial<User>) => {
  try {
    await updateUser(user.value!.id, userData);
    user.value = { ...user.value!, ...userData };
    closeEditModal();
  } catch (error) {
    console.error('Failed to update user:', error);
  }
};

const deleteUser = async () => {
  if (!confirm('Are you sure you want to delete this user?')) return;

  try {
    await deleteUser(user.value!.id);
    router.push('/users');
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};

onMounted(() => {
  fetchUser();
});
</script>
```

### Form Page Pattern

```vue
<!-- users/UserForm.vue -->
<template>
  <div class="page">
    <header class="page__header">
      <h1>{{ isEditing ? 'Edit User' : 'Create User' }}</h1>
    </header>

    <div class="page__content">
      <UserForm
        :user="user"
        :loading="isSubmitting"
        :errors="errors"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useUsers } from '@/composables/useUsers';

const route = useRoute();
const router = useRouter();
const { getUser, createUser, updateUser } = useUsers();

const user = ref<Partial<User>>({});
const isSubmitting = ref(false);
const errors = ref<Record<string, string>>({});

const isEditing = computed(() => !!route.params.userId);

const handleSubmit = async (userData: Partial<User>) => {
  try {
    isSubmitting.value = true;
    errors.value = {};

    if (isEditing.value) {
      await updateUser(route.params.userId as string, userData);
    } else {
      await createUser(userData);
    }

    router.push('/users');
  } catch (err) {
    if (err instanceof Error) {
      errors.value = { general: err.message };
    }
  } finally {
    isSubmitting.value = false;
  }
};

const handleCancel = () => {
  router.back();
};
</script>
```

## Error Pages

### 404 Not Found

```vue
<!-- error/NotFound.vue -->
<template>
  <div class="error-page">
    <div class="error-page__content">
      <h1 class="error-page__title">404</h1>
      <h2 class="error-page__subtitle">Page Not Found</h2>
      <p class="error-page__message">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="error-page__actions">
        <button @click="goBack" class="btn btn--secondary">Go Back</button>
        <router-link to="/" class="btn btn--primary">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.error-page__title {
  font-size: 6rem;
  font-weight: 900;
  color: var(--color-primary);
  margin: 0;
}

.error-page__subtitle {
  font-size: 2rem;
  margin: 1rem 0;
}

.error-page__message {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.error-page__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
```

## Testing Pages

```vue
<!-- pages/__tests__/Dashboard.test.ts -->
import { describe, it, expect, vi } from 'vitest' import { mount } from '@vue/test-utils' import {
createRouter, createWebHistory } from 'vue-router' import Dashboard from '../Dashboard.vue' const
router = createRouter({ history: createWebHistory(), routes: [ { path: '/dashboard', component:
Dashboard } ] }) describe('Dashboard', () => { it('renders dashboard content', async () => { const
wrapper = mount(Dashboard, { global: { plugins: [router] } })
expect(wrapper.find('.page__title').text()).toBe('Dashboard') }) it('shows loading state initially',
() => { const wrapper = mount(Dashboard) expect(wrapper.find('.page__loading').exists()).toBe(true)
}) })
```
