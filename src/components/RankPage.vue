<template>
  <div id="rankpage">
    <div class="singer-photo">
      <img v-lazy="imgurl" alt="singerphoto">
    </div>
    <div class="header-bar" :style="{background:background}" :class="{dark:isDark}">
      <div class="back-button" @touchend.prevent="hideSinger" @click="hideSinger">
        <div class="back-icon">
          <img src="../assets/icon-back.svg" v-if="!isDark">
          <img src="../assets/icon-back-white.svg" v-if="isDark">
        </div>
        <div class="back-text">
          排行榜
        </div>
      </div>
    </div>
    <div id="singer-header" class="header border-1px border-1px-after" v-if="topListData!=null">
      <div class="header-blank"></div>
      <div class="header-warp" :style="{background:gradientcolor}">
        <div class="singer-info" :class="{dark:isDark}">
          <h1 class="singer-name">{{topListData.topinfo.ListName}}</h1>
          <p class="singer-fans">{{topListData.topinfo.listennum | listenCount}}</p>
        </div>
        <div class="play-button" @click="play(0)">
          <img src="../assets/icon-play.png">
        </div>
      </div>
    </div>
    <div class="list" :style="{background:color}" v-if="topListData!=null">
      <ul>
        <li class="border-1px border-1px-after" v-for="(item,index) in topListData.songlist" :key="index">
          <div class="music-index" :class="{dark:isDark}">{{index+1}}</div>
          <div class="music-info" @click="play(index)">
            <div class="music-name" :class="{dark:isDark}">
              {{item.data.songorig}}
            </div>
            <div class="music-singer">
              <span v-for="(singername,index) in item.data.singer" :key="index">{{singername.name}}-</span>
              <span>{{item.data.albumname}}</span>
            </div>
          </div>
          <div class="action-button" @touchend.prevent="showMenu(index)" @click="showMenu(index)">
            <img src="../assets/icon-...black.png" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';
import { ApiService } from '@/services/api.service';
import { service } from '@/common/types';
import { TopList } from '@/common/interface';
import { parseColor } from '@/common/utils';

@Component
export default class RankPage extends Vue{
    @Inject(service.API) api!:ApiService;
    topListData:TopList|null = null;
    menuedIndex = 0;
    topid = this.$route.params.id;
    color:string;
    gradientcolor:string;
    isDark:boolean;
    background:string;

    get imgurl() {
        if (this.topListData) {
            return this.topListData.topinfo.pic_album
        }
    }

    constructor(){
        super();
        let {color,gradientcolor,isDark,background} = parseColor();
        this.color = color;
        this.gradientcolor = gradientcolor;
        this.isDark = isDark;
        this.background = background(0);
    }

    created(){
        this.api.getRankSongs(this.topid).subscribe((response:TopList)=>{
            this.topListData = response;
            let {color,gradientcolor,isDark,background} = parseColor(response.color);
            Object.assign(this,{
                color,
                gradientcolor,
                isDark,
                background:background(0),
            });
            const singerHeader = document.getElementById('singer-header');
            window.onscroll = ()=>{
                let opacity:number = 0;
                if(singerHeader){
                    opacity = window.pageYOffset/singerHeader.offsetHeight;
                }
                this.background=background(opacity);
            }
        });
    }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }

  /*border-1px 部分*/
  .border-1px {
    position: relative;
  }

  .border-1px-after:after {
    border-top: 1px solid rgba(255, 255, 255, .15);
    content: ' ';
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
  }

  .border-1px-before:before {
    border-top: 1px solid rgba(255, 255, 255, .15);
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

  #rankpage {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 68vh;
    min-height: 100%;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    background: #fff;
    z-index: 2;
  }

  .singer-photo {
    position: fixed;
    width: 100%;
    max-width: 68vh;
    height: 100vw;
    max-height: 68vh;
  }

  .singer-photo img {
    width: 100%;
    max-width: 68vh;
    height: 100vw;
    max-height: 68vh;
  }

  .header-bar {
    position: fixed;
    top: 0;
    height: 50px;
    width: 100%;
    max-width: 68vh;
    z-index: 2;
  }

  .header-bar .back-button {
    /*    width:25px;*/
    height: 25px;
    margin: 12.5px;
    margin-left: 5px;
    float: left;
    cursor:pointer;
  }

  .header-bar .back-button .back-icon {
    width: 25px;
    height: 25px;
    float: left;
  }

  .header-bar .back-button .back-icon img {
    width: 25px;
  }

  .header-bar .back-button .back-text {
    line-height: 25px;
    float: left;
  }

  .header {
    width: 100%;
    max-width: 68vh;
    height: 100vw;
    max-height: 68vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .header-blank {
    display: flex;
    flex-grow: 1;
  }

  .header-warp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    /*background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0), rgb(135, 112, 101));*/
  }

  .header-warp .play-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #eee;
    background: rgba(255, 255, 255, 0.43);
  }

  .header-warp .play-button img {
    display: inline-block;
    width: 25px;
    height: 25px;
  }

  .list {
    /*background: rgb(135, 112, 101);*/
    z-index: 1;
    padding-bottom: 50px;
  }

  .list .list-title {
    text-align: center;
    line-height: 40px;
  }

  .list ul {
    list-style: none;
    padding-left: 10px;
  }

  .list ul li {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin-left:44px;
    cursor:pointer;
  }

  .list ul li .music-index{
    margin-left: -50px;
    width: 50px;
    text-align: center;
  }

  .list ul li .music-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
  }

  .list ul li .music-info .music-name {
    width: 100%;
    color: #000;
    line-height: 22px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .dark {
    color: #fff !important;
  }

  .list ul li .music-info .music-singer {
    color: #aaa;
    font-size: 14px;
    line-height: 22px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .list ul li .action-button {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }

  .list ul li .action-button img {
    width: 25px;
    height: 25px;
  }

  .list .singer-brief {
    font-size: 14px;
    padding: 10px;
  }
</style>

