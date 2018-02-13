# douban_movie

简易豆瓣电影项目

> vue2.0+webpack+sass+CSS Module+hotcss

## 简介

利用豆瓣电影 API，完成一个简单的豆瓣电影项目。  
项目中用到的 api 有：

* 正在上映的电影（北京）：/v2/movie/in_theaters
* 即将上映的电影：/v2/movie/coming_soon

项目组件化设计，首页的电影列表组件是 `movies-list`。如需添加更多的电影列表，只需传入请求 api：

```
<movies-list></movies-list> //默认请求的是正在热映的电影
<movies-list requestUrl="/api/movie/coming_soon?start=0&count=8"></movies-list>  //请求即将上映的电影
```

`?start=0&count=8`表示取 8 个数据，从而用于展示在首页列表里。  
`/api`是在 webpack 中配置的，前端跨域：

```
proxy: {
  '/api': {
    target: 'https://api.douban.com/v2',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}
```
