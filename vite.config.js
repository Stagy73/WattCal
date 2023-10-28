import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "frontend/src/main.jsx",
      external: ["react", "react-dom"], // Add "react" and "react-dom" as external dependencies
    },
    plugins: [react()],
    server: {
      port: 3000,
    },
  },
});
