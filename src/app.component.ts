import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import './app.component.css';
import { PlayService } from '@/services';

const TAB_NAME = ['排行榜', '推荐'];

@Component({
    template: require('./app.component.html'),
    components: {
        swiper,
        swiperSlide,
    },
})
export class App extends Vue {
    @Inject('PlayService') play!: PlayService;

    iconPlay = require('./assets/icon-play.png');
    iconPause = require('./assets/icon-pause.png');
    playPageShow = false;
    blurBgShow = false;
    rankshow = true;
    routerViewAnimation = 'page-slide';
    swiperOption = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender(swiper: any, index: number, className: string) {
            return `<span class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</span>`;
            // return '<span class="' + className + ' swiper-pagination-bullet-custom' + '">' + (index + 1) + '</span>';
        },
    };
    tapButton(event: MouseEvent) {
        event.preventDefault();
        this.play.playing ? this.play.pause() : this.play.play();
    };
    showPlayPage(event: TouchEvent | MouseEvent) {
        event.preventDefault();
        this.playPageShow = true;
    };
    hidePlayPage(event: TouchEvent | MouseEvent) {
        event.preventDefault();
        this.playPageShow = false;
    };
    showBlurBg() {
        this.routerViewAnimation = 'fade';
        this.blurBgShow = true;
    };
    hideBlurBg() {
        this.blurBgShow = false;
    };
}
