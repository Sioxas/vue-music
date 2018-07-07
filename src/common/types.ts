export const service = {

    AUTH: 'AUTH',
    TEST: 'TEST',
    TEST2: 'TEST2',

}
export const PLAY_MODE_IMG = [
    require('../assets/icon-SINGLE.svg'),
    require('../assets/icon-SEQUENTIAL.png'),
    require('../assets/icon-RANDOM.png')
]
export const PLAY_MODE_NAME = ['单曲循环', '顺序播放', '随机播放']

export enum PlayMode {
    SINGLE,
    SEQUENTIAL,
    RANDOM,
}
export const DEFAULT_IMG = require('../assets/Vue_Music_Blur.png')
export const DEFAULT_SONG_NAME = 'VUE MUSIC'
export const types = {
    ALBUM: 10002,
    CD: 10014,
    JUMP: 3002
}