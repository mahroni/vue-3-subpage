import { apiV1, apiV2, apiV3, apiCall, type ApiResponse } from '../utils/axios';

// Example interfaces for API responses
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// Example API calls using different versions

// API v1 examples
export const userApi = {
  // Get all users
  getUsers: () => apiV1.get<User[]>('/users'),

  // Get user by ID
  getUserById: (id: number) => apiV1.get<User>(`/users/${id}`),

  // Create new user
  createUser: (userData: Omit<User, 'id'>) => apiV1.post<User>('/users', userData),

  // Update user
  updateUser: (id: number, userData: Partial<User>) => apiV1.put<User>(`/users/${id}`, userData),

  // Delete user
  deleteUser: (id: number) => apiV1.delete(`/users/${id}`),
};

// API v2 examples
export const postApi = {
  // Get all posts
  getPosts: () => apiV2.get<Post[]>('/posts'),

  // Get posts by user
  getPostsByUser: (userId: number) => apiV2.get<Post[]>(`/users/${userId}/posts`),

  // Create new post
  createPost: (postData: Omit<Post, 'id'>) => apiV2.post<Post>('/posts', postData),

  // Update post
  updatePost: (id: number, postData: Partial<Post>) => apiV2.put<Post>(`/posts/${id}`, postData),

  // Delete post
  deletePost: (id: number) => apiV2.delete(`/posts/${id}`),
};

// API v3 examples
export const productApi = {
  // Get all products
  getProducts: () => apiV3.get<Product[]>('/products'),

  // Get product by ID
  getProductById: (id: number) => apiV3.get<Product>(`/products/${id}`),

  // Get products by category
  getProductsByCategory: (category: string) =>
    apiV3.get<Product[]>(`/products?category=${category}`),

  // Create new product
  createProduct: (productData: Omit<Product, 'id'>) =>
    apiV3.post<Product>('/products', productData),

  // Update product
  updateProduct: (id: number, productData: Partial<Product>) =>
    apiV3.put<Product>(`/products/${id}`, productData),

  // Delete product
  deleteProduct: (id: number) => apiV3.delete(`/products/${id}`),
};

// Example using the apiCall helper function with proper typing
export const typedApiExamples = {
  // Get users with typed response
  getUsersTyped: async (): Promise<ApiResponse<User[]>> => {
    return apiCall<User[]>(apiV1, {
      method: 'GET',
      url: '/users',
    });
  },

  // Create user with typed response
  createUserTyped: async (userData: Omit<User, 'id'>): Promise<ApiResponse<User>> => {
    return apiCall<User>(apiV1, {
      method: 'POST',
      url: '/users',
      data: userData,
    });
  },
};

// Example usage in Vue components:
/*
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userApi, typedApiExamples } from '@/utils/api-examples'
import type { User } from '@/utils/api-examples'

const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Using direct axios instance
const fetchUsers = async () => {
  try {
    loading.value = true
    const response = await userApi.getUsers()
    users.value = response.data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Using typed helper function
const fetchUsersTyped = async () => {
  const result = await typedApiExamples.getUsersTyped()
  if (result.success) {
    users.value = result.data
  } else {
    error.value = result.error || 'Failed to fetch users'
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
*/
