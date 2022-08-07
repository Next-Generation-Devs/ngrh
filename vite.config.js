import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "__test__/setupTests.js",
  },
});
