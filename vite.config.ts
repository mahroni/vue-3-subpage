import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'QiscusVueApp', 
      fileName: (format) => `qiscus-vue-app.${format}.js`, 
      formats: ['es'] 
    },
    rollupOptions: {
      // *** THIS LINE MUST BE REMOVED OR COMMENTED OUT ***
      // external: ['vue'], 
      output: {
        globals: { 
          vue: 'Vue' 
        },
        inlineDynamicImports: true, 
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.browser': true,
    'process.node': false
  }
})