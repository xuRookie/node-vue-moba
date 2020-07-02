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
            path: 'categories/list',
            name: 'CategoryList',
            component: () => import('@/views/Category/CategoryList')
        },
        {
            path: 'categories/create',
            name: 'CategoryCreate',
            component: () => import('@/views/Category/CategoryEdit')
        },
        {
            path: 'categories/edit/:id',
            name: 'CategoryEdit',
            component: () => import('@/views/Category/CategoryEdit'),
            props: true
        },
        {
            path: 'items/list',
            name: 'CategoryList',
            component: () => import('@/views/Item/ItemList')
        },
        {
            path: 'items/create',
            name: 'ItemCreate',
            component: () => import('@/views/Item/ItemEdit')
        },
        {
            path: 'items/edit/:id',
            name: 'ItemEdit',
            component: () => import('@/views/Item/ItemEdit'),
            props: true
        }
    ]
  }
]

const router = new VueRouter({
  routes
})

// Vue 路由重复报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router
