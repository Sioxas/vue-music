<template>
  <div class="action-sheet">
    <transition name="fade" v-on:after-leave="distroy">
      <div class="bg" v-show="ready"></div>
    </transition>
    <transition name="play-slide">
      <ul v-show="ready">
        <li class="border-1px border-1px-after"><p>item1</p></li>
        <li class="border-1px border-1px-after"><p>item1</p></li>
        <li class="border-1px border-1px-after"><p>item1</p></li>
        <li @touchend.prevent="hide" @click="hide"><p>取消</p></li>
      </ul>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        ready: false
      }
    },
    components: {},
    methods: {
      hide: function () {
        this.ready = false
      },
      distroy: function () {
        this.$parent.menuShow = false
      }
    },
    created: function () {
      this.ready = true
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .action-sheet {
    width: 100%;
    height: 100%;
    top: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
  }

  .action-sheet .bg {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
  }

  .action-sheet ul {
    width: 100%;
    position: fixed;
    bottom: 0;
    list-style: none;
  }

  .action-sheet ul li {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
  }

  .action-sheet ul li:last-child {
    margin-top: 10px;
  }

  @media screen and (min-width: 450px) {
    .action-sheet {
      width: 450px;
    }
  }
</style>
