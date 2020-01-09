import Vue from 'vue';
import 'lib-flexible';
import VueAwesomeSwiper from 'vue-awesome-swiper';
// import vconsole from 'vconsole';
import 'swiper/dist/css/swiper.css';
import './vant';
import './utils/index';
import App from './App.vue';
import router from './router';
import store from './store/store';
import i18n from './i18n';
//socket
// import * as socketApi from './api/socket'
// Vue.prototype.socketApi = socketApi

// new vconsole();

Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;

if (window.cordova) {
  document.addEventListener('deviceready', () => {
    new Vue({
      router,
      store,
      i18n,
      render: h => h(App),
    }).$mount('#app');
  });
} else {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app');
}
