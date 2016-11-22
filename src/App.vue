<template>
  <div id="app">

    <search v-show="!blurBgShow"
            @searchshow="rankshow=false"
            @searchhide="rankshow=true"></search>
    <rank v-show="rankshow&&!blurBgShow"></rank>
    <transition name="play-slide" v-on:after-enter="showBlurBg" v-on:before-leave="hideBlurBg">
      <play v-if="playPageShow"></play>
    </transition>

    <transition name="bar-slide">
      <div id="play-bar" v-show="!playPageShow">
        <audio id="music"
               v-bind:src="dataUrl"
               autoplay="autoplay"
               @timeupdate="updateTime"
               v-on:ended="playContinue"></audio>
        <div class="play-bar-image-container" @touchstart="showPlayPage" @click="showPlayPage">
          <img class="play-bar-image" v-bind:src="coverImgUrl">
        </div>
        <p class="play-bar-text" @touchstart="showPlayPage" @click="showPlayPage">{{song.name}}</p>
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
  import Rank from './components/Rank'
  import {mapMutations, mapState} from 'vuex'

  export default {
    components: {
      Search,
      Play,
      Rank
    },
    methods: {
      tapButton: function (event) {
        event.preventDefault()
        this.playing ? this.pause() : this.play()
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
      updateTime: function () {
        this.$store.commit('updateCurrentTime', parseInt(document.getElementById('music').currentTime))
        this.$store.commit('updateDuration', parseInt(document.getElementById('music').duration))
      },
      ...mapMutations([
        'play', 'pause', 'playContinue'
      ])
    },
    data () {
      return {
        iconPlay: require('./assets/icon-play.png'),
        iconPause: require('./assets/icon-pause.png'),
        playPageShow: false,
        blurBgShow: false,
        rankshow: true
      }
    },
    computed: {
      ...mapState({
        dataUrl (state) {
          return 'http://ws.stream.qqmusic.qq.com/' + state.song.id + '.m4a?fromtag=46'
        }
      }),
      ...mapState([
        'playing', 'song', 'coverImgUrl'
      ])
    },
    watch: {
      playing: function (val) {
        if (val) {
          document.getElementById('music').play()
        } else {
          document.getElementById('music').pause()
        }
      },
      song: function (song) {
        this.$http.jsonp('http://120.27.93.97/weappserver/get_music_image.php', {
          params: {
            mid: song.mid
          },
          jsonp: 'callback'
        }).then((response) => {
          this.$store.state['coverImgUrl'] = response.data.url
        })
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
    background: #EEEEEE;
  }

  body {
    display: flex;
    overflow-x: hidden;
  }

  #app {
    font-family: Arial, 微软雅黑, "Microsoft yahei", "Hiragino Sans GB", "冬青黑体简体中文 w3", STXihei, 华文细黑, SimSun, 宋体, Heiti, 黑体, sans-serif;
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
    z-index: 2;
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
    /*margin-top: 100vh;*/
    transform: translateY(100vh);
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

  @media screen and (min-width: 68vh) {
    body {
      width: 68vh;
      margin: 0 auto;
    }

    #play-bar {
      width: 68vh;
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
