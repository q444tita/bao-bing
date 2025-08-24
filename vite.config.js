import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 使用更稳定的文件命名，避免每次构建都改变文件名
        // 使用时间戳作为文件后缀
        assetFileNames: `assets/[name]-[hash]-${Date.now()}.[ext]`,
        chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`
      },
    },
  },
});
