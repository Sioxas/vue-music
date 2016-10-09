import Vue from 'vue'
import App from './App'
var VueResource = require('vue-resource')
Vue.use(VueResource)

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    playingState: {
      currentTime: 0,
      duration: 0
    }
  }
})

var music = document.getElementById('music')
music.addEventListener('play', function () {
  vm.playingState.duration = Math.round(music.duration)
}, true)
music.addEventListener('timeupdate', function () {
  vm.playingState.currentTime = Math.round(music.currentTime)
}, true)
