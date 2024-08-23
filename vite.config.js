import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  devServer: {
    // disableHostCheck: true
  },
  server: {
    proxy: {
      '/qq-login': {
        target: 'https://xui.ptlogin2.qq.com', // 目标接口的基础路径
        changeOrigin: true, // 控制服务器接收到的请求头中的host字段的值
        rewrite: path => path.replace(/^\/qq-login/, '/cgi-bin/xlogin') // 重写接口路径
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
