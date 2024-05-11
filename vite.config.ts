import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  base: "./",
  // Vite에서 Global 세팅을 기본적으로 해주지 않기 때문
  define: {
    global: "window",
  },
});
