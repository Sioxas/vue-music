<template>
  <div id="search">
    <div class="search">
      <div class="search-input">
        <img src="./../assets/icon-search.png" alt="搜索">
        <input type="text" placeholder="搜索 歌曲/专辑/歌手" v-model="key">
      </div>
    </div>
    <div class="result" v-if="searchRes!=null">
      <div class="result-group" v-if="searchRes.song!=null">
        <div class="group">
          <img class="group-img" src="./../assets/icon-music.png">
          <p class="group-p">单曲</p>
        </div>
        <div class="result-item" v-for="(item, index) in searchRes.song.itemlist" v-on:click="play(index)">
          <p class="result-title">{{item.name}}</p>
          <p class="result-author">-{{item.singer}}</p>
        </div>

      </div>

      <div class="result-group" v-if="searchRes.album!=null">
        <div class="group">
          <img class="group-img" src="./../assets/icon-album.png">
          <p class="group-p">专辑</p>
        </div>
        <div class="album-item" v-for="item in searchRes.album.itemlist">
          <img class="album-img" v-bind:src="item.pic">
          <div class="album-info">
            <p class="album-name">{{item.name}}</p>
            <p class="album-author">{{item.singer}}</p>
          </div>
        </div>
      </div>

      <div class="result-group" v-if="searchRes.singer!=null">
        <div class="group">
          <img class="group-img" src="./../assets/icon-singer.png">
          <p class="group-p">歌手</p>
        </div>
        <div class="singer-item" v-for="item in searchRes.singer.itemlist">
          <img class="singer-img" v-bind:src="item.pic">
          <div class="singer-p">
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>

      <div class="result-group" v-if="searchRes.mv!=null">
        <div class="group">
          <img class="group-img" src="./../assets/icon-mv.png">
          <p class="group-p">MV</p>
        </div>
        <div class="mv-item" v-for="item in searchRes.mv.itemlist">
          <p class="mv-name">{{item.name}}</p>
          <p class="mv-author">{{item.singer}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      play: function (index) {
        this.$parent.playList = this.searchRes.song.itemlist
        this.$parent.playThis(index)
      }
    },
    watch: {
      'key': {
        handler: function (key) {
          this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', {
            params: {
              is_xml: 0,
              format: 'jsonp',
              key: key,
              g_tk: 5381,
//              jsonpCallback: 'SmartboxKeysCallbackmod',
              loginUin: 0,
              hostUin: 0,
              inCharset: 'utf8',
              outCharset: 'utf-8',
              notice: 0,
              platform: 'yqq',
              needNewCode: 0
            },
            jsonp: 'jsonpCallback'
          }).then((response) => {
//            console.log(response.data)
            this.searchRes = response.data.data
          })
        },
        deep: true
      }
    },
    data () {
      return {
        key: '',
        searchRes: {}
      }
    }
  }
</script>

<style scoped>


  .search {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    background: #fff;
  }

  .search-input {
    width: 100%;
    background: #eee;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .search-input img {
    height: 30px;
    width: 30px;
    display: inline-block;
    margin: 0 5px;
  }

  .search-input input {
    height: 100%;
    border: none;
    background: #eee;
    font-size: medium;
    flex-grow: 1;
    border-radius: 5px;
  }

  .result {
    margin-top: 60px;
    margin-bottom: 50px;
    background: #eeeeee;
    display: flex;
    flex-direction: column;
  }

  .result-group {
    background: #ffffff;
  }

  .group {
    display: flex;
    flex-direction: row;
    height: 40px;
    align-items: flex-end;
    padding-bottom: 5px;
    padding-left: 10px;
    background: #eeeeee;
  }

  .group-img {
    width: 25px;
    height: 25px;
  }

  .group-p {
    margin-left: 10px;
  }

  .result-item {
    display: flex;
    background: #ffffff;
    border-bottom: 1px #eeeeee solid;
    flex-direction: row;
    margin-left: 10px;
    padding-left: 10px;
    height: 40px;
    align-items: center;
  }

  .result-author {
    color: #929292;
  }

  .album-item {
    height: 40px;
    display: flex;
    flex-direction: row;
    border-bottom: #eeeeee 1px solid;
    padding: 10px 10px;
    align-items: center;
  }

  .album-img {
    height: 40px;
    width: 40px;
    border-radius: 5px;
  }

  .album-info {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }

  .album-name {
    font-size: 14px;
    line-height: 20px;
  }

  .album-author {
    font-size: 12px;
    color: #929292;
    line-height: 20px;
  }

  .songs-action-button {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  .singer-item {
    height: 40px;
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
    align-items: center;
  }

  .singer-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .singer-p {
    display: flex;
    border-bottom: 1px #eeeeee solid;
    height: 40px;
    align-items: center;
    padding: 3px 10px;
    flex-grow: 1;
  }

  .mv-item {
    display: flex;
    flex-direction: column;
    border-bottom: #eeeeee 1px solid;
    padding: 10px;
  }

  .mv-name {
    font-size: 14px;
    line-height: 20px;
  }

  .mv-author {
    font-size: 12px;
    color: #929292;
    line-height: 20px;
  }

  @media screen and (min-width: 450px) {
    .search {
      width: 450px;
    }
  }


</style>
