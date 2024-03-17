import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/tailwindcss.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false
Vue.config.errorHandler = function (error) {
  console.log(error)
}

Vue.use(ElementUI, {locale})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

