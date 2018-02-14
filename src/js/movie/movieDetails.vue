<template>
  <div>
    <nav-header></nav-header>
    <div :class="$style.wrap"
         v-show="show">
      <h2>{{movieInfo.title}}</h2>
      <img :src="movieInfo.img"
           alt="">
      <p>{{movieInfo.country+'（'+movieInfo.year+'）'+movieInfo.genres+movieInfo.director+movieInfo.casts}}</p>
      <div :class="$style.btn">
        <div :class="$style.wish">想看{{movieInfo.wishCount}}</div>
        <div :class="$style.collect">看过{{movieInfo.collectCount}}</div>
      </div>
      <div :class="$style.des">{{movieInfo.title}}剧情简介</div>
      <div :class="$style.summary">{{movieInfo.summary}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavHeader from '../components/header.vue';
export default {
  data () {
    return {
      movieInfo: {},
      show: false
    };
  },
  components: {
    NavHeader
  },
  mounted () {
    var id = this.$route.query.id;
    var rUrl = '/api/movie/subject/' + parseInt(id);
    axios.get(rUrl).then(response => {
      var res = response.data;
      // console.log(res);
      this.movieInfoInit(res);
      this.show = true;
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    movieInfoInit (res) {
      var des = {};
      des.title = res.title;
      des.img = res.images.large;
      des.country = res.countries[0];
      des.genres = '';
      for (var i = 0; i < res.genres.length; i++) {
        des.genres += res.genres[i] + '/'
      }
      des.director = res.directors[0].name + '（导演）' + '/';
      des.casts = '';
      for (var i = 0; i < res.casts.length; i++) {
        des.casts += res.casts[i].name + '/';
      }
      des.casts = des.casts.slice(0, -1);
      des.summary = res.summary;
      des.year = res.year;
      des.wishCount = res.wish_count;
      des.collectCount = res.collect_count;
      this.movieInfo = des;
    }
  }
}
</script>

<style lang='scss' module>
.wrap {
  width: 96%;
  margin: 120px auto;
  h2 {
    font-size: 40px;
    font-weight: 500;
  }
  img {
    width: 100%;
    height: 760px;
  }
  p {
    font-size: 32px;
  }
  .btn {
    display: flex;
    justify-content: space-around;
    margin: 40px 0;
    div {
      width: 40%;
      height: 64px;
      line-height: 64px;
      text-align: center;
      border: 1px solid #ffb712;
      border-radius: 3px;
      color: #ffb712;
      font-size: 30px;
    }
  }
  .des {
    color: #aaa;
    margin: 0 0 30px;
    font-size: 30px;
  }
  .summary {
    font-size: 30px;
    color: #494949;
    word-wrap: break-word;
    margin: 0;
    padding: 0;
  }
}
</style>