import { defineConfig } from '@lovable.dev/vite-tanstack-config';
import { designTokens } from './src/lib/designTokens';

export default defineConfig({
  tailwind: {
    config: {
      darkMode: 'class',
      theme: {
        extend: {
          colors: designTokens.colors,
          borderRadius: designTokens.radius,
          fontFamily: designTokens.fonts,
        },
      },
    },
  },
});
