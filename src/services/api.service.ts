import { BaseService, Provide } from '@/common/dependency-injection';
import Vue from 'vue';
import {Observable,Observer, observable} from 'rxjs';
import { HttpResponse } from '../../node_modules/vue-resource/types/vue_resource';
import { API } from '../config/api';
import { Api, TopList, QQMusicResponse, RankList, AlbumInfo, SingerInfo, SearchResult, HotKey, QQMusicFirstPage, Lyric } from '../common/interface';

function jsonpFactory<T>(url:string,jsonp:string,params?:any):Observable<T>{
    return new Observable<T>((observer:Observer<T>)=>{
        let p = {jsonp};
        if(params){
            p = Object.assign(p,{params});
        }
        Vue.http.jsonp(url,p).then((response:HttpResponse)=>{
            observer.next(response.data);
            observer.complete();
        },(error:any)=>{
            observer.error(error);
            observer.complete();
        });
    });
}

function apiFactory<T>(api: Api, id?: number|string): Observable<T> {
    return jsonpFactory<T>(api.url,api.jsonp,api.params(id));
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
    getRankSongs(id: number):Observable<TopList> {
        return apiFactory<TopList>(API.rank_songs, id);
    }

    /**
     * 歌曲排行榜
     *
     * @returns QQMusicResponse<RankList>
     * @memberof ApiService
     */
    getRankList():Observable<QQMusicResponse<RankList>> {
        return apiFactory<QQMusicResponse<RankList>>(API.rank_list);
    }

    /**
     * 专辑
     *
     * @param {number} id
     * @returns QQMusicResponse<AlbumInfo>
     * @memberof ApiService
     */
    getAlbum(id: number):Observable<QQMusicResponse<AlbumInfo>> {
        return apiFactory<QQMusicResponse<AlbumInfo>>(API.album, id);
    }

    /**
     * 歌手
     *
     * @param {number} id
     * @returns QQMusicResponse<SingerInfo>
     * @memberof ApiService
     */
    getSingerInfo(id: number):Observable<QQMusicResponse<SingerInfo>> {
        return apiFactory<QQMusicResponse<SingerInfo>>(API.singer_info, id);
    }

    /**
     * 搜索结果
     *
     * @param {string} key
     * @returns QQMusicResponse<SearchResult>
     * @memberof ApiService
     */
    search(key: string):Observable<QQMusicResponse<SearchResult>> {
        return apiFactory<QQMusicResponse<SearchResult>>(API.search, key);
    }

    /**
     * 歌曲热搜
     *
     * @returns QQMusicResponse<HotKey>
     * @memberof ApiService
     */
    getHotKey():Observable<QQMusicResponse<HotKey>> {
        return apiFactory<QQMusicResponse<HotKey>>(API.hotkey);
    }

    /**
     * QQ音乐首页推荐，包括轮播图片、排行榜、电台、MV
     *
     * @returns QQMusicResponse<QQMusicFirstPage>
     * @memberof ApiService
     */
    getRecommands():Observable<QQMusicResponse<QQMusicFirstPage>> {
        return apiFactory<QQMusicResponse<QQMusicFirstPage>>(API.first_page_data);
    }

    getCdList(id: number) {
        return apiFactory(API.cd, id)
    }

    /**
     * 歌词
     *
     * @param {number} id
     * @returns Lyric
     * @memberof ApiService
     */
    getLyric(id: number):Observable<Lyric> {
        return jsonpFactory<Lyric>(`https://api.darlin.me/music/lyric/${id}/`,'callback');
    }
}
