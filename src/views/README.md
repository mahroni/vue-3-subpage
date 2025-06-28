# Views

This directory contains Vue 3 view components that represent the main views or sections of the Qiscus application. Views are larger, more complex components that compose multiple smaller components together.

## Naming Conventions

### File Naming

- Use **PascalCase** for view files: `DashboardView.vue`, `ChatView.vue`
- Use **kebab-case** for view directories: `dashboard-view/`, `chat-view/`
- Use descriptive names that indicate the view's purpose: `UserProfileView.vue`, `AnalyticsView.vue`

### Component Naming

- Use **PascalCase** for view component names: `DashboardView`, `ChatView`
- Use **kebab-case** for view component names in template: `<dashboard-view>`, `<chat-view>`

## File Structure

```
views/
├── DashboardView.vue         # Main dashboard view
├── ChatView.vue             # Chat interface view
├── UserProfileView.vue      # User profile view
├── AnalyticsView.vue        # Analytics and reports view
├── SettingsView.vue         # Application settings view
├── AdminView.vue           # Admin panel view
├── components/             # View-specific components
│   ├── DashboardWidgets/
│   ├── ChatComponents/
│   └── AnalyticsCharts/
└── README.md
```

## View Guidelines

### Basic View Structure

```vue
<!-- DashboardView.vue -->
<template>
  <div class="view view--dashboard">
    <!-- View Header -->
    <header class="view__header">
      <div class="view__header-content">
        <h1 class="view__title">Dashboard</h1>
        <div class="view__actions">
          <button @click="refreshData" class="btn btn--secondary">
            <RefreshIcon />
            Refresh
          </button>
          <button @click="exportData" class="btn btn--primary">
            <DownloadIcon />
            Export
          </button>
        </div>
      </div>
    </header>

    <!-- View Content -->
    <main class="view__content">
      <!-- Loading State -->
      <div v-if="isLoading" class="view__loading">
        <LoadingSpinner size="large" />
        <p>Loading dashboard data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="view__error">
        <ErrorMessage :title="error.title" :message="error.message" @retry="fetchData" />
      </div>

      <!-- Success State -->
      <div v-else class="view__success">
        <!-- Dashboard Widgets -->
        <div class="view__widgets">
          <StatsWidget :stats="stats" :loading="statsLoading" />
          <ActivityWidget :activities="recentActivities" :loading="activitiesLoading" />
          <ChartWidget :data="chartData" :loading="chartLoading" />
        </div>

        <!-- Quick Actions -->
        <div class="view__quick-actions">
          <QuickActionCard
            v-for="action in quickActions"
            :key="action.id"
            :action="action"
            @click="handleQuickAction"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import DownloadIcon from '@/components/icons/DownloadIcon.vue';
import RefreshIcon from '@/components/icons/RefreshIcon.vue';
import ErrorMessage from '@/components/ui/ErrorMessage.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import { useDashboard } from '@/composables/useDashboard';
import { useNotifications } from '@/composables/useNotifications';

import ActivityWidget from './components/DashboardWidgets/ActivityWidget.vue';
import ChartWidget from './components/DashboardWidgets/ChartWidget.vue';
import QuickActionCard from './components/DashboardWidgets/QuickActionCard.vue';
import StatsWidget from './components/DashboardWidgets/StatsWidget.vue';

// Composables
const {
  stats,
  recentActivities,
  chartData,
  isLoading: dashboardLoading,
  statsLoading,
  activitiesLoading,
  chartLoading,
  fetchData,
  exportDashboardData,
} = useDashboard();

const { showNotification } = useNotifications();

// View state
const isLoading = ref(false);
const error = ref<{ title: string; message: string } | null>(null);

// Methods
const refreshData = async () => {
  try {
    await fetchData();
    showNotification('Dashboard refreshed successfully', 'success');
  } catch (err) {
    showNotification('Failed to refresh dashboard', 'error');
  }
};

const exportData = async () => {
  try {
    await exportDashboardData();
    showNotification('Data exported successfully', 'success');
  } catch (err) {
    showNotification('Failed to export data', 'error');
  }
};

const handleQuickAction = (action: QuickAction) => {
  // Handle quick action
  console.log('Quick action:', action);
};

// Lifecycle
onMounted(() => {
  fetchData();
});

onUnmounted(() => {
  // Cleanup if needed
});
</script>

<style scoped>
.view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.view__header {
  background: white;
  border-bottom: 1px solid var(--color-border);
  padding: 1.5rem;
}

.view__header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.view__title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.view__actions {
  display: flex;
  gap: 0.75rem;
}

.view__content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.view__loading,
.view__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.view__widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.view__quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .view__header-content {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .view__actions {
    justify-content: center;
  }

  .view__widgets {
    grid-template-columns: 1fr;
  }
}
</style>
```

