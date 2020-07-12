import axios from 'axios'
import router from '../router'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL ||'/admin/api',
    // baseURL: 'http://localhost:3300/admin/api',
    withCredentials: true,
    timeout: 30000
})

// 请求拦截器
http.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    const response = error.response
    if (response.status == 401) {
        router.push('/login')
    }
    return Promise.reject(error.response);
});

export default http
