/**
 * Created by sioxa on 2016/12/29 0029.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Album from './components/Album.vue'
import Singer from './components/Singer.vue'
import RankPage from './components/RankPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/singer/:id',name:'singer', component: Singer },
  { path: '/album/:id',name:'album',  component: Album },
  { path: '/rank/:id',name:'rank',  component: RankPage }
]

export default new VueRouter({
  routes
})
