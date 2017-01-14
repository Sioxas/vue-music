<template>
  <div class="album">

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
      <img class="blurbg" :src="albumImgUrl">
      <div class="play-list-info  border-1px border-1px-after">
        <div class="play-list-photo">
          <div class="play-button" @click="play(0)">
            <img src="../assets/icon-play.png">
          </div>
          <img v-lazy="albumImgUrl">
        </div>
        <div class="play-list-text">
          <p class="play-list-name">{{album.name}}
            <span class="play-list-num">-{{album.singername}}</span>
          </p>
          <p class="play-list-num">{{album.list.length}}首歌曲</p>
          <p class="play-list-num">{{album.genre}}&nbsp;&nbsp;{{album.lan}}</p>
          <p class="play-list-num">发行时间:{{album.aDate}}</p>
          <p class="play-list-num">唱片公司:{{album.company}}</p>
        </div>
      </div>

      <div class="m-list">
        <ul>
          <li class="border-1px border-1px-after list-item" v-for="(song,index) in album.list">
            <div class="music-info" @click="play(index)">
              <p class="music-name">{{song.songorig}}</p>
              <p class="music-author">
                <span v-for="singer in song.singer">{{singer.name}}</span>
                <span>{{song.albumdesc}}</span>
              </p>
            </div>
            <div class="action-button" @touchend.prevent="showMenu(index)" @click="showMenu(index)">
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
    data () {
      return {
        album: null,
        menuedIndex: 0,
        mid: this.$route.params.id
      }
    },
    methods: {
      hideAlbum: function () {
        this.$router.go(-1)
        this.album = null
      },
      play: function (index) {
        console.log(this.album)
        var list = []
        this.album.list.forEach(item => {
          list.push({
            id: item.songid,
            mid: item.songmid,
            name: item.songorig,
            singer: item.singer,
            albummid:item.albummid
          })
        })
        this.$store.commit('setPlayList', {
          index: index,
          list: list
        })
        this.$store.commit('play')
      },
      showMenu: function (num) {
        this.menuedIndex = num
        let that = this
        this.$store.dispatch('notifyActionSheet', {
          menus: {
            'title.noop': this.album.list[num].songorig + '<br/><span style="color:#666;font-size:12px;">' + this.getSingerStr(this.album.list[num].singer) + '</span>',
            playAsNext: '下一首播放',
            addToPlayList: '添加到播放列表'
          },
          handler: {
            ['cancel'](){
            },
            ['playAsNext'](){
              that.$store.commit('addToPlayListAsNextPlay', {
                id: that.album.list[that.menuedIndex].songid,
                mid: that.album.list[that.menuedIndex].songmid,
                name: that.album.list[that.menuedIndex].songorig,
                singer: that.album.list[that.menuedIndex].singer,
                albummid: that.album.list[that.menuedIndex].albummid
              })
            },
            ['addToPlayList'](){
              that.$store.commit('addToPlayList', {
                id: that.album.list[that.menuedIndex].songid,
                mid: that.album.list[that.menuedIndex].songmid,
                name: that.album.list[that.menuedIndex].songorig,
                singer: that.album.list[that.menuedIndex].singer,
                albummid: that.album.list[that.menuedIndex].albummid
              })
            }
          }
        })
      },
      getSingerStr: val => {
        if (typeof val === 'string') {
          return val
        } else if (val instanceof Array) {
          var singer = ''
          val.forEach(item => {
            singer = singer + item.name + ' '
          })
          return singer
        }
      }
    },
    computed: {
      albumImgUrl: function () {
        return 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + this.mid + '.jpg?max_age=2592000'
      }
    },
    created: function () {
      this.$store.dispatch('getAlbum', this.mid).then((response) => {
        this.album = response.data.data
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-list {
    background: rgba(255, 255, 255, 0.8);
  }

  .m-list ul {
    list-style: none;
  }

  .m-list .list-item {
    /*margin-right: 10px;*/
    padding-left: 15px;
    padding-right: 10px;
    height: 40px;
    padding-top: 5px;
    padding-bottom: 5px;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: row;
    cursor:pointer;
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
    display: flex;
    flex-direction: column;
    flex-grow: 1;
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

  .m-list .list-item .music-info .music-author span {
    margin-right: 5px;
  }

  .m-list .list-item .action-button {
    width: 20px;
    height: 20px;
    padding: 10px 0;
  }

  .m-list .list-item .action-button img {
    width: 20px;
  }

  .album {
    top: 0;
    position: absolute;
    width: 100%;
    max-width: 68vh;
    height: 100%;
    /*transform: translate(100%, 0);*/
    /*transition: transform .3s;*/
    background: #fff;
    z-index: 2;
  }

  .album_slide_toggle {
    transform: none;
  }

  .header {
    width: 100%;
    max-width: 68vh;
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
    cursor:pointer;
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
    /*padding-left: 15px;*/
    margin-top: 50px;
    margin-bottom: 50px;
    z-index: 0;
    /*background: rgba(255, 255, 255, 0.8);*/
  }

  .play-list-page-header {
    background: rgba(255, 255, 255, 0.8);
  }

  .play-list-page .play-list-info {
    height: 110px;
    position: relative;
    padding-bottom: 10px;
    background: rgba(255, 255, 255, 0.8);
    padding-left: 15px;
    display: flex;
    flex-direction: row;
  }

  .play-list-page .play-list-info .play-list-photo {
    position: relative;
    width: 110px;
    height: 110px;
  }

  .play-list-page .play-list-info .play-list-photo img {
    width: 110px;
    height: 110px;
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
    height: 15px;
    margin: 7.5px;
    margin-left: 9px;
  }

  .play-list-page .play-list-info .play-list-text {
    padding-left: 5px;
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

  .blurbg {
    top: 0px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 0;
    display: block;
    -webkit-filter: blur(30px);
    -moz-filter: blur(30px);
    -ms-filter: blur(30px);
    -o-filter: blur(30px);
    filter: blur(30px);
  }
</style>
