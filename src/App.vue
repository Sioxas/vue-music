﻿<template>
  <div id="app">
    <action-sheet></action-sheet>
    <transition :name="routerViewAnimation">
      <router-view v-show="!blurBgShow"></router-view>
    </transition>

    <search v-show="!blurBgShow"
            @searchshow="rankshow=false"
            @searchhide="rankshow=true"></search>
    <div class="content-warper" v-show="rankshow&&!blurBgShow">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item">
          <recommand></recommand>
        </swiper-slide>
        <swiper-slide class="swiper-item">
          <rank></rank>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <transition name="play-slide"
                @after-enter="showBlurBg"
                @before-leave="hideBlurBg"
                @after-leave="routerViewAnimation='page-slide'">
      <play v-show="playPageShow"></play>
    </transition>
    <transition name="play-slide">
      <playing-list v-if="$store.state.NotifyService.playingList.show"></playing-list>
    </transition>

    <transition name="bar-slide">
      <div id="play-bar" v-show="!playPageShow">
        <audio id="music"
               :src="dataUrl"
               @timeupdate="updateTime"
               @ended="playContinue"
               autoplay></audio>
        <div class="play-bar-image-container" @touchstart="showPlayPage" @click="showPlayPage">
          <img class="play-bar-image" v-lazy="coverImgUrl">
        </div>
        <p class="play-bar-text" @touchstart="showPlayPage" @click="showPlayPage">{{song.name}}</p>
        <img class="play-bar-button"
             :src="playing?iconPause:iconPlay"
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
  import Recommand from './components/Recommand'
  import ActionSheet from './components/ActionSheet'
  import PlayingList from './components/PlayingList'

  import {mapMutations, mapState, mapGetters} from 'vuex'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  const TAB_NAME = ['推荐', '排行榜']

  export default {
    components: {
      Search,
      Play,
      Rank,
      Recommand,
      ActionSheet,
      PlayingList,
      swiper,
      swiperSlide
    },
    methods: {
      tapButton(event) {
        event.preventDefault()
        this.playing ? this.pause() : this.play()
      },
      showPlayPage(event) {
        event.preventDefault()
        this.playPageShow = true
      },
      hidePlayPage(event) {
        event.preventDefault()
        this.playPageShow = false
      },
      showBlurBg() {
        this.routerViewAnimation = 'fade'
        this.blurBgShow = true
      },
      hideBlurBg () {
        this.blurBgShow = false
      },
      updateTime() {
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
        rankshow: true,
        routerViewAnimation: 'page-slide',
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          paginationBulletRender(swiper, index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</span>`
            // return '<span class="' + className + ' swiper-pagination-bullet-custom' + '">' + (index + 1) + '</span>';
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'coverImgUrl'
      ]),
      ...mapState({
        dataUrl (state) {
          return 'http://ws.stream.qqmusic.qq.com/' + state.PlayService.song.id + '.m4a?fromtag=46'
        },
        playing: state => state.PlayService.playing,
        song: state => state.PlayService.song
      })
    },
    watch: {
      playing(val) {
        if (val) {
          document.getElementById('music').play()
        } else {
          document.getElementById('music').pause()
        }
      },
      song(song) {
        if (this.$store.state.PlayService.playList.length > 0 && typeof song.albummid === 'undefined') {
          this.$http.jsonp('http://120.27.93.97/weappserver/get_music_info.php', {
            params: {
              mid: song.mid
            },
            jsonp: 'callback'
          }).then((response) => {
            this.$store.commit('setAlbummid', response.data.albummid)
          })
        }
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
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    width: 100%;
    height: 100%;
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

  .page-slide-enter-active {
    transition: all .3s ease;
  }

  .page-slide-leave-active {
    transition: all .3s ease-out;
  }

  .page-slide-enter, .page-slide-leave-active {
    transform: translateX(100%);
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

  @-webkit-keyframes imgFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes imgFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  img[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: imgFadeIn;
    animation-name: imgFadeIn;
  }

  img[lazy=error] {
    border-radius: 2px;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: imgFadeIn;
    animation-name: imgFadeIn;
  }

  .content-warper {
    margin-top: 60px;
  }

  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .swiper-item {
    height: 100%;
  }

  .swiper-pagination-bullet-custom {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    text-align: center;
    line-height: 50px;
    color: #999999;
    border-radius: 0 !important;
    background: #fff !important;
    opacity: 1 !important;
  }

  .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    color: #000;

  }

  .swiper-pagination {
    top: 0;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }


</style>
