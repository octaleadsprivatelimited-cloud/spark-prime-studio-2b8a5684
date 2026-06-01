// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { designTokens } from "./src/lib/designTokens";

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brandRed: designTokens.colors.brandRed,
        brandDark: designTokens.colors.brandDark,
        accent: designTokens.colors.accent,
      },
      borderRadius: {
        sm: designTokens.radius.sm,
        md: designTokens.radius.md,
        lg: designTokens.radius.lg,
        xl: designTokens.radius.xl,
      },
      fontFamily: {
        heading: [designTokens.fonts.heading],
        body: [designTokens.fonts.body],
      },
    },
  },
});
