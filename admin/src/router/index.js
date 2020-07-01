import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main'),
    children: [
        {
            path: 'categories/create',
            name: 'CategoryCreate',
            component: () => import('@/views/Category/CategoryEdit')
        }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
