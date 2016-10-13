import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
Vue.use(Vuex)
var VueResource = require('vue-resource')
Vue.use(VueResource)

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

var music = document.getElementById('music')
music.addEventListener('play', function () {
  vm.playingState.duration = Math.round(music.duration)
}, true)
music.addEventListener('timeupdate', function () {
  vm.playingState.currentTime = Math.round(music.currentTime)
}, true)

// Array.prototype.del = function (index) {
//   if (isNaN(index) || index >= this.length) {
//     return false
//   }
//   for (var i = 0, n = 0; i < this.length; i++) {
//     if (this[i] !== this[index]) {
//       this[n++] = this[i]
//     }
//   }
//   this.length -= 1
// }
const SINGLE = 0
const SEQUENTIAL = 1
const RANDOM = 2
const store = new Vuex.Store({
  state: {
    playingState: {
      playing: true,
      currentTime: 0,
      duration: 0,
      playMode: SEQUENTIAL,
      index: 0
    },
    playList: []
  },
  mutations: {
    setPlayList (state, playList) {
      state.playList = playList
    },
    addToPlayList (state, item) {
      state.playList.push(item)
    },
    deleteFromPlayList (state, index) {
      // state.playList.del(index)
      if (isNaN(index) || index >= state.playList.length) {
        return false
      }
      for (var i = 0, n = 0; i < state.playList.length; i++) {
        if (state.playList[i] !== state.playList[index]) {
          state.playList[n++] = state.playList[i]
        }
      }
      state.playList.length -= 1
    },
    addToPlayListAsNextPlay (state, item) {
      state.playList.splice(state.playingState.index + 1, 0, item)
    },
    updateCurrentTime (state, time) {
      state.playingState.currentTime = time
    },
    updateDuration (state, time) {
      state.playingState.duration = time
    },
    play (state) {
      state.playingState.playing = true
    },
    pause (state) {
      state.playingState.playing = false
    },
    playFront (state) {
      state.playingState.index = (state.playingState.index - 1 + state.playingState.playList.length) % state.playingState.playList.length
    },
    playNext (state) {
      state.playingState.index = (state.playingState.index + 1) % state.playingState.playList.length
    },
    playContinue (state) {
      switch (state.playingState.playMode) {
        case SINGLE:
          break;
        case SEQUENTIAL:
          state.playingState.index = (state.playingState.index + 1) % state.playingState.playList.length
          break;
        case RANDOM:
          state.playingState.index = Math.floor(Math.random() * state.playingState.playList.length)
          break;
      }
    },
    changePlayMode (state) {
      state.playingState.playMode = (state.playingState.playMode + 1) % 3
    }
  },
  getters: {
    currentTime: state => {
      return parseInt(state.playingState.currentTime / 60) + ':' + (Array(2).join(0) + (state.playingState.currentTime % 60)).slice(-2)
    },
    duration: state => {
      return parseInt(state.playingState.duration / 60) + ':' + (Array(2).join(0) + (state.playingState.duration % 60)).slice(-2)
    }
  }
})
