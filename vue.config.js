const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //vue.config.js
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer')
          ]
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/api/dsz-api': {
        target: 'https://services.dev.dropshipzone.com.au/', // 实际请求的目标地址
        changeOrigin: true,
        pathRewrite: {
          '^/api/dsz-api': '/api/dsz-api' // 重写请求路径，将以/api开头的路径改为''
        }
      }
    }
  },

})
