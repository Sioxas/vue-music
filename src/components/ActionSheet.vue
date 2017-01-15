<template>
  <div class="vux-actionsheet">
    <div class="weui_mask_transition"
         :class="{'weui_fade_toggle': show}"
         :style="{display: show ? 'block' : 'none'}"
         @touchend.prevent="emitEvent('on-click-menu', 'cancel')"
         @click="emitEvent('on-click-menu', 'cancel')">
    </div>
    <div class="weui_actionsheet_menu" :class="{'weui_actionsheet_toggle': show}">
      <div class="weui_actionsheet_cell"
           v-for="(text, key) in menus"
           @click="emitEvent('on-click-menu', key)"
           v-html="text">
      </div>
      <div class="vux-actionsheet-gap" v-if="showCancel"></div>
      <div class="weui_actionsheet_cell vux-actionsheet-cancel"
           @touchend.prevent="emitEvent('on-click-menu', 'cancel')"
           @click="emitEvent('on-click-menu', 'cancel')"
           v-if="showCancel">
        {{cancelText}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations, mapState} from 'vuex'

  export default {
    data(){
      return {
        showCancel: true,
        cancelText: '取消',
      }
    },
    methods: {
      emitEvent (event, menu) {
        if (event === 'on-click-menu' && !/.noop/.test(menu)) {
          this.$store.dispatch('responceFromActionSheet', menu)
        }
      }
    },
    computed: {
      ...mapState({
        show: state => state.NotifyService.actionSheet.show,
        menus: state => state.NotifyService.actionSheet.menus
      })
    }
  }
</script>

<style lang="less">
  @import '../lib/styles/weui/widget/weui_tips/weui_mask';
  @import '../lib/styles/weui/widget/weui_tips/weui_actionsheet';

  .vux-actionsheet-gap {
    height: 8px;
    width: 100%;
    background-color: #eee;
  }

  .vux-actionsheet-cancel:before {
    border-top: none;
  }

  @media screen and (min-width: 450px) {
    .weui_actionsheet {
      width: 450px;
    }
  }
</style>
