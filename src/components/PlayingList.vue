<template>
  <div id="playing-list">
    <div class="tittle border-1px border-1px-after ">
      <img :src="buttonImage" :alt="playModeName" @click="changePlayMode">
      <p class="tittle-text">{{playModeName}} {{playList.length}}首歌曲</p>
      <p class="tittle-button" @touchend.prevent="hidePlayList" @click="hidePlayList">完成</p>
    </div>
    <div class="m-list">
      <ul>
        <li class="border-1px border-1px-after list-item" v-for="(item,num) in playList">
          <div class="music-info" @click="play(num)">
            <p class="music-name">{{item.name}}</p>
            <p class="music-author">-{{item.singer | singer}}</p>
            <img class="music-playing" src="./../assets/icon-playing.svg" alt="正在播放"
                 v-show="index==num">
          </div>
          <div class="action-button" @touchend.prevent="showMenu(num)" @click="showMenu(num)">
            <img src="./../assets/icon-...black.png">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import * as def from './../config/def'
  export default {
    data () {
      return {
        menuedIndex: 0,
      }
    },
    methods: {
      play: function (index) {
        this.$store.commit('playIndex', index)
      },
      hidePlayList: function () {
        this.$store.commit('closePlayingList')
      },
      showMenu: function (num) {
        this.menuedIndex = num
        let that = this
        this.$store.dispatch('notifyActionSheet', {
            menus:{
              'title.noop': this.playList[num].name + '<br/><span style="color:#666;font-size:12px;">' + this.getSingerStr(this.playList[num].singer) + '</span>',
              delete: '删除'
            },
          handler:{
            ['cancel'](){
            },
            ['delete'](){
              that.$store.commit('deleteFromPlayList', that.menuedIndex)
            }
          }
        })
      },
      getSingerStr: val => {
        if (typeof val === 'string') {
          return val
        } else if (val instanceof Array) {
          let singer = ''
          val.forEach(item => {
            singer = singer + item.name + ' '
          })
          return singer
        }
      },
      ...mapMutations(['changePlayMode'])
    },
    computed: {
      buttonImage: function () {
        return def.PLAY_MODE_IMG[this.playMode]
      },
      playModeName:function(){
        return def.PLAY_MODE_NAME[this.playMode]
      },
      ...mapState({
        playList: state=>state.PlayService.playList,
        playMode: state=>state.PlayService.playMode,
        index: state=>state.PlayService.index
      })
    },
    filters: {
      singer: val => {
        if (typeof val === 'string') {
          return val
        } else if (val instanceof Array) {
          let singer = ''
          val.forEach(item => {
            singer = singer + item.name + ' '
          })
          return singer
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #playing-list {
    z-index: 10;
    position: absolute;
    width: 100%;
    min-height: 100%;
    background: #fff;
  }

  .tittle {
    position: fixed;
    height: 50px;
    display: flex;
    align-items: center;
    background: #fff;
    width: 100%;
    max-width: 68vh;
    z-index: 3;
  }

  .tittle .tittle-text {
    flex-grow: 1;
  }

  .tittle .tittle-button {
    margin-right: 10px;
    cursor: pointer;
  }

  .tittle img {
    width: 25px;
    display: inline-block;
    cursor: pointer;
    padding-left: 10px;
  }

  .tittle p {
    padding-left: 5px;
  }

  .m-list {
    margin-top: 50px;
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
    cursor: pointer;
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

  @media screen and (min-width: 68vh) {
    #playing-list {
      width: 68vh;
    }
  }


</style>
