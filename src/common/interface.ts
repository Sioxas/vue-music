export interface Song {
    albummid?: string,
    id?: number|string,
    mid?: string,
    name: string,
    singer?: Singer[] | string,
}

export interface Singer {
    id: number,
    mid: string,
    name: string
}

export interface PlayList {
    index: number,
    list: Song[]
}

export interface Api {
    url: string,
    jsonp: string,
    params(id?: number | string): any,
}

export interface QQMusicResponse<T> {
    code: number,
    data: T,
    default?: number,
    message?: string,
    subcode: number
}

// https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg
export interface RankList {
    topList: RankItem[]
}

export interface RankItem {
    id: number,
    listenCount: number,
    picUrl: string,
    songList: RankSongList
}

export interface RankSongList {
    [key: number]: {
        singername: string,
        songname: string,
    },
    topTitle: string,
    type: number
}

// https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg
export interface HotKey {
    hotkey: Array<{ k: string, n: number }>,
    special_key: string,
    special_url: string
}

// https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg
export interface QQMusicFirstPage {
    focus: Focus[],
    hotdiss: {
        list: CD[],
        sum: number,
    },
    shoubomv: {
        all: MV[],
        gangtai: MV[],
        japan: MV[],
        korea: MV[],
        neidi: MV[],
        oumei: MV[],
    },
    toplist: FocusTopList
}

export interface Focus {
    fid: string,
    id: string,
    jumpurl: string,
    packageid: number,
    pic: string,
    title: string,
    type: number,
    usertype: number,
}

export interface CD {
    author: string,
    dissid: string,
    dissname: string,
    imgurl: string,
    listennum: number,
    sum: number,
}

export interface MV {
    listennum: number,
    mv_id: number,
    mvdesc: string,
    mvscore: number,
    mvtitle: string,
    picurl: string,
    pub_date: string,
    singer_id: number,
    singer_mid: string,
    singer_name: string,
    vid: string,
}

export interface FocusTopList {
    ListName: string,
    MacDetailPicUrl: string,
    MacListPicUrl: string,
    headPic_v12: string,
    listennum: number,
    pic: string,
    pic_Detail: string,
    pic_h5: string,
    pic_v11: string,
    pic_v12: string,
    showtime: string,
    songlist: Array<{
        singerid: number,
        singername: string,
        songid: number,
        songname: string,
    }>,
    topID: number,
    type: number,
    update_key: number
}

// https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg
export interface TopList {
    code: number,
    color: number,
    comment_num: number,
    cur_song_num: number,
    date: string,
    day_of_year: string,
    song_begin: number,
    songlist: SongOfTopList[],
    topinfo: TopInfo,
    total_song_num: number,
    update_time: string,
}

export interface TopInfo {
    ListName: string,
    MacDetailPicUrl: string,
    MacListPicUrl: string,
    headPic_v12: string,
    info: string,
    listennum: number,
    pic: string,
    pic_Detail: string,
    pic_h5: string,
    pic_v11: string,
    pic_v12: string,
    topID: number,
    type: number
}

export interface SongOfTopList {
    Franking_value: string,
    cur_count: string,
    data: SongInfo,
    in_count: string,
    mb: string,
    old_count: string,
    singer2: {
        Fgenre: string,
        Fsinger_id: string,
        Fsinger_mid: string,
        Fsinger_name: string,
        Ftype: string,
    },
    vid: Vid
}

export interface SongInfo {
    albumdesc: string,
    albumid: number,
    albummid: string,
    albumname: string,
    alertid: number,
    belongCD: number,
    cdIdx: number,
    interval: number,
    isonly: number,
    label: string,
    msgid: number,
    pay: Pay,
    preview: Preview,
    rate: number,
    singer: Singer[] | string,
    size5_1: 0,
    size128: number,
    size320: number,
    sizeape: number,
    sizeflac: number,
    sizeogg: number,
    songid: number,
    songmid: string,
    songname: string,
    songorig: string,
    songtype: number,
    strMediaMid: string,
    stream: number,
    switch: number,
    type: number,
    vid: string,
}

// https://api.darlin.me/music/lyric/214003654/?callback=_jsonp1s4snkapx3r
export interface Lyric {
    code: number,
    lyric: string,
    retcode: number,
    songt: number,
    subcode: number,
    type: number
}

// https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg
export interface SearchResult {
    album?: SearchResultItem,
    mv?: SearchResultItem,
    singer?: SearchResultItem,
    song?: SearchResultItem
}

export interface SearchResultItem {
    count: number,
    itemlist: Array<{
        albummid?: string,
        docid: string,
        id: string|number,
        mid: string,
        name: string,
        pic?: string,
        singer: Singer[] | string,
        vid?: string,
    }>,
    name: string,
    order: number,
    type: number
}

// https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg

export interface AlbumInfo {
    aDate: string;
    albumTips: string;
    color: number;
    company: string;
    company_new: {
        name: string;
    };
    cur_song_num: number;
    desc: string;
    genre: string;
    id: number;
    lan: string;
    list?: SongInfo[] | null;
    mid: string;
    name: string;
    radio_anchor: number;
    singerid: number;
    singermblog?: null;
    singermid: string;
    singername: string;
    song_begin: number;
    total: number;
    total_song_num: number;
}

// https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg
export interface SingerInfo {
    SingerDesc: string;
    albumTotal: number;
    albumlist?: AlbumlistEntity[] | null;
    color: number;
    fans: number;
    list?: ListEntity[] | null;
    mvTotal: number;
    mvlist?: MvlistEntity[] | null;
    singer_id: string;
    singer_mid: string;
    singer_name: string;
    total: number;
}

interface Pay {
    payalbum: number;
    payalbumprice: number;
    paydownload: number;
    payinfo: number;
    payplay: number;
    paytrackmouth: number;
    paytrackprice: number;
    timefree: number;
}
interface Preview {
    trybegin: number;
    tryend: number;
    trysize: number;
}

interface AlbumlistEntity {
    albummid: string;
    id: number;
    name: string;
    pic: string;
    publish_date: string;
    strAlbumTran: string;
    url: string;
}
interface ListEntity {
    Flisten_count1: string;
    Fupload_time: string;
    index: number;
    isnew: number;
    listenCount: number;
    musicData: SongInfo;
    playurl: string;
    price: number;
    vid: Vid;
}

interface Vid {
    Fmv_id?: string | null;
    Fstatus?: string | null;
    Fvid?: string | null;
}
interface MvlistEntity {
    duration: number;
    mvid: number;
    playcnt: number;
    pubdate: string;
    title: string;
    vid: string;
}
