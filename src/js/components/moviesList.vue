<template>
  <div style="margin:40px 0px;"
       v-show="showList">
    <div :class="$style.header">
      <p>{{title}}</p>
      <router-link :to="{path:'more-movies',query:{type:getType}}">
        更多
      </router-link>
    </div>
    <slider :img-list="moviesList"></slider>
  </div>
</template>

<script>
import slider from './slider.vue';
import axios from 'axios';
export default {
  props: {
    requestUrl: {
      type: String,
      default: '/api/movie/in_theaters'
    }
  },
  data () {
    return {
      showList: false,
      moviesList: [],
      title: '',
      imgUrl: this.requestUrl
    };
  },
  computed: {
    getType () {
      var arr = this.requestUrl.split('/');
      var len = arr.length;
      return arr[len - 1];
    }
  },
  mounted () {
    axios.get(this.imgUrl + '?start=0&count=8').then(response => {
      var res = response.data;
      this.title = res.title;
      var movies = [];
      for (var i = 0; i < res.subjects.length; i++) {
        movies.push({
          src: res.subjects[i].images.large,
          title: res.subjects[i].title,
          id: res.subjects[i].id
        });
      }
      this.moviesList = movies;
      this.showList = true;
    }).catch(error => {
      console.log(error);
    })
  },
  components: {
    slider
  }
}
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  p {
    height: 52px;
    font-size: 32px;
  }
  a {
    color: #42bd56;
    text-decoration: none;
    font-size: 28px;
    height: 52px;
    line-height: 52px;
    margin-right: 10px;
  }
}
</style>
