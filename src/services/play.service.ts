import { BaseService, Provide } from '@/common/dependency-injection';
import { DEFAULT_SONG_NAME, PlayMode, DEFAULT_IMG } from '@/common/types';
import { PlayList, Song } from '../common/interface';

@Provide('PlayService')
export class PlayService extends BaseService {
    currentTime = 0;
    duration = 0;
    playing = false;
    playMode: PlayMode = PlayMode.SEQUENTIAL;
    index = 0;
    song: Song = {
        name: DEFAULT_SONG_NAME,
    };
    playList: Song[] = [];

    get coverImgUrl() {
        return typeof this.song.albummid === 'undefined'
            ? DEFAULT_IMG
            : `https://y.gtimg.cn/music/photo_new/T002R500x500M000"${this.song.albummid}.jpg`;
    }

    set coverImgUrl(url: string) {

    }

    get currentTimeFormatted() {
        return ((this.currentTime / 60) | 0) + ':' + ('0' + (this.currentTime % 60)).slice(-2);
    }

    get durationFormatted() {
        return ((this.duration / 60) | 0) + ':' + ('0' + (this.duration % 60)).slice(-2);
    }

    playIndex(index: number): void {
        this.index = index;
        this.song = this.playList[index];
    }
    setPlayList(playList: PlayList) {
        this.playList = playList.list;
    }
    addToPlayList(item: Song) {
        this.playList.push(item);
    }
    deleteFromPlayList(index: number) {
        if (isNaN(index) || index >= this.playList.length) {
            return false;
        }
        if (index === this.index) {
            if (this.index === 0 && this.playList.length === 1) {
                this.song = {
                    name: DEFAULT_SONG_NAME,
                    singer: [],
                };
                this.coverImgUrl = DEFAULT_IMG;
            } else {
                this.song = this.playList[this.index + 1];
            }
        } else if (index < this.index) {
            this.index--;
        }
        this.playList.splice(index, 1);

    }

    addToPlayListAsNextPlay(item: Song) {
        this.playList.splice(this.index + 1, 0, item);
    }
    updateCurrentTime(time: number) {
        this.currentTime = time;
    }
    updateDuration(time: number) {
        this.duration = time;
    }
    play() {
        this.playing = true;
    }
    pause() {
        this.playing = false;
    }
    previousSong() {
        this.index = (this.index - 1 + this.playList.length) % this.playList.length;
        this.song = this.playList[this.index];
    }
    nextSong() {
        this.index = (this.index + 1) % this.playList.length;
        this.song = this.playList[this.index];
    }
    continue() {
        switch (this.playMode) {
            case PlayMode.SINGLE:
                break;
            case PlayMode.SEQUENTIAL:
                this.index = (this.index + 1) % this.playList.length;
                this.song = this.playList[this.index];
                break;
            case PlayMode.RANDOM:
                this.index = Math.floor(Math.random() * this.playList.length);
                this.song = this.playList[this.index];
                break;
        }
    }
    changePlayMode() {
        this.playMode = (this.playMode + 1) % 3;
    }
}
