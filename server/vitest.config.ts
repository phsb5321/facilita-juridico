import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./tests/unit/**/*.test.ts"],
    globals: true,
    root: ".",
  },
  resolve: {
    alias: {
      "@": "./src/",
      "@test": "./tests/",
    },
  },
  plugins: [swc.vite()],
});
