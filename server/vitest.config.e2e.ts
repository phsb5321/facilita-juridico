import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./tests/e2e/**/*.test.ts"],
    globals: true,
    root: "./",
  },
  resolve: {
    alias: {
      "@": "./src/",
      "@test": "./tests/",
    },
  },
  plugins: [swc.vite()],
});
