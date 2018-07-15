<template>
  <div class="rank">
    <ul>
      <li class="rank-item" v-for="(item,index) in topList" @click="showRank(item.id)" :key="index">
        <div class="rank-media">
          <img v-lazy="item.picUrl" alt="">
          <span class="listen-count">{{item.listenCount | formatCount}}</span>
        </div>
        <div class="rank-info">
          <p class="rank-title">{{item.topTitle}}</p>
          <p class="rank-songs" v-for="(song,index) in item.songList" :key="index">
            {{index+1}}
            {{song.songname}}
            <span class="rank-singername">-{{song.singername}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';
import { ApiService } from '@/services/api.service';
import { QQMusicResponse, RankList, RankItem } from '@/common/interface';
import { service } from '@/common/types';

@Component
export default class Rank extends Vue{
    @Inject(service.API) api!:ApiService;
    topList:RankItem[]|null = null;
    showRank(id:string) {
        this.$router.push({name: 'rank', params: {id}});
    }
    created(){
        this.api.getRankList().subscribe((response:QQMusicResponse<RankList>)=>{
            this.topList = response.data.topList;
        });
    }
}
</script>

<style scoped>

  .rank {
    width: 100%;
  }

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
    cursor:pointer;
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

</style>
