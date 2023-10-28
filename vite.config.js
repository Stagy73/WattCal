import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "frontend/src/main.jsx", // Update to main.jsx
      external: ["react"], // Add "react" as an external dependency
    },
  },
});
