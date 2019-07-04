

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



## 内容总结 2019/7/4   

> 今天天气是雨天，在图书馆边听音乐边写这篇总结，打算晚上回去买个瓜吃~~~~



1.底部导航三个部分首页home，订单order，个人中心me，分别在view文件夹创建三个对应组件，三个组件作为index页对应三个不同子页面，来配置一下路由先。

```js
{
  path:'/',
  // name: 'Index',
  component: ()=> import('./views/index.vue'),
  children:[
    {
      path:'',
      redirect: '/home'
    },
    {
      path:'/home',
      name: 'home',
      component: ()=> import('./views/Home.vue')
    },
    {
      path:'/me',
      name: 'me',
      component: ()=> import('./views/Me.vue')
    },
    {
      path:'/order',
      name: 'order',
      component: ()=> import('./views/Order.vue')
    },

  ]
},
```

由于我们使用子路由，name：‘index’保留的话浏览器会出现黄色警告，那就不要了。

2.接下来搞个底部导航的组件封装，在components文件夹创建TabBar.vue，在index.vue中引入，注册使用。

封装的tabbar组件需要给他传几个值，如下在data中。

```vue

```

底部导航中的icon我们使用bootstrapCDN，在index.html文件中引入

```js
    <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=11d81ff5ebb469e9b11a92caafd98abd"></script> 

```

tabbar组件进行数据的接收，组件中我们使用vue-router进行路由跳转，绑定to的路径正是接收数据data中的path。

```vue
<template>
    <div class="tabbar">
        <router-link 
            class="tab-item" 
            v-for="(item,index) in data" 
            :key="index" 
            :to="item.path" 
            active-class="is-selected"
        >
            <div class="tab-item-icon">
                <i :class="'fa fa-'+item.icon"></i>
                <div class="tab-item-label">{{item.title}}</div>
            </div>
        </router-link>
    </div>

</template>

<script>
export default {
    name: 'tabbar',
    props:{
        data: Array
    }
}
</script>

<style scoped>
    .tabbar {
    height: 45px;
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-image: linear-gradient(
        180deg,
        #d9d9d9,
        #d9d9d9 50%,
        transparent 0
    );
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: #fafafa;
    display: flex;
    text-align: center;
    }
    .tab-item {
    display: block;
    padding: 3px 0;
    flex: 1;
    }
    .tab-item-icon {
    width: 20px;
    height: 20px;
    margin: 0 auto 5px;
    }
    .tab-item-icon i {
    font-size: 16px;
    }
    .tab-item-label {
    color: inherit;
    font-size: 10px;
    margin-top: 10px;
    line-height: 1;
    }
    a {
    text-decoration: none;
    color: #999;
    }
    .is-selected {
    color: #009eef;
    }
</style>
```

效果图：

![]( )





3.**高德地图api的使用**

这里我要使用的 web端的地图  JS  API。

使用之前的准备工作，登录  >  应用管理  >  创建新应用（绑定类型选择web端）

创建成功之后就可以得到后续所需的Key



> 1.在页面添加 JS API 的入口脚本标签，并将其中「您申请的key值」替换为您刚刚申请的 key； 
>
> [HTML](javascript:void(0);)
>
> ```js
> <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值"></script> 
> ```



index.html中引入入口标签，将得到的Key值替换进去。

我们想要页面一进入就获取定位，在app.vue文件中使用生命周期函数，执行getLocation 函数

```js
app.vue

created(){
    this.getLocation();
  },
```

文档  >  教程  >  服务  >  定位       使用浏览器定位，将提供的代码  CTRL C + V  到getLocation函数中，其中

```js
// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
buttonOffset: new AMap.Pixel(10, 20),
//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
zoomToAccuracy: true,     
//  定位按钮的排放位置,  RB表示右下
buttonPosition: 'RB'
```

以上代码用不着。

文档中的注意事项中有提到，我们使用的浏览器定位属于精准定位，由于手机有内置gps芯片，故移动端没问题，但是在pc端中，由于大部分电脑没有gps芯片，所以定位不了，将走失败回调，解决方法使用文档中的IP精准定位服务 。

> 注意有个小坑：因为pc设备上大都缺少GPS芯片，所以在PC上的定位主要通过IP精准定位服务，该服务的失败率在5%左右。 

本人的笔记本没有gps芯片，所以打印不出成功回调中返回的数据，走了失败回调。

创建getLngLatLoaction函数，该函数用来使用ip定位服务，将**IP定位获取当前城市信息**提供的代码抄过来放到函数中，console看一下回调的参数可以得到粗劣的地理位置信息：

![]( )



拿到提供不准确的经纬度，我们将经纬度处理为对应的地址位置，这里使用高德提供的**逆向地理编码方法** ----------------**getAddress函数**

```js
AMap.plugin('AMap.Geocoder', function() {
  var geocoder = new AMap.Geocoder({
    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    city: '010'
  })
 
  var lnglat = [116.396574, 39.992706]

  geocoder.getAddress(lnglat, function(status, data) {
    if (status === 'complete' && data.info === 'OK') {
        // result为对应的地理位置详细信息
    }
  })
})
```

city，使用ip定位服务拿到的adcode，lnglat，这里需要先处理有一些ip定位服务反馈的经纬度

```js
result.rectangle.split(';')[1].split(',')
```

getAddress函数回调结果打印的结果，正是我们处理后的地理信息：

![](https://raw.githubusercontent.com/LinDunWei/image/master/ele/1562242503256.png)

最后将处理ip定位服务的getLngLatLoaction函数在失败回调中执行。

```js
app.vue


export default {
  name: 'app',
  created(){
    this.getLocation();
  },
  methods:{
    getLocation(){
      const s = this;
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          //buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          //zoomToAccuracy: true,     
          //  定位按钮的排放位置,  RB表示右下
          //buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          // data是具体的定位信息
          console.log(data);
        }

        function onError (data) {
          // 定位出错
          console.log(data);
          s.getLngLatLoaction();
        }
      })
    },
    getLngLatLoaction(){
      AMap.plugin('AMap.CitySearch', function () {
      var citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
          console.log(result);

           // 逆向地理编码方法
          AMap.plugin('AMap.Geocoder', function() {
            var geocoder = new AMap.Geocoder({
              // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
              city: result.adcode
            })
          
            var lnglat = result.rectangle.split(';')[1].split(',')
            console.log(lnglat);
            geocoder.getAddress(lnglat, function(status, data) {
              if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  console.log(data);
              }
            })
          })
        }
      })
    })
    }
  }
}
```

