<template>
  <div id="play" class="music-play-page">
    <div class="music-album">
      <div class="play-page-hide-btn"  @click="hidePlayPage()">
        <img src="../assets/icon-jiantou.png" alt="">
      </div>
      <img  v-bind:src="$parent.playBar.coverImgUrl">

    </div>
    <div class="button-group">
      <img class="blurbg" v-bind:src="$parent.playBar.coverImgUrl">
      <div class="progress-bar-group">
        <div class="progress-bar">
          <div class="progress"></div>
          <div class="indicater"></div>
        </div>
        <div class="time-indicater">
          <span>1:30</span>
          <span>-3:24</span>
        </div>
      </div>
      <div class="music-info">
        <p class="music-name">{{$parent.playBar.name}}</p>
        <p class="music-author">{{$parent.playBar.singer}}</p>
      </div>
      <div class="music-ctrl">
        <ul>
          <li><img src="../assets/icon-like.png"></li>
          <li><img src="../assets/icon-shangyiqu.png"></li>
          <li><img  v-bind:src="$parent.playing?$parent.iconPause:$parent.iconPlay" @click="$parent.playing?$parent.pause():$parent.play()"></li>
          <li><img src="../assets/icon-xiayiqu.png"></li>
          <li><img src="../assets/icon-list.png"></li>
        </ul>
      </div>
      <div class="volue-bar-group">
        <div class="volue-icon volue-left">
          <img src="../assets/icon-volue-left.png">
        </div>
        <div class="volue-icon volue-right">
          <img src="../assets/icon-volue-right.png">
        </div>
        <div class="volue-bar">
          <div class="volue-line">
            <div class="volue"></div>
          </div>
          <div class="value-indicater"></div>
        </div>
      </div>
      <div class="other-button">
        <ul>
          <li><img src="../assets/icon-share.png"></li>
          <li><img src="../assets/icon-suiji.png"></li>
          <li><img src="../assets/icon-xunhuan.png"></li>
          <li><img src="../assets/icon-...black.png"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['playBar'],
    data () {
      return {}
    },

    methods: {
      hidePlayPage: function () {
        this.$parent.playPageShow = false
      }
    }
  }
</script>

<style scoped>


  .music-play-page {
    width: 100%;
    max-width: 450px;
    height: 100%;
    position: absolute;
    top: 0;
  }

  .music-play-page .music-album {
    width: 100%;
    height: 100vw;
    max-height: 450px;
  }

  .music-play-page .music-album img {
    width: 100%;
    display: block;
    /*    -webkit-filter:blur(100px);*/
  }

  .music-play-page .button-group {
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    top: 100vw;
    background: rgba(255, 255, 255, 0.76);
    overflow: hidden;
  }

  .blurbg {
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

  .music-play-page .button-group .progress-bar-group,
  .music-play-page .button-group .music-info,
  .music-play-page .button-group .music-ctrl,
  .music-play-page .button-group .volue-bar-group,
  .music-play-page .button-group .other-button {
    height: 20%;
    min-height: 35px;
  }

  .music-play-page .button-group .progress-bar-group .progress-bar {
    height: 4px;
    background: #cccccc;
    position: relative;
  }

  .music-play-page .button-group .progress-bar-group .progress-bar .progress {
    height: 100%;
    background: #7f7f7f;
    width: 20%;
  }

  .music-play-page .button-group .progress-bar-group .progress-bar .indicater {
    position: absolute;
    width: 2px;
    height: 12px;
    background: #ff2d55;
    top: 0;
    left: 20%;
  }

  .music-play-page .button-group .progress-bar-group .time-indicater {
    margin-top: 8px;
    line-height: 16px;
    font-size: 12px;
  }

  .music-play-page .button-group .progress-bar-group .time-indicater span {
    padding: 0 10px;
  }

  .music-play-page .button-group .progress-bar-group .time-indicater span:last-child {
    float: right;
  }

  .music-play-page .button-group .music-info .music-name {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }

  .music-play-page .button-group .music-info .music-author {
    text-align: center;
    font-size: 12px;
    color: #8f8f8f;
  }

  .music-play-page .button-group .music-ctrl ul {
    height: 100%;
    width: 100%;
    list-style: none;
  }

  .music-play-page .button-group .music-ctrl ul li {
    float: left;
    width: 20%;
    height: 100%;
  }

  .music-play-page .button-group .music-ctrl ul li img {
    display: block;
    width: 35px;
    margin: 0 auto;
  }

  .music-play-page .button-group .music-ctrl ul li:first-child img {
    margin-left: 10px;
  }

  .music-play-page .button-group .music-ctrl ul li:last-child img {
    margin-right: 10px;
  }

  .music-play-page .button-group .volue-bar-group {

  }

  .music-play-page .button-group .volue-bar-group .volue-bar {
    width: 70%;
    height: 100%;
    margin: 0px auto;
    position: relative;
  }

  .music-play-page .button-group .volue-bar-group .volue-bar .volue-line {
    width: 100%;
    height: 3px;
    background: #cccccc;
    position: absolute;
    top: 50%;
    margin-top: -1.5px;
  }

  .music-play-page .button-group .volue-bar-group .volue-bar .volue-line .volue {
    height: 100%;
    width: 20%;
    background: #7f7f7f;
  }

  .music-play-page .button-group .volue-bar-group .volue-bar .value-indicater {
    position: absolute;
    height: 15px;
    width: 15px;
    border: 1px solid rgba(185, 185, 185, 0.4);
    border-radius: 50%;
    margin-top: -7.5px;
    margin-left: -7.5px;
    top: 50%;
    left: 20%;
    background: #fff;
    box-shadow: 0 2px 2px 0 #8f8f8f;
  }

  .music-play-page .button-group .volue-bar-group .volue-icon {
    width: 15%;
    height: 100%;
    position: relative;
  }

  .music-play-page .button-group .volue-bar-group .volue-icon img {
    width: 20px;
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -10px;
  }

  .music-play-page .button-group .volue-bar-group .volue-left {
    float: left;
  }

  .music-play-page .button-group .volue-bar-group .volue-right {

    float: right;
  }

  .music-play-page .button-group .volue-bar-group .volue-left img {
    right: 0;
  }

  .music-play-page .button-group .other-button ul {
    height: 100%;
    width: 100%;
    list-style: none;
  }

  .music-play-page .button-group .other-button ul li {
    float: left;
    width: 25%;
    height: 100%;
    position: relative;
  }

  .music-play-page .button-group .other-button ul li img {
    display: block;
    width: 20px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin-left: -10px;
  }

  .music-play-page .music-album .play-page-hide-btn{
    width:25px;
    height:25px;
    top: 27px;
    left: 11px;
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .music-play-page .music-album .play-page-hide-btn img{
    width:12px;
    height:12px;
    display: inline-block;
  }

  @media screen and (min-width:450px){
    .music-play-page .music-album{
      height:450px;
    }

    .music-play-page .button-group{
      top:450px;
      width:450px;
      margin:0 auto;
      margin-left:-225px;
      left:50%;
    }
  }
</style>
