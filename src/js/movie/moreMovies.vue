<template>
  <div>
    <nav-header></nav-header>
    <div :class="$style.result">{{moviesTitle}}</div>

    <div :class="$style.movies">
      <div :class="$style.item"
           v-for="item in moviesList"
           :key="item.title">
        <router-link :to="{path:'movie-details',query: { id: item.id }}">
          <img :src="item.imgUrl"
               alt="">
          <p>{{item.title}}</p>
        </router-link>

      </div>
    </div>

    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10">

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavHeader from '../components/header.vue'
export default {
  data () {
    return {
      moviesList: [],
      moviesTitle: '',
      busy: false,
      requestUrl: '',
      mType: ''
    };
  },
  components: {
    NavHeader
  },
  mounted () {
    var type = this.$route.query.type;
    this.mType = type;
  },
  methods: {
    getMovies (res, moviesList) {
      var subjects = res.subjects;
      for (var i = 0; i < subjects.length; i++) {
        moviesList.push({
          title: subjects[i].title,
          imgUrl: subjects[i].images.large,
          id: subjects[i].id
        })
      }
    },
    loadMore () {
      this.busy = true;
      var start = this.moviesList.length;
      setTimeout(() => {
        axios.get('/api/movie/' + this.mType + '?start=' + start + '&count=9').then(response => {
          var res = response.data;
          var title = res.title;
          var total = res.total;
          var addMovies = [];
          this.moviesTitle = title;
          this.getMovies(res, addMovies);
          if (start == 0) {
            this.moviesList = addMovies;
          } else {
            this.moviesList = this.moviesList.concat(addMovies);
          }
          if (this.moviesList.length < total) {
            this.busy = false;
          }
        })
      }, 1000)

    }

  }
}
</script>

<style lang='scss' module>
.result {
  color: #aaa;
  font-size: 30px;
  margin-top: 120px;
}
.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 40px;
  .item {
    width: 30%;
    margin-bottom: 30px;
    a {
      text-decoration: none;
      color: #111;
      &:link {
        text-decoration: none;
      }
      img {
        width: 100%;
        height: 305px;
      }
      p {
        text-align: center;
        font-size: 32px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>