import Vue from 'vue'
import App from './App'
var VueResource = require('vue-resource')
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
