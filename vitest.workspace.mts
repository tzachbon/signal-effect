import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      include: ['src/**/*.test.ts'],
      environment: 'jsdom',
    },
  },
  {
    test: {
      include: ['examples/**/*.test.ts'],
      environment: 'jsdom',
    },
  },
]);