### Chat View Structure

```vue
<!-- ChatView.vue -->
<template>
  <div class="view view--chat">
    <!-- Chat Sidebar -->
    <aside class="view__sidebar" :class="{ 'view__sidebar--collapsed': isSidebarCollapsed }">
      <ChatSidebar
        :rooms="chatRooms"
        :current-room="currentRoom"
        :online-users="onlineUsers"
        @select-room="handleRoomSelect"
        @create-room="handleCreateRoom"
        @search="handleSearch"
      />
    </aside>

    <!-- Chat Main Area -->
    <main class="view__main">
      <!-- Chat Header -->
      <header class="view__chat-header">
        <ChatHeader
          :room="currentRoom"
          :participants="roomParticipants"
          @toggle-sidebar="toggleSidebar"
          @open-settings="openRoomSettings"
        />
      </header>

      <!-- Chat Messages -->
      <section class="view__messages">
        <ChatMessages
          :messages="messages"
          :loading="messagesLoading"
          :has-more="hasMoreMessages"
          @load-more="loadMoreMessages"
          @scroll-to-bottom="scrollToBottom"
        />
      </section>

      <!-- Chat Input -->
      <footer class="view__input">
        <ChatInput
          :disabled="!currentRoom"
          :attachments="attachments"
          @send-message="sendMessage"
          @send-attachment="sendAttachment"
          @typing="handleTyping"
        />
      </footer>
    </main>

    <!-- Room Settings Panel -->
    <aside v-if="showSettings" class="view__settings">
      <ChatSettings
        :room="currentRoom"
        @close="closeSettings"
        @update-room="handleRoomUpdate"
        @leave-room="handleLeaveRoom"
      />
    </aside>

    <!-- Modals -->
    <CreateRoomModal v-if="showCreateModal" @close="closeCreateModal" @create="handleCreateRoom" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useChat } from '@/composables/useChat';
import { useWebSocket } from '@/composables/useWebSocket';

import ChatHeader from './components/ChatComponents/ChatHeader.vue';
import ChatInput from './components/ChatComponents/ChatInput.vue';
import ChatMessages from './components/ChatComponents/ChatMessages.vue';
import ChatSettings from './components/ChatComponents/ChatSettings.vue';
import ChatSidebar from './components/ChatComponents/ChatSidebar.vue';
import CreateRoomModal from './components/ChatComponents/CreateRoomModal.vue';

// Route and Router
const route = useRoute();
const router = useRouter();

// Composables
const {
  chatRooms,
  currentRoom,
  messages,
  roomParticipants,
  onlineUsers,
  messagesLoading,
  hasMoreMessages,
  joinRoom,
  leaveRoom,
  sendMessage: sendChatMessage,
  loadMessages,
  createRoom,
} = useChat();

const { connect, disconnect, send } = useWebSocket();

// View state
const isSidebarCollapsed = ref(false);
const showSettings = ref(false);
const showCreateModal = ref(false);
const attachments = ref<File[]>([]);

// Computed
const roomId = computed(() => route.params.roomId as string);

// Methods
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const handleRoomSelect = async (roomId: string) => {
  try {
    await joinRoom(roomId);
    router.push(`/chat/${roomId}`);
  } catch (error) {
    console.error('Failed to join room:', error);
  }
};

const handleCreateRoom = async (roomData: CreateRoomData) => {
  try {
    const newRoom = await createRoom(roomData);
    await handleRoomSelect(newRoom.id);
    closeCreateModal();
  } catch (error) {
    console.error('Failed to create room:', error);
  }
};

const sendMessage = async (content: string) => {
  if (!currentRoom.value) return;

  try {
    await sendChatMessage(currentRoom.value.id, content);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

const sendAttachment = async (file: File) => {
  if (!currentRoom.value) return;

  try {
    // Handle file upload and message sending
    console.log('Sending attachment:', file);
  } catch (error) {
    console.error('Failed to send attachment:', error);
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

const handleTyping = (isTyping: boolean) => {
  if (!currentRoom.value) return;

  send('typing', {
    roomId: currentRoom.value.id,
    isTyping,
  });
};

const openRoomSettings = () => {
  showSettings.value = true;
};

const closeSettings = () => {
  showSettings.value = false;
};

const handleRoomUpdate = (updates: Partial<ChatRoom>) => {
  // Handle room updates
  closeSettings();
};

const handleLeaveRoom = async () => {
  if (!currentRoom.value) return;

  try {
    await leaveRoom(currentRoom.value.id);
    router.push('/chat');
    closeSettings();
  } catch (error) {
    console.error('Failed to leave room:', error);
  }
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const handleSearch = (query: string) => {
  // Handle search functionality
  console.log('Searching:', query);
};

const scrollToBottom = () => {
  // Scroll messages to bottom
};

// Lifecycle
onMounted(async () => {
  // Connect to WebSocket
  await connect();

  // Join room if specified
  if (roomId.value) {
    await handleRoomSelect(roomId.value);
  }
});

onUnmounted(() => {
  // Disconnect from WebSocket
  disconnect();

  // Leave current room
  if (currentRoom.value) {
    leaveRoom(currentRoom.value.id);
  }
});
</script>

<style scoped>
.view--chat {
  display: grid;
  grid-template-columns: auto 1fr auto;
  height: 100vh;
  background: var(--color-bg-secondary);
}

.view__sidebar {
  width: 320px;
  background: white;
  border-right: 1px solid var(--color-border);
  transition: width 0.3s ease;
}

.view__sidebar--collapsed {
  width: 64px;
}

.view__main {
  display: flex;
  flex-direction: column;
  background: white;
}

.view__chat-header {
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-border);
}

.view__messages {
  flex: 1;
  overflow-y: auto;
}

.view__input {
  flex-shrink: 0;
  border-top: 1px solid var(--color-border);
}

.view__settings {
  width: 320px;
  background: white;
  border-left: 1px solid var(--color-border);
}

/* Responsive */
@media (max-width: 1024px) {
  .view--chat {
    grid-template-columns: 1fr;
  }

  .view__sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .view__sidebar--open {
    transform: translateX(0);
  }

  .view__settings {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    z-index: 50;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .view__settings--open {
    transform: translateX(0);
  }
}
</style>
```

