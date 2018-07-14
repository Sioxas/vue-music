import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';

import router from './router';
import App from './App.vue';
import { provide } from './services';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueLazyload, {
  error: require('./assets/loading.svg'),
  loading: require('./assets/loading.svg'),
  attempt: 1,
})

new Vue({
  router,
  render: (h) => h(App),
  provide,
}).$mount('#app');
