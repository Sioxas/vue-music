import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
Vue.use(Vuex)
var VueResource = require('vue-resource')
Vue.use(VueResource)

const SINGLE = 0
const SEQUENTIAL = 1
const RANDOM = 2
const store = new Vuex.Store({
  state: {
    playing: true,
    currentTime: 0,
    duration: 0,
    playMode: SEQUENTIAL,
    index: 0,
    coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg?max_age=2592000',
    song: {
      id: '107192078',
      mid: '003OUlho2HcRHC',
      name: '告白气球',
      singer: '周杰伦'
    },
    playList: [{
      id: '107192078',
      mid: '003OUlho2HcRHC',
      name: '告白气球',
      singer: '周杰伦'
    }]
  },
  mutations: {
    playIndex (state, index) {
      state.index = index
      state.song = state.playList[index]
    },
    setPlayList (state, playList) {
      state.playList = playList.list
      state.index = playList.index
      state.song = state.playList[state.index]
    },
    addToPlayList (state, item) {
      state.playList.push(item)
    },
    deleteFromPlayList (state, index) {
      // state.playList.del(index)
      if (isNaN(index) || index >= state.playList.length) {
        return false
      }
      if (index === state.index) {
        state.song = state.playList[state.index + 1]
      } else if (index < state.index) {
        state.index--
      }
      for (var i = 0, n = 0; i < state.playList.length; i++) {
        if (state.playList[i] !== state.playList[index]) {
          state.playList[n++] = state.playList[i]
        }
      }
      state.playList.length -= 1
    },
    addToPlayListAsNextPlay (state, item) {
      state.playList.splice(state.index + 1, 0, item)
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDuration (state, time) {
      state.duration = time
    },
    play (state) {
      state.playing = true
    },
    pause (state) {
      state.playing = false
    },
    playFront (state) {
      state.index = (state.index - 1 + state.playList.length) % state.playList.length
      state.song = state.playList[state.index]
    },
    playNext (state) {
      state.index = (state.index + 1) % state.playList.length
      state.song = state.playList[state.index]
    },
    playContinue (state) {
      switch (state.playMode) {
        case SINGLE:
          break
        case SEQUENTIAL:
          state.index = (state.index + 1) % state.playList.length
          state.song = state.playList[state.index]
          break
        case RANDOM:
          state.index = Math.floor(Math.random() * state.playList.length)
          state.song = state.playList[state.index]
          break
      }
    },
    changePlayMode (state) {
      state.playMode = (state.playMode + 1) % 3
    }
  },
  getters: {
    currentTime: state => {
      return parseInt(state.currentTime / 60) + ':' + (Array(2).join(0) + (state.currentTime % 60)).slice(-2)
    },
    duration: state => {
      return parseInt(state.duration / 60) + ':' + (Array(2).join(0) + (state.duration % 60)).slice(-2)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
