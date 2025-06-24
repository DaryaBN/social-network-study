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
      '/feedUser': 'http://localhost:3000',
      '/userInfo': 'http://localhost:3000',
      '/settingsOldPassword': 'http://localhost:3000',
      '/settingsNewPassword': 'http://localhost:3000',
      '/settingsEmail': 'http://localhost:3000',
      '/UserPosts': 'http://localhost:3000',
      '/NumberUserPosts': 'http://localhost:3000',
      '/someUserPost': 'http://localhost:3000',
      '/someUserInfo': 'http://localhost:3000',
      '/someNumberUserPosts': 'http://localhost:3000',
      '/subscription': 'http://localhost:3000',
      '/subscriptionNow': 'http://localhost:3000',
      '/newsFeed': 'http://localhost:3000',
      '/userFollowers': 'http://localhost:3000',
      '/userFollowing': 'http://localhost:3000',
      '/someUserFollowers': 'http://localhost:3000',
      '/someUserFollowing': 'http://localhost:3000',
      '/recommendations': 'http://localhost:3000',
      '/hashtagWords': 'http://localhost:3000',
      '/hashtagPosts': 'http://localhost:3000',
      '/myId': 'http://localhost:3000',
    },
  },
});
