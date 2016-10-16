<template>
  <div class="album" :class="{'album_slide_toggle':show}">
    <div class="header play-list-page-header">
      <div class="back-button" @touchend.prevent="hideAlbum" @click="hideAlbum">
        <div class="back-icon">
          <img src="../assets/icon-back.svg"></div>
        <div class="back-text">
          专辑
        </div>
      </div>
      <div class="search">
        <img src="../assets/icon-search.png">
      </div>
    </div>

    <div class="play-list-page" v-if="album!=null">
      <img class="blurbg " :src="albumImgUrl">
      <div class="play-list-info  border-1px border-1px-after">
        <div class="play-list-photo">
          <div class="play-button">
            <img src="../assets/icon-play.png">
          </div>
          <img :src="albumImgUrl">
        </div>
        <div class="play-list-text">
          <p class="play-list-name">{{album.name}}</p>
          <p class="play-list-num">{{album.list.length}}首歌曲</p>
        </div>
      </div>

      <div class="m-list">
        <ul>
          <li class="border-1px border-1px-after list-item" v-for="(song,index) in album.list">
            <div class="music-info">
              <p class="music-name">{{song.songname}}</p>
              <p class="music-author" v-for="singer in song.singer">{{singer.name}}</p>
            </div>
            <div class="action-button">
              <img src="../assets/icon-...black.png">
            </div>
          </li>

        </ul>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['show', 'mid'],
    data () {
      return {
        album: null
      }
    },
    components: {},
    methods: {
      hideAlbum: function () {
        this.$emit('hideAlbum')
        this.album = null
      }
    },
    computed: {
      albumImgUrl: function () {
        return 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + this.mid + '.jpg?max_age=2592000'
      }
    },
    watch: {
      mid: function (mid) {
        this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg', {
          params: {
            albummid: mid,
            g_tk: 5381,
//        jsonpCallback:albuminfoCallback,
            loginUin: 0,
            hostUin: 0,
            format: 'jsonp',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
          },
          jsonp: 'jsonpCallback'
        }).then((response) => {
//            console.log(response.data)
          this.album = response.data.data
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-list ul {
    list-style: none;
  }

  .m-list .list-item {
    margin-right: 10px;
    height: 40px;
    padding: 5px 0;
  }

  .m-list .list-item .music-photo {
    width: 40px;
    height: 40px;
    float: left;
  }

  .m-list .list-item .music-photo img {
    width: 40px;
    height: 40px;
  }

  .m-list .list-item .play-list-name {
    height: 40px;
    overflow: hidden;
    width: 100%;
    position: absolute;
  }

  .m-list .list-item .play-list-name p {
    line-height: 40px;
    margin-left: 45px;
    margin-right: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .m-list .list-item .music-info {
    height: 40px;
    overflow: hidden;
    width: 100%;
    position: absolute;
  }

  .m-list .list-item .music-info .music-name {
    line-height: 20px;
    margin-right: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .m-list .list-item .music-info .music-author {
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #8f8f8f;
    font-size: 12px;
    line-height: 20px;
    margin-right: 20px;
    overflow: hidden;
  }

  .m-list .list-item .action-button {
    width: 20px;
    height: 20px;
    float: right;
    padding: 10px 0;
  }

  .m-list .list-item .action-button img {
    width: 20px;
  }

  .album {
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    transform: translate(100%, 0);
    transition: transform .3s;
    background: #fff;
  }

  .album_slide_toggle {
    transform: translate(0, 0);
  }

  .header {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    z-index: 1;
  }

  .header .search {
    width: 30px;
    height: 30px;
    margin: 10px;
    float: right;
  }

  .header .search img {
    width: 30px;
  }

  .header .back-button {
    /*    width:25px;*/
    height: 25px;
    margin: 12.5px;
    margin-left: 5px;
    float: left;
  }

  .header .back-button .back-icon {
    width: 25px;
    height: 25px;
    float: left;
  }

  .header .back-button .back-icon img {
    width: 25px;
  }

  .header .back-button .back-text {
    line-height: 25px;
    float: left;
  }

  .play-list-page {
    padding-left: 15px;
    margin-top: 50px;
    margin-bottom: 75px;
    z-index: 0;
    background: rgba(255, 255, 255, 0.8);
  }

  .play-list-page-header {
    background: rgba(255, 255, 255, 0.8);
  }

  .play-list-page .play-list-info {
    height: 110px;
    position: relative;
    padding-bottom: 10px;
  }

  .play-list-page .play-list-info .play-list-photo {
    position: relative;
    width: 110px;
    float: left;
  }

  .play-list-page .play-list-info .play-list-photo img {
    width: 100%;
  }

  .play-list-page .play-list-info .play-list-photo .play-button {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    bottom: 10px;
    right: 10px;
    box-shadow: 0 0 0 1px #d8d8d8;
  }

  .play-list-page .play-list-info .play-list-photo .play-button img {
    width: 15px;
    margin: 7.5px;
    margin-left: 9px;
  }

  .play-list-page .play-list-info .play-list-text {
    padding-left: 5px;
    float: left;
  }

  .play-list-page .play-list-info .play-list-text .play-list-name {

  }

  .play-list-page .play-list-info .play-list-text .play-list-num {
    line-height: 18px;
    font-size: 12px;
    color: #8f8f8f;
  }

  .play-list-page .play-list-info .button-group {
    position: absolute;
    bottom: 10px;
    right: 0;
  }

  .play-list-page .play-list-info .button-group ul {
    list-style: none;
  }

  .play-list-page .play-list-info .button-group ul li {
    float: left;
    font-size: 12px;
    line-height: 20px;
    color: #ff2d55;
    margin: 0 15px;
  }

  .play-list-page .play-list-info .button-group ul li img {
    height: 20px;
    display: block;

  }

  .play-list-page .blurbg {
    top: 0px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: -1;
    display: block;
    -webkit-filter: blur(30px);
    -moz-filter: blur(30px);
    -ms-filter: blur(30px);
    -o-filter: blur(30px);
    filter: blur(30px);
  }
</style>
