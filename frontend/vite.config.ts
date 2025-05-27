import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   test: {
      globals: true,
      environment: 'jsdom',
   },
   resolve: {
      alias: {
         '@src': path.resolve(__dirname, 'src'),
         '@shared': path.resolve(__dirname, '../shared'),
         '@components': path.resolve(__dirname, 'src/components'),
      },
   },
   server: {
      proxy: {
         '/leetcode-api': {
            target: 'https://leetcode.com',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/leetcode-api/, ''),
         },
         '/atcoder-api': {
            target: 'https://atcoder.jp',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/atcoder-api/, ''),
         },
      },
   },
});
