/**
 * Created by sioxa on 2016/12/25 0025.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import PlayService from './PlayService'
import ApiService from './ApiService'
import NotifyService from './NotifyService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    PlayService,
    ApiService,
    NotifyService
  }
})

