<template>
  <div id="app">
    <transition name="play-slide">
      <playing-list v-if="playingListShow"></playing-list>
    </transition>
    <search v-show="!blurBgShow"></search>

    <transition name="play-slide" v-on:after-enter="showBlurBg" v-on:before-leave="hideBlurBg">
      <play v-if="playPageShow"></play>
    </transition>

    <transition name="bar-slide">
      <div id="play-bar" v-show="!playPageShow">
        <audio id="music"
               v-bind:src="playBar.dataUrl"
               autoplay="autoplay"
               v-on:ended="playNext"></audio>
        <div class="play-bar-image-container" @touchstart="showPlayPage" @click="showPlayPage">
          <img class="play-bar-image" v-bind:src="playBar.coverImgUrl">
        </div>
        <p class="play-bar-text" @touchstart="showPlayPage" @click="showPlayPage">{{playBar.name}}</p>
        <img class="play-bar-button"
             v-bind:src="playing?iconPause:iconPlay"
             @touchend="tapButton"
             @click="tapButton">
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from './components/Search'
  import Play from './components/Play'
  import PlayingList from './components/PlayingList'
  import ActionSheet from './components/ActionSheet'

  export default {
    components: {
      Search,
      Play,
      PlayingList,
      ActionSheet
    },
    methods: {
      tapButton: function (event) {
        event.preventDefault()
        this.playing ? this.pause() : this.play()
      },
      play: function () {
        document.getElementById('music').play()
        this.playing = true
      },
      pause: function () {
        document.getElementById('music').pause()
        this.playing = false
      },
      playThis: function (index) {
        this.playBar.index = index
        this.playBar.dataUrl = 'http://stream.qqmusic.tc.qq.com/' + this.playList[index].id + '.mp3'
        this.playBar.name = this.playList[index].name
        this.playBar.singer = this.playList[index].singer
        this.$http.jsonp('http://120.27.93.97/weappserver/get_music_image.php', {
          params: {
            mid: this.playList[index].mid
          },
          jsonp: 'callback'
        }).then((response) => {
          this.playBar.coverImgUrl = response.data.url
        })
//        this.play()
      },
      showPlayPage: function (event) {
        event.preventDefault()
        this.playPageShow = true
      },
      hidePlayPage: function (event) {
        event.preventDefault()
        this.playPageShow = false
      },
      showBlurBg: function () {
        this.blurBgShow = true
      },
      hideBlurBg: function () {
        this.blurBgShow = false
      },
      playNext: function () {
        this.playThis((this.playBar.index + 1) % this.playList.length)
      }
    },
    data () {
      return {
        playing: true,
        playingState: this.$parent.playingState,
        iconPlay: require('./assets/icon-play.png'),
        iconPause: require('./assets/icon-pause.png'),
        playBar: {
          dataUrl: 'http://stream.qqmusic.tc.qq.com/137192078.mp3',
          name: '告白气球',
          singer: '周杰伦',
          coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg?max_age=2592000'
        },
        playList: [],
        playPageShow: false,
        blurBgShow: false,
        playingListShow: false
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html {
    overflow-x: hidden;
    background: #e7e7e7;
  }

  body {
    display: flex;
    overflow-x: hidden;
  }

  #app {
    font-family: '微软雅黑', Source Sans Pro, Helvetica, sans-serif;
    width: 100%;
  }

  #app a {
    color: #42b983;
    text-decoration: none;
  }

  #play-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: -webkit-linear-gradient(top, #f9f9f9, #f3f3f3);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .play-bar-image-container {
    width: 37.5px;
    height: 37.5px;
    padding-left: 15px;
    cursor: pointer;
  }

  .play-bar-image {
    width: 37.5px;
    height: 37.5px;
    border-radius: 5px;
    display: inline-block;
  }

  .play-bar-text {
    flex-grow: 1;
    padding-left: 10px;
    cursor: pointer;
  }

  .play-bar-button {
    width: 20px;
    height: 20px;
    padding-right: 15px;
    cursor: pointer;
  }

  .fade-enter-active {
    transition: all .3s ease;
  }

  .fade-leave-active {
    transition: all .3s ease-out;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .play-slide-enter-active {
    transition: all .3s ease;
  }

  .play-slide-leave-active {
    transition: all .3s ease-out;
  }

  .play-slide-enter, .play-slide-leave-active {
    margin-top: 100vh;
  }

  .bar-slide-enter-active {
    transition: all .3s ease;
  }

  .bar-slide-leave-active {
    transition: all .3s ease-out;
  }

  .bar-slide-enter, .bar-slide-leave-active {
    margin-bottom: -50px;
  }

  @media screen and (min-width: 450px) {
    body {
      width: 450px;
      margin: 0 auto;
    }

    #play-bar {
      width: 450px;
    }
  }

  /*border-1px 部分*/
  .border-1px {
    position: relative;
  }

  .border-1px-after:after {
    border-top: 1px solid #d0d0d0;
    content: ' ';
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
  }

  .border-1px-before:before {
    border-top: 1px solid #d0d0d0;
    content: ' ';
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
  }

  .border-1px:before {
    top: 0;
  }

  .border-1px:after {
    bottom: 0;
  }

  @media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
    .border-1px:after, .border-1px:before {
      -webkit-transform: scaleY(.7);
      -webkit-transform-origin: 0 0;
      transform: scaleY(.7);
    }

    .border-1px:after {
      -webkit-transform-origin: left bottom;
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
    .border-1px:after, .border-1px:before {
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }
  }


</style>
