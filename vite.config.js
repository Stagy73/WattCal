import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "frontend/src/main.jsx", // Update to the correct entry point
    },
  },
  // Other configuration options...
});
