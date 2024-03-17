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
    proxy: 'https://services.dev.dropshipzone.com.au/api/dsz-api'
  }

})
