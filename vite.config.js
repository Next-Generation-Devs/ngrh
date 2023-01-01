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
      // eslint-disable-next-line no-undef
      hooks: path.resolve(__dirname, "./src/hooks"),
      // eslint-disable-next-line no-undef
      types: path.resolve(__dirname, "./src/types"),
    },
  },
});
