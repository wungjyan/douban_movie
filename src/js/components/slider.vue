<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide v-for="item in imgList"
                    :key="item.title">
        <router-link :to="{path:'movie-details',query: { id: item.id }}">
          <img :src="item.src"
               alt="">
          <p>{{item.title}}</p>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    imgList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 15,
        freeMode: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
.swiper-container {
  .swiper-slide {
    width: 200px;
    height: 374px;
    a {
      &:link {
        text-decoration: none;
      }
      img {
        width: 100%;
        height: 284px;
      }
      p {
        color: #111;
        font-size: 28px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>


<style lang='scss'>
@import '~swiper/dist/css/swiper.css';
</style>