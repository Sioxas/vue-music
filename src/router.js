/**
 * Created by sioxa on 2016/12/29 0029.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Album from './components/Album.vue'
import Singer from './components/Singer.vue'
import RankPage from './components/RankPage.vue'
import Cd from './components/Cd.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/singer/:id',name:'singer', component: Singer },
  { path: '/album/:id',name:'album',  component: Album },
  { path: '/rank/:id',name:'rank',  component: RankPage },
  { path: '/cd/:id',name:'cd',  component: Cd }
]

export default new VueRouter({
  routes,
  //只在history模式下有用
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
