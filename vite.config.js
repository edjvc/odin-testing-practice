/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  // base: '/vanilla-vite-template/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
