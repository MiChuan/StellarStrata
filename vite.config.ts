import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  // GitHub Pages 部署在 /StellarStrata/ 子路径下，由部署工作流通过 VITE_BASE_PATH 注入；
  // Cloudflare Pages 等域根部署则回落到 '/'
  base: command === "build" ? process.env.VITE_BASE_PATH || "/" : "/",
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
  build: {
    // 不输出 sourcemap：减小部署体积，也避免源码随站点公开
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          datepicker: ["react-datepicker"],
        },
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
}));
