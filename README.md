

# ele

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## 内容总结 2019/8/6   

> 天气：晴      
>
> 此次更新内容有首页home.vue，引入mintUI。
>
> 1.使用axios的拦截器，做请求拦截和响应拦截处理
>
> 2.轮播图和分类滑块，mintUI的swipe组件

cnpm安装完mintUI框架后，在mian.js中进行引入，同时请求和响应拦截时要做加载提示框的处理，引入UI组件`Indicator` ，发送请求时提示框开启，得到响应后关闭。

```js
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Indicator } from 'mint-ui'    //mintUI的加载提示框

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //请求成功的话添加mintui的加载提示框
  Indicator.open();
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  //响应成功的话关闭加载提示框
  Indicator.close();
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.use(Mint);
```

回到home.vue，生命周期函数created 中执行`getData`函数，在函数里我们需要发送ajax获取轮播图数据

```js
getData(){
      this.$axios("/api/profile/shopping").then(res => {
        // console.log(res);
        this.swipeImgs = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
    }
```

引入swipe组件

```js
import { Swipe, SwipeItem } from 'mint-ui';
```

使用

```vue
<div id="container">
  <!-- 轮播 -->
  <mt-swipe :auto="4000" class="swiper">
    <mt-swipe-item v-for="(img,index) in swipeImgs" :key="index">
      <img :src="img" alt="">
    </mt-swipe-item>
  </mt-swipe>

  <!-- 分类 -->
  <mt-swipe :show-indicators="false" :auto="0" class="entries">
    <mt-swipe-item class="entry_wrap" v-for="(entry,i) in entries" :key="i">
      <div class="foodentry" v-for="(item,index) in entry" :key="index">
        <div class="img_warp">
          <img :src="item.image" alt="">
        </div>
        <span>{{item.name}}</span>
      </div>
    </mt-swipe-item>
  </mt-swipe>
</div>
```

