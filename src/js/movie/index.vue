<template>
  <div>
    <nav-header></nav-header>
    <movies-list></movies-list>
    <movies-list requestUrl="/api/movie/coming_soon?start=0&count=8"></movies-list>
  </div>
</template>

<script>
import NavHeader from '../components/header.vue'
import MoviesList from '../components/moviesList.vue'
export default {
  data () {
    return {
    };
  },
  components: {
    NavHeader,
    MoviesList
  }
}
</script>
