import Vue from 'vue'
import Router from 'vue-router'
import CategoryProducts from '@/views/CategoryProducts'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'CategoryProducts',
            component: CategoryProducts
        }
    ]
})
