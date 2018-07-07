<template>
  <div class="home">
    {{auuu}}
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { AuthService } from '../services/auth.service';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @Inject('AuthService') private auth!:AuthService
  created():void{
    setTimeout(()=>{
      this.auth.name = "auth name changed"
    },500)
  }
  get auuu(){
    return this.auth.name;
  }
}
</script>
