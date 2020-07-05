import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import '@/style/index.scss'
import http from './utils/http'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$http = http

Vue.mixin({
    computed: {
        uploadUrl() {
            return this.$http.defaults.baseURL + '/upload'
        }
    },
    methods: {
        getAuthorization() {
            const token = localStorage.getItem('token')
            return {
                Authorization: `Bearer ${token || ''}`
            }
        }
    }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
