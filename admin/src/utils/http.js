import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3300/admin/api'
})

export default http