## Best Practices

### 1. **Compose from Smaller Components**

Break down views into smaller, reusable components.

```vue
<template>
  <div class="view">
    <ViewHeader :title="title" :actions="headerActions" />
    <ViewContent>
      <WidgetGrid :widgets="widgets" />
      <ActionPanel :actions="actions" />
    </ViewContent>
  </div>
</template>
```

### 2. **Use Composables for Business Logic**

Extract complex logic into composables.

```vue
<script setup lang="ts">
import { useDashboard } from '@/composables/useDashboard';
import { useNotifications } from '@/composables/useNotifications';

const { data, isLoading, error, fetchData } = useDashboard();
const { showNotification } = useNotifications();
</script>
```

### 3. **Handle Loading and Error States**

Provide comprehensive loading and error handling.

```vue
<template>
  <div class="view">
    <LoadingOverlay v-if="isLoading" />
    <ErrorBoundary v-else-if="error" :error="error" @retry="fetchData" />
    <div v-else class="view__content">
      <!-- View content -->
    </div>
  </div>
</template>
```

### 4. **Responsive Design**

Ensure views work well on all screen sizes.

```vue
<style scoped>
.view {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .view {
    grid-template-columns: 300px 1fr;
  }
}

@media (min-width: 1024px) {
  .view {
    grid-template-columns: 300px 1fr 300px;
  }
}
</style>
```

