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
            name: 'ItemList',
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
        },
        {
            path: 'heroes/list',
            name: 'HeroList',
            component: () => import('@/views/Hero/HeroList')
        },
        {
            path: 'heroes/create',
            name: 'HeroCreate',
            component: () => import('@/views/Hero/HeroEdit')
        },
        {
            path: 'heroes/edit/:id',
            name: 'HeroEdit',
            component: () => import('@/views/Hero/HeroEdit'),
            props: true
        },
        {
            path: 'articles/list',
            name: 'ArticleList',
            component: () => import('@/views/Article/ArticleList')
        },
        {
            path: 'articles/create',
            name: 'ArticleCreate',
            component: () => import('@/views/Article/ArticleEdit')
        },
        {
            path: 'articles/edit/:id',
            name: 'ArticleEdit',
            component: () => import('@/views/Article/ArticleEdit'),
            props: true
        },
        {
            path: 'ads/list',
            name: 'ArticleList',
            component: () => import('@/views/Advert/AdvertList')
        },
        {
            path: 'ads/create',
            name: 'AdvertCreate',
            component: () => import('@/views/Advert/AdvertEdit')
        },
        {
            path: 'ads/edit/:id',
            name: 'AdvertEdit',
            component: () => import('@/views/Advert/AdvertEdit'),
            props: true
        }
    ]
  },
  {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/login')
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
