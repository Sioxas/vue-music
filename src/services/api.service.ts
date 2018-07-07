import { BaseService, Provide } from '@/common/dependency-injection';
import Vue from 'vue';
import { API } from '../config/api';
import { Api } from '../common/interface';
import { HttpResponse } from '../../node_modules/vue-resource/types/vue_resource';

function apiFactory(api: Api, id?: number|string): PromiseLike<HttpResponse> {
    return Vue.http.jsonp(
        api.url,
        {
            params: api.params(id),
            jsonp: api.jsonp,
        },
    )
}

@Provide('ApiService')
export class ApiService extends BaseService {

    /**
     * 获取指定排行榜歌曲
     *
     * @param {number} id 排行榜 id
     * @returns TopList
     * @memberof ApiService
     */
    getRankSongs(id: number) {
        return apiFactory(API.rank_songs, id)
    }


    /**
     * 歌曲排行榜
     *
     * @returns QQMusicResponse<RankList>
     * @memberof ApiService
     */
    getRankList() {
        return apiFactory(API.rank_list)
    }


    /**
     * 专辑
     *
     * @param {number} id
     * @returns QQMusicResponse<AlbumInfo>
     * @memberof ApiService
     */
    getAlbum(id: number) {
        return apiFactory(API.album, id)
    }

    /**
     * 歌手
     *
     * @param {number} id
     * @returns QQMusicResponse<SingerInfo>
     * @memberof ApiService
     */
    getSingerInfo(id: number) {
        return apiFactory(API.singer_info, id)
    }


    /**
     * 搜索结果
     * 
     * @param {string} key
     * @returns QQMusicResponse<SearchResult>
     * @memberof ApiService
     */
    search(key: string) {
        return apiFactory(API.search, key)
    }

    /**
     * 歌曲热搜
     *
     * @returns QQMusicResponse<HotKey>
     * @memberof ApiService
     */
    getHotKey() {
        return apiFactory(API.hotkey)
    }

    /**
     * QQ音乐首页推荐，包括轮播图片、排行榜、电台、MV
     *
     * @returns QQMusicResponse<QQMusicFirstPage>
     * @memberof ApiService
     */
    getRecommands() {
        return apiFactory(API.first_page_data)
    }

    getCdList(id: number) {
        return apiFactory(API.cd, id)
    }

    /**
     * 歌词
     *
     * @param {number} id
     * @returns ILyric
     * @memberof ApiService
     */
    getLyric(id: number) {
        return Vue.http.jsonp('https://api.darlin.me/music/lyric/' + id + '/', {
            jsonp: 'callback',
        })
    }
}
