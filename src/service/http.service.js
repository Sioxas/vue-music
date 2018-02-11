 import axios from 'axsio'

 const http = axios.create({
     baseURL: 'http://39.108.190.2:4000',
     withCredentials: true
 })

 export class HttpService{
     constructor(){

     }
 }