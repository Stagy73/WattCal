// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "frontend/src/main.js", // Update the path to match the location of your entry JavaScript file
    },
  },
});
