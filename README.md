# douban_movie

简易豆瓣电影项目

> vue2.0+webpack+sass+CSS Module+hotcss

## 图片演示

![图片演示](./src/assets/douban_movie.gif)

## 本地演示

```
git clone git@github.com:wungjyan/douban_movie.git

npm install

npm start
```

## 介绍

### 项目特点

* 组件化
* 自适应
* CSS Module

### 组件化

利用 vue 组件化，将部分功能拆分成组件。比如首页的电影滑动展示，是一个组件（moviesList），此组件里又引入了轮播组件（slider）。若需添加展示的电影类目，只需传入对应的请求 api：

```
 <movies-list requestUrl="/api/movie/coming_soon"></movies-list>
 //此处传入的是“即将上映的电影”的api，默认请求的是“正在热映的电影”
```

### 自适应

移动端自适应使用了[hotcss.js](https://github.com/imochen/hotcss)和[px2rem-loader](https://github.com/Jinjiang/px2rem-loader)。
hotcss 使用动态的 HTML 根字体大小和动态的 viewport scale。在 vue 中配置 px2rem-loader，在开发时只使用 px，px2rem 把 px 转成 rem，再动态的计算 font-size。

### CSS Module

使用 css Module 防止命名冲突，它的工作原理是把一个类名编译成哈希字符串，然后在引用的时候直接使用这个哈希字符串字符串，进而保证相同的类名根据不同的路径和组件名称得到不同的值，保证了最终的类名隔离。
[vue 中配置 CSS Module](https://vue-loader.vuejs.org/zh-cn/features/css-modules.html)

### 用到的 API

项目中用到的 api 有：

* 正在上映的电影（北京）：/v2/movie/in_theaters
* 即将上映的电影：/v2/movie/coming_soon
* 电影搜索：/v2/movie/search?q=
