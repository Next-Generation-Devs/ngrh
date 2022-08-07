import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "__test__/setupTests.js",
  },
  resolve: {
    alias: {
      hooks: path.resolve(__dirname, "./src/hooks"),
    },
  },
});
