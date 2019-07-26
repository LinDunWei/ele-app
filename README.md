

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



## 内容总结 2019/7/26   

> 计划赶不上变化的7月，希望下半年能变好。
>
> 七月二十六回家的第三天，晴，远离了广州的高楼大厦车水马龙，回归小镇的平静

设置收获地址页（address组件页）

配置路由

```js
{
  path:'/address',
  name: 'address',
  component: ()=> import('./views/Address.vue')
},
```

在home页点击地址进入address页，同时路由传参，传入address所需的city。定位的city通过计算属性从vuex中拿取，vuex中的location对象中有addressComponent 对象，下有所需city。

可以通过谷歌浏览器vue插件查看已存储的定位地理信息。

图片。。。。

```vue
<template>
    <div class="home">
        <div class="header">
            <div class="address_map" @click="$router.push({name: 'address', params: {city : city}})">
                <i class="fa fa-map-marker"></i>
                <span>{{address}}</span>
                <i class="fa fa-sort-desc"></i>
            </div>
            <div class="shop_search">
                <i class="fa fa-search"></i>
                搜索商家 商家名称
            </div>
        </div>
    </div>

</template>
```

```js
computed:{
        address(){
            return this.$store.getters.address
        },
        city(){
          return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province
        }
```

-----------------------------------------------------------------------------------------------------------------------------------------------------------

封装address页所需的头部组件 Header.vue, 这个小组件也没啥好说，普通的组件传值。在address中传入需要的数据就可以。

```vue
<template>
    <div class="header">
        <!-- 左侧返回 -->
        <div class="header-button is-left" v-show="isLeft">
            <i class="fa fa-chevron-left"></i>
            <button @click="$router.go(-1)">返回</button>
        </div>
        <!-- 中间标题 -->
        <h1 class="header-title">{{title}}</h1>
    </div>

</template>
```

```js
<script>
export default {
    props:{
        title: String,
        isLeft:{
            type: Boolean,
            default: false
        }
    }
}
</script>
```

封装显示当前定位组件 location.vue 。 不用赘述。

```vue
<template>
    <div>
        <div class="title">当前定位</div>
        <div class="des">
            <i class="fa fa-location-arrow"></i>
            <span>{{address}}</span>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        address: String
    }
}
</script>
```

编写address组件页。头部组件下是一个input输入框，双向数据绑定变量search_val，在watch中进行对search_val的监听。

```js
watch:{
      search_val(){
        this.searchPlace();
      }
    },
```

接收路由传参

```js
beforeRouteEnter(to,from,next){
        next(vm => {
            vm.city = to.params.city
        })
    },
```

引入header和location组件之后，location组件需要传入需要显示的地理信息数据。在计算属性中通过vuex的getter拿到formattedAddress ，这个变量就是存储具体地理信息，也是可以在vue插件中看到，如上图。

```js
 computed:{
        address(){
            return this.$store.getters.location.formattedAddress;
        }
    },
```

watch监听了函数search_val，input每次的输入都会触发searchPlace函数的执行。这里我们需要靠searchPlace函数做关键字检索位置信息。

高德api提供了这一功能的实现， `输入提示与POI搜索`，这里使用`输入提示插件`，把代码复制粘贴过来到searchPlace函数中，需做一些修改。autoOptions  中的city代码默认是全国，改为我们当前定位的市级，city。

`result` 作为回调参数，里面的`tips` 数组就是检索到的地理信息，将其存入我们定义好的数组`areaList` 中进行遍历显示出来。

```vue
<template>
    <div class="address">
        <Header :isLeft="true" title="请选择收货地址" />
        <div class="city_search">
            <div class="search">
                <span class="city" @click="$router.push('/city')">
                    {{city}}
                    <i class="fa fa-angle-down"></i>
                </span>
                <i class="fa fa-search"></i>
                <input type="text" placeholder="小区/写字楼/学校等" v-model="search_val">
            </div>
            <Location :address="address" />
        </div>

        <div class="area">
          <ul class="area_list" v-for="(item,index) in areaList" :key="index">
            <li @click="selectAddress(item)">
              <h4>{{item.name}}</h4>
              <p>{{item.district}}{{item.address}}</p>
            </li>
          </ul>
        </div>
    </div>

</template>
```

 `v-for`遍历数组`areaList` ，给下面的`li`标签绑定点击事件，我们将选择的地理位置信息存储到vuex中，并返回到home页。

```js
selectAddress(item){
        this.$store.dispatch(
          "setAddress",
          item.district + item.address + item.name
        );
        this.$router.push("/home");
      }
```

