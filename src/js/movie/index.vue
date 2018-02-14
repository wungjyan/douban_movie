<template>
  <div>
    <nav-header></nav-header>
    <movies-list style="margin-top:100px;"></movies-list>
    <movies-list requestUrl="/api/movie/coming_soon"></movies-list>

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

