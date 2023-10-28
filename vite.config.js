import path from 'path'
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default {
  base: "./", //默认/配置文件的根目录为相对路径
  server: {
    open: false,
    port: 8081,
    host: '0.0.0.0',
    proxy: {
      '/dev-api': {
        target: 'http://192.168.1.10:8091/',
        // target: 'http://192.168.1.5:8091/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
      }
    }
  },
  resolve: {
    // 设置文件快捷路径
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
