import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactScopedCssPlugin } from "rollup-plugin-react-scoped-css";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react(), reactScopedCssPlugin() as any],
  base: "./",
  // Vite에서 Global 세팅을 기본적으로 해주지 않기 때문
  define: {
    global: "window",
  },
});
