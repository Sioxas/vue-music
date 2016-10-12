<template>
  <div id="playing-list">
    <div class="tittle border-1px border-1px-after ">
      <img src="./../assets/icon-xunhuan.png" alt="顺序播放">
      <p class="tittle-text">顺序播放 {{$parent.playList.length}}首歌曲</p>
      <p class="tittle-button" @touchend.prevent="hidePlayList" @click="hidePlayList">完成</p>
    </div>
    <div class="m-list">
      <ul>
        <li class="border-1px border-1px-after list-item" v-for="(item,index) in $parent.playList">
          <div class="music-info">
            <p class="music-name">{{item.name}}</p>
            <p class="music-author">-{{item.singer}}</p>
            <img class="music-playing" src="./../assets/icon-playing.svg" alt="正在播放"
                 v-show="index==$parent.playBar.index">
          </div>
          <div class="action-button" @touchend.prevent="showMenu" @click="showMenu">
            <img src="./../assets/icon-...black.png">
          </div>
        </li>
      </ul>
    </div>
    <actionsheet :show="menuShow" :menus="menus1" @on-click-menu="click" show-cancel></actionsheet>
  </div>
</template>

<script type="text/ecmascript-6">
  import Actionsheet from './../lib/components/Actionsheet'
  export default {
    components: {
      Actionsheet
    },
    data () {
      return {
        menuShow: false,
        menus1: {
          menu1: 'Share to friends',
          menu2: 'Share to timeline'
        }
      }
    },
    methods: {
      hidePlayList: function () {
        this.$parent.playingListShow = false
      },
      showMenu: function () {
        this.menuShow = true
      },
      hideMenu: function () {
        this.menuShow = false
      },
      click (key) {
        console.log(key)
        switch (key) {
          case 'cancel':
            console.log(this.menuShow)
            this.hideMenu()
            console.log(this.menuShow)
            break
          default:
            console.log(key)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #playing-list {
    z-index: 2;
    position: fixed;
    width: 100%;
    background: #fff;
    height: 100%;
  }

  .tittle {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .tittle .tittle-text {
    flex-grow: 1;
  }

  .tittle .tittle-button {
    margin-right: 10px;
  }

  .tittle img {
    width: 25px;
    display: inline-block;
  }

  .tittle p {
    padding-left: 5px;
  }

  .m-list ul {
    list-style: none;
  }

  .m-list .list-item {
    height: 40px;
    padding: 5px 0;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .m-list .list-item .music-info {
    height: 40px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
  }

  .m-list .list-item .music-info .music-name {
    line-height: 20px;
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
    overflow: hidden;
  }

  .m-list .list-item .music-info .music-playing {
    width: 15px;
    height: 15px;
    margin-left: 10px;
  }

  .m-list .list-item .action-button {
    width: 20px;
    height: 20px;
    padding: 10px;
  }

  .m-list .list-item .action-button img {
    width: 20px;
  }

  @media screen and (min-width: 450px) {
    #playing-list {
      width: 450px;
    }
  }


</style>
