<script lang="ts" setup>
import { useFetchPost } from '@/composables/posts/useFetchPost';
import { watch, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import CreatePostForm from '@/pages/post/CreatePostForm.vue';
import Modal from '@/components/common/Modal.vue';

interface Post {
  id: number;
  title: string;
  tags: string[];
  views: number;
}

// ref
const isOpenModal = ref<boolean>(false)

const router = useRouter();
const route = useRoute();

function getQueryString(q: unknown): string | undefined {
  if (typeof q === 'string') return q;
  if (Array.isArray(q)) return q[0];
  return undefined;
}

// Centralized function to update route queries
const updateRouteQuery = (key: string, value: string | undefined) => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      [key]: value,
    },
  });
};

// Initialize reactive state from current route query
const searchQuery = ref<string | undefined>('');
const timeout = ref<NodeJS.Timeout | null>(null);

// Computed property for limit, leveraging getter/setter for v-model
const limitQuery = computed<string>({
  get() {
    return getQueryString(route.query.limit) ?? '10'; // Default to '10' if not present
  },
  set(newVal: string) {
    updateRouteQuery('limit', newVal);
  },
});

// Watch for changes in searchQuery with debouncing
watch(searchQuery, (newVal) => {
  if (timeout.value) {
    clearTimeout(timeout.value);
  }
  timeout.value = setTimeout(() => {
    // Only update the route if the value has actually changed
    if (getQueryString(route.query.q) !== newVal) {
      updateRouteQuery('q', newVal);
    }
  }, 500);
});

const fetchQueryParams = computed(() => ({
  q: getQueryString(route.query.q),
  limit: getQueryString(route.query.limit) ?? '10'
}));

const { data: postsData, loading, error } = useFetchPost(fetchQueryParams);

// Refined getTableData as a computed property for better reactivity and type safety
const getTableData = computed<Post[]>(() => {
  if (Array.isArray(postsData.value)) return postsData.value

  return [];
});
</script>

<template>
  <div class="p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-screen bg-gray-100 font-sans">
    <div class="container mx-auto">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">My Blog Posts</h1>

      <div class="overflow-x-auto bg-white shadow-xl rounded-lg p-4">
        <div class="my-2 flex justify-end gap-2">
          <button class="p-2 rounded-sm bg-primary text-white cursor-pointer hover:bg-primary-hover"
            @click="isOpenModal = true">create</button>
          <select v-model="limitQuery" class="p-2 rounded-sm outline-1 outline-primary border border-gray-300">
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input v-model="searchQuery" placeholder="Search posts..."
            class="p-2 rounded-sm outline-1 outline-primary border border-gray-300" />
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tl-lg">
                ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tags
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Views
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="4" class="px-6 py-4 text-center text-gray-600">
                <p>Loading posts, please wait...</p>
              </td>
            </tr>
            <tr v-else-if="error">
              <td colspan="4" class="px-6 py-4 text-center text-red-600">
                <p>Error: {{ error.message }}</p>
                <p>Please try again later.</p>
              </td>
            </tr>
            <tr v-else-if="getTableData.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-gray-600">
                <p>No posts found for your search.</p>
              </td>
            </tr>
            <template v-else>
              <tr v-for="(post, index) in getTableData" :key="post.id"
                :class="{ 'bg-gray-50': index % 2 === 1, 'hover:bg-gray-100': index % 2 === 1, 'hover:bg-gray-50': index % 2 === 0, 'transition duration-150 ease-in-out': true }">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ post.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ post.title }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ post?.tags.join(', ') }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ post.views }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <Modal :is-open="isOpenModal" @close="isOpenModal = false">
        <template #header>
          Create New Post
        </template>
        <template #content>
          <CreatePostForm @close="isOpenModal = false" />
        </template>
        <template #footer>
          <div></div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<style scoped></style>