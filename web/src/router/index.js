import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: () => import('@/views/Main'),
    children: [
        { path: '/', name: 'home', component: () => import('@/views/Home')},
        { path: '/articles/:id', name: 'article', component: () => import('@/views/Article/articles'), props: true}
    ]
  },
  {
    path: '/heroes/:id',
    name: 'hero',
    component: () => import('@/views/Hero/hero'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
