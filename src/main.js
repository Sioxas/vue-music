import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import App from './App'
import store from './store'
import router from './router'
import {DI4Vue as Provider} from './service/provider'
import {service} from './config/types'

import { MyhttpService } from './service/http.service'
import { NotifyService } from './service/notify.service'
import { PlayerService } from './service/player.service'
import { ApiService } from './service/api.service'

Vue.use(VueResource)
Vue.use(VueLazyload, {
    error: require('./assets/loading.svg'),
    loading: require('./assets/loading.svg'),
    attempt: 1
})

Vue.use(Provider,{
    MyhttpService,
    NotifyService,
    PlayerService,
    ApiService
})

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

console.log(vue)
console.log(vue.$api)
console.log(vue.$api.$notify)
console.log(vue.$api.__name)
console.log(vue.$myhttp.__name)
