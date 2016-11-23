<template>
  <div class="rank">
    <ul>
      <li class="rank-item" v-for="item in topList" @click="showRank(item.id)">
        <div class="rank-media">
          <img :src="item.picUrl" alt="">
          <span class="listen-count">{{item.listenCount | listenCount}}</span>
        </div>
        <div class="rank-info">
          <p class="rank-title">{{item.topTitle}}</p>
          <p class="rank-songs" v-for="(song,index) in item.songList">
            {{index+1}}
            {{song.songname}}
            <span class="rank-singername">-{{song.singername}}</span>
          </p>
        </div>
      </li>
    </ul>
    <transition name="page-slide">
      <rank-page @hideRank="hideRank" :topid="topid" v-if="isRankShow"></rank-page>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import RankPage from './RankPage'
  export default {
    data () {
      return {
        topList: null,
        topid: null,
        isRankShow: false,
      }
    },
    components: {RankPage},
    methods: {
      showRank:function(id){
        this.topid=id
        this.isRankShow = true
      },
      hideRank: function () {
        this.isRankShow = false
      }
    },
    created: function () {
      this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
        params: {
          format: 'jsonp',
          g_tk: 5381,
          uin: 0,
          format: 'jsonp',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          _: new Date().getTime()
        },
        jsonp: 'jsonpCallback'
      }).then((response) => {
        this.topList = response.data.data.topList
      })
    },
    filters: {
      listenCount: num=> {
        return Math.round(num / 1000) / 10 + '万'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .rank ul {
    margin-top: 60px;
    padding: 10px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  .rank-item {
    display: flex;
    flex-direction: row;
    height: 100px;
    background: #fff;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #DDD;
    border-radius: 5px;
    overflow: hidden;
  }

  .rank-item .rank-media {
    width: 100px;
    height: 100px;
    position: relative;
  }

  .rank-item .rank-media img {
    width: 100px;
    height: 100px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    z-index: 0;
  }

  .rank-item .rank-media .listen-count {
    position: absolute;
    bottom: 3px;
    left: 5px;
    color: #fff;
    font-size: 12px;
  }

  .rank-item .rank-info {
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }

  .rank-item .rank-info .rank-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .rank-item .rank-info .rank-songs {
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .rank-item .rank-info .rank-singername {
    color: #8f8f8f;
  }

  .page-slide-enter-active {
    transition: all .3s ease;
  }

  .page-slide-leave-active {
    transition: all .3s ease-out;
  }

  .page-slide-enter, .page-slide-leave-active {
    /*margin-left: 100%;*/
    transform: translateX(100%);
  }
</style>
