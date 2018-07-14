<template>
  <div id="search">
    <div class="search">
      <div class="search-input">
        <img src="./../assets/icon-search.png" alt="搜索">
        <form @submit.prevent="search(key)">
          <input type="text"
                 placeholder="搜索 歌曲/专辑/歌手"
                 v-model="key"
                 @focus="focus()">
        </form>
      </div>
      <div class="search-cancel"
           :class="{ 'search-cancel-show' : searchShow }"
           @touchend="searchCancel()"
           @click="searchCancel()">
        取消
      </div>
    </div>
    <div class="hotkey" v-if="searchRes==null&&searchShow">
      <div class="search-history">
        <div class="search-history-item" v-for="(item,index) in searchHistory" @click="search(item)" :key="index">{{item}}</div>
      </div>
      <ul>
        <li v-for="(item,index) in hotkey" @click="search(item.k)" :key="index">
          <span class="hotkey-index">{{index+1}}</span>
          <span class="hotkey-k">{{item.k}}</span>
          <span class="hotkey-n">{{item.n | searchVol}}</span>
        </li>
      </ul>
    </div>
    <div class="result" v-if="searchRes!=null&&searchShow">
      <div class="result-group" v-if="searchRes.song!=null">
        <div class="group">
          <img class="group-img" src="./../assets/icon-music.png">
          <p class="group-p">单曲</p>
        </div>
        <div class="result-item" v-for="(item, index) in searchRes.song.itemlist" :key="index">
          <p class="result-title" @click="play(index)">{{item.name}}</p>
          <p class="result-author" @click="play(index)">-{{item.singer}}</p>
          <div class="action-button" @touchend.prevent="showMenu(index)" @click="showMenu(index)">
            <img src="./../assets/icon-...black.png">
          </div>
        </div>

      </div>

      <div class="result-group" v-if="searchRes.album!=null">
        <div class="group">
          <img class="group-img" src="./../assets/icon-album.png">
          <p class="group-p">专辑</p>
        </div>
        <div class="album-item" v-for="(item,index) in searchRes.album.itemlist" :key="index" @click="showAlbum(item.mid)">
          <img class="album-img" v-lazy="item.pic">
          <div class="album-info">
            <p class="album-name">{{item.name}}</p>
            <p class="album-author">{{item.singer}}</p>
          </div>
        </div>
      </div>

      <div class="result-group" v-if="searchRes.singer!=null">
        <div class="group">
          <img class="group-img" src="./../assets/icon-singer.png">
          <p class="group-p">歌手</p>
        </div>
        <div class="singer-item" v-for="(item,index) in searchRes.singer.itemlist" :key="index" @click="showSinger(item.mid)">
          <img class="singer-img" v-lazy="item.pic">
          <div class="singer-p">
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>

      <div class="result-group" v-if="searchRes.mv!=null">
        <div class="group">
          <img class="group-img" src="./../assets/icon-mv.png">
          <p class="group-p">MV</p>
        </div>
        <div class="mv-item"
             @click="openmv(item.vid)"
             v-for="(item,index) in searchRes.mv.itemlist"
             :key="index">
          <p class="mv-name">{{item.name}}</p>
          <p class="mv-author">{{item.singer}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';
import { ApiService } from '@/services/api.service';
import { QQMusicResponse, SearchResult } from '@/common/interface';
import { PlayService } from '@/services';

@Component
export default class Search extends Vue {
    @Inject('ApiService') api:ApiService;
    @Inject('PlayService') playService:PlayService;
    key = '';
    hotkey = null;
    searchRes:SearchResult = null;
    searchHistory = [];
    searchShow = false;
    menuShow = false;
    menuedIndex = 0;
    menus = {};
    isAlbumShow = false;
    isSingerShow = false;
    mid = 0;
    singermid = 0;

    search(key){
        this.key = key;
        this.api.search(key).subscribe((response:QQMusicResponse<SearchResult>)=>{
            this.searchRes = response.data;
            const index = this.searchHistory.indexOf(key);
            if (index !== -1) {
                this.searchHistory.splice(index, 1);
            }
            this.searchHistory.unshift(key);
            this.searchHistory = this.searchHistory.slice(0, 10);
            localStorage.searchHistory = JSON.stringify(this.searchHistory);
        });
    }

    focus() {
        this.searchShow = true;
        this.$emit('searchshow');
    }

    searchCancel() {
        this.searchShow = false;
        this.key = '';
        this.searchRes = null;
        this.$emit('searchhide');
    }

    play(index:number){
        this.playService.setPlayList({
          index,
          list: this.searchRes.song.itemlist,
        });
    }

    showMenu(num:number){
        // ACTION SHEET
    }

    showAlbum(mid:string) {
        this.$router.push({name: 'album', params: {id: mid}});
    }
    showSinger(singermid:string) {
        this.$router.push({name: 'singer', params: {id: singermid}});
    },
    openmv(vid:string){
        window.open(`https://y.qq.com/portal/mv/v/${vid}.html`);
    }

}
</script>
