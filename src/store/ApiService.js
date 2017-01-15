/**
 * Created by sioxa on 2016/12/25 0025.
 */
import Vue from 'vue'

import API from '../config/api'

function apiFactory(api) {
  return (id = null) => Vue.http.jsonp(
    api.url,
    {
      params: api.params(id),
      jsonp: api.jsonp
    }
  )
}

export default {
  actions: {
    getRankSongs({}, id){
      return apiFactory(API.rank_songs)(id)
    },
    getRankList({}){
      return apiFactory(API.rank_list)()
    },
    getAlbum({}, id){
      return apiFactory(API.album)(id)
    },
    getSingerInfo({}, id){
      return apiFactory(API.singer_info)(id)
    },
    search({}, key){
      return apiFactory(API.search)(key)
    },
    getHotKey({}){
      return apiFactory(API.hotkey)()
    },
    getRecommands({}){
      return apiFactory(API.first_page_data)()
    },
    getCdList({},id){
      return apiFactory(API.cd)(id)
    },
    getLyric({},id){
      return Vue.http.jsonp('https://api.darlin.me/music/lyric/'+id+'/',{
        jsonp:'callback'
      })
    }
  }
}
