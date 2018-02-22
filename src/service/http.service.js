 import axios from 'axios'
 export const HttpService = axios.create({
     baseURL: '/api',
     withCredentials: true
 })

