/* eslint-disable */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './public',
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './main'),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/posts': 'http://localhost:3000',
      '/posts/:id_user': 'http://localhost:3000',
      '/users': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/DolphinFeed': 'http://localhost:3000',
      '/DataUsers': 'http://localhost:3000',
      '/DataMess': 'http://localhost:3000',
      '/DataMessToday': 'http://localhost:3000',
      '/top': 'http://localhost:3000',
      '/blog': 'http://localhost:3000',
      '/feedUser': 'http://localhost:3000',
      '/userInfo': 'http://localhost:3000',
      '/settingsOldPassword': 'http://localhost:3000',
      '/settingsNewPassword': 'http://localhost:3000',
      '/settingsEmail': 'http://localhost:3000',
    },
  },
});
