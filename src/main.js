import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App'
import store from './store'

Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
