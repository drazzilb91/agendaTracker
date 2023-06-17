import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(),
    // {
    //   ...copy({
    //     targets: [
    //       { src: './service-worker.js', dest: 'dist' },
    //     ],
    //     hook: 'writeBundle'
    //   }),
    //   apply: 'build' // this is important, it makes the plugin only apply for build and not for dev
    // }
  ],
  // assetsInclude: ['**/*.png', '**/*.svg', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp', '**/*.ico', '**/*.json', '**/*.webmanifest', '**/*.xml', '**/*.pdf', '**/*.txt', '**/*.md'],
  // publicDir: 'public',
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: './index.html',
      },

    },
  },
})
