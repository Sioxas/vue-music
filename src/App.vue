<template>
  <div id="app">
    <transition name="fade">
      <search  v-show="!playPageShow"></search>
    </transition>

    <transition name="play-slide">
      <play v-if="playPageShow"></play>
    </transition>

    <transition name="bar-slide">
      <div id="play-bar" v-show="!playPageShow">
        <audio id="music" v-bind:src="playBar.dataUrl" autoplay="autoplay"></audio>
        <div class="play-bar-image-container" @click="playPageShow?hidePlayPage():showPlayPage()">
          <img class="play-bar-image" v-bind:src="playBar.coverImgUrl">
        </div>
        <p class="play-bar-text" @click="playPageShow?hidePlayPage():showPlayPage()">{{playBar.name}}</p>
        <img class="play-bar-button" v-bind:src="playing?iconPause:iconPlay" @click="playing?pause():play()">
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import Search from './components/Search'
  import Play from './components/Play'

  export default {
    components: {
      Search,
      Play
    },
    methods: {
      play: function () {
        document.getElementById('music').play()
        this.playing = true
      },
      pause: function () {
        document.getElementById('music').pause()
        this.playing = false
      },
      playThis: function (res) {
        this.playBar.dataUrl = 'http://stream.qqmusic.tc.qq.com/' + res.id + '.mp3'
        this.playBar.name = res.name
        this.playBar.singer = res.singer
        this.$http.jsonp('http://120.27.93.97/weappserver/get_music_image.php', {
          params: {
            mid: res.mid
          },
          jsonp: 'callback'
        }).then((response) => {
          this.playBar.coverImgUrl = response.data.url
        })
        this.play()
      },
      showPlayPage: function () {
        this.playPageShow = true
        console.log('show')
      },
      hidePlayPage: function () {
        this.playPageShow = false
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
        playPageShow: false
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
    margin-top:100vh;
  }

  .bar-slide-enter-active {
    transition: all .3s ease;
  }
  .bar-slide-leave-active {
    transition: all .3s ease-out;
  }
  .bar-slide-enter, .bar-slide-leave-active {
    margin-bottom:-50px;
  }


  @media screen and (min-width: 450px){
    body {
      width: 450px;
      margin: 0 auto;
    }
    #play-bar{
      width: 450px;
    }
  }


</style>
