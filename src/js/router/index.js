import Vue from 'vue'
import VueRouter from 'vue-router'
import Movie from '../movie/index.vue'
import MovieDetails from '../movie/movieDetails.vue'
import MoreMovies from '../movie/moreMovies.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Movie,
      alias: '/movie'
    },
    {
      path: '/movie-details',
      name: 'MovieDetails',
      component: MovieDetails
    },
    {
      path: '/more-movies',
      name: 'MoreMovies',
      component: MoreMovies
    }
  ]
})
