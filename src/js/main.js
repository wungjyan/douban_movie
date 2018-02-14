import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
