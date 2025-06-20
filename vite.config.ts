import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'     
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'QiscusVueApp',
      fileName: 'qiscus-vue-app',
      formats: ['umd', 'es']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  define: {
    'process.env': {},
    'process.browser': true,
    'process.node': false
  }
})
