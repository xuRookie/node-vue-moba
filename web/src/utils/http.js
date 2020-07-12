import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3300/web/api',
    withCredentials: true,
    timeout: 30000
})

// 请求拦截器
http.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error.response);
});

export default http
