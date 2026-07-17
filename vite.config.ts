import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  // GitHub Pages 部署在 /StellarStrata/ 子路径下，生产构建时启用该 base
  base: command === 'build' ? '/StellarStrata/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      // data/ 仅存放素材（图片、音频等），不参与构建；
      // 排除监听以避免大文件或下载中的临时文件导致 watcher 崩溃
      ignored: ['**/data/**'],
    },
  },
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths()
  ],
}))
