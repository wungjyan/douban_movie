import Vue from 'vue'
import VueRouter from 'vue-router'
import Movie from '../movie/index.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Movie
    }
  ]
})
