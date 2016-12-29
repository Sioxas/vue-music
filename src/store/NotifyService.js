/**
 * Created by sioxa on 2016/12/29 0029.
 */
import Rx from 'rxjs/Rx'

export default {
  state: {
    actionSheet: {
      show: false,
      menus: {},
      subject: null
    }
  },
  actions: {
    notifyActionSheet({commit, state}, options){
      state.actionSheet.subject = new Rx.AsyncSubject()
      state.actionSheet.subject.subscribe({
        next: (v) => options.handler[v](),
        complete: () => commit('closeActionSheet')
      })
      commit('showActionSheet', options.menus)
    },
    responceFromActionSheet({state}, menu){
      state.actionSheet.subject.next(menu)
      state.actionSheet.subject.complete()
    }
  },
  mutations: {
    showActionSheet(state, menus){
      state.actionSheet.menus = menus
      state.actionSheet.show = true
    },
    closeActionSheet(state){
      state.actionSheet.show = false
    }
  }
}
