/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {},
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        settings: resolve(__dirname, "settings.html"),
      },
    },
  },
});
