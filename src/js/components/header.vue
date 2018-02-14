<template>
  <div :class="$style.header">
    <div :class="$style.title">
      <router-link to="/movie">
        电影
      </router-link>

    </div>
    <div :class="$style.search">
      <input type="text">
      <img src="../../assets/search.png"
           alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: ''
    };
  }
}
</script>

<style lang='scss' module>
.header {
  z-index: 5;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 5px 0px 5px 36px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .title {
    a {
      color: #2384e8;
      font-size: 30px;
      text-decoration: none;
    }
  }
  .search {
    display: flex;
    width: 60%;
    justify-content: flex-end;
    overflow: hidden;
    img {
      width: 48px;
      height: 36px;
      margin: 12px 20px 0px;
    }
    input {
      width: 70%;
      font-size: 30px;
      border: none;
      border-bottom: 1px solid #04b704;
      outline: none;
    }
  }
}
</style>