### 5. **Clean Up Resources**

Properly clean up subscriptions and listeners.

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

## Common View Patterns

### Dashboard View Pattern

```vue
<!-- DashboardView.vue -->
<template>
  <div class="view view--dashboard">
    <ViewHeader title="Dashboard">
      <template #actions>
        <RefreshButton @click="refresh" />
        <ExportButton @click="exportData" />
      </template>
    </ViewHeader>

    <ViewContent>
      <WidgetGrid>
        <StatsCard :stats="stats" />
        <ActivityFeed :activities="activities" />
        <ChartWidget :data="chartData" />
      </WidgetGrid>

      <QuickActions :actions="quickActions" />
    </ViewContent>
  </div>
</template>
```

### List View Pattern

```vue
<!-- UserListView.vue -->
<template>
  <div class="view view--list">
    <ViewHeader title="Users">
      <template #actions>
        <SearchInput v-model="searchQuery" />
        <FilterDropdown v-model="filter" />
        <CreateButton @click="createUser" />
      </template>
    </ViewHeader>

    <ViewContent>
      <DataTable
        :data="filteredUsers"
        :columns="columns"
        :loading="isLoading"
        @sort="handleSort"
        @select="handleSelect"
      />

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="handlePageChange"
      />
    </ViewContent>

    <UserModal v-if="showModal" :user="selectedUser" @close="closeModal" @save="saveUser" />
  </div>
</template>
```

### Detail View Pattern

```vue
<!-- UserDetailView.vue -->
<template>
  <div class="view view--detail">
    <ViewHeader :title="user?.name">
      <template #breadcrumb>
        <Breadcrumb :items="breadcrumbItems" />
      </template>

      <template #actions>
        <EditButton @click="editUser" />
        <DeleteButton @click="deleteUser" />
      </template>
    </ViewHeader>

    <ViewContent>
      <div class="detail-grid">
        <UserProfile :user="user" />
        <UserActivity :user-id="user?.id" />
        <UserSettings :user="user" />
      </div>
    </ViewContent>

    <UserModal v-if="showModal" :user="user" @close="closeModal" @save="saveUser" />
  </div>
</template>
```

## Testing Views

```vue
<!-- views/__tests__/DashboardView.test.ts -->
import { describe, it, expect, vi } from 'vitest' import { mount } from '@vue/test-utils' import
DashboardView from '../DashboardView.vue' // Mock composables vi.mock('@/composables/useDashboard',
() => ({ useDashboard: () => ({ stats: ref([]), recentActivities: ref([]), chartData: ref([]),
isLoading: ref(false), fetchData: vi.fn() }) })) describe('DashboardView', () => { it('renders
dashboard title', () => { const wrapper = mount(DashboardView)
expect(wrapper.find('.view__title').text()).toBe('Dashboard') }) it('shows loading state', () => {
const wrapper = mount(DashboardView, { global: { provide: { dashboardLoading: true } } })
expect(wrapper.find('.view__loading').exists()).toBe(true) }) it('calls fetchData on mount', () => {
const fetchData = vi.fn() mount(DashboardView, { global: { provide: { fetchData } } })
expect(fetchData).toHaveBeenCalled() }) })
```
