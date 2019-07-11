

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



## 内容总结 2019/7/11   

> 阴天，这段时间由于一些原因学习断断续续。为了衔接好接下来vuex存储定位信息的章节，又重新回温一下vuex的知识点。

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//type
const types= {
  SET_LOCATION : "SET_LOCATION",
  SET_ADDRESS : "SET_ADDRESS"
}

//state
const state = {
  location : {},
  address: ""
}

//getters
const getters = {
  location : state => state.location,
  address : state => state.address 
}


//mutations
const mutations = {
  [types.SET_LOCATION](state,location){
    if(location){
      state.location = location
    }else{
      state.location = null
    }
  },
  [types.SET_ADDRESS](state,address){
    if(address){
      state.address = address
    }else{
      state.address = null
    }
  }
}

//actions
const actions = {
  setLocation: ({commit},location) => {
    // console.log(location);
    commit(types.SET_LOCATION,location);
  },
  setAddress: ({commit},address) => {
    commit(types.SET_ADDRESS,address);
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

```

通过vuex来存储定位信息，公共数据池state中定义存储的`location`和`address`，外部组件中如果需要拿数据池的数据则用`getters`

`mutations`作为对state中数据的修改的对象，但我们在**app.vue**中获取了定位信息之后要将信息存储到**state**中对应的`location`和`address`，不能直接调用**mutations**，原因是我们获取定位本来就属于**异步操作**，所以同步操作的mutations不适用。那么vuex就刚刚好用进行异步操作的**actions**。

另外，我们不能直接修改state。**在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。** 

在vuex文件中，actions对象里面定义两个函数`setLocation`和`setAddress`，通过**commit**函数可以将数据提交到mutations对象，commit函数第一个参数是mutations中的函数名，第二个参数是要提交的数据。

那在外部使用actions，其实和使用mutations差不多，只是不再使用commit，而是用**dispatch**，【派发】。

第一个参数是actions中的函数名，第二个参数是提交到actions的数据。

```js
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
          s.$store.dispatch("setLocation",data)      //通过dispatch触发actions
          s.$store.dispatch("setAddress",data.formattedAddress)
        }

        function onError (data) {
          // 定位出错
          console.log(data);
          s.getLngLatLoaction();
        }
      })
    },
```

```js
getLngLatLoaction(){
      const s = this;
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
            // console.log(lnglat);
            geocoder.getAddress(lnglat, function(status, data) {
              if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  console.log(data);
                  
                  //dispatch触发actions
                  s.$store.dispatch("setLocation",{
                    addressComponent:{
                      city: result.city,
                      province: result.province
                    },
                    formattedAddress: data.regeocode.formattedAddress
                  }),
                  s.$store.dispatch("setAddress",data.regeocode.formattedAddress)
              }
            })
          })
        }
      })
    })
    }
```





接下来在home组件中显示定位信息

```vue
<template>
    <div class="home">
        <div class="header">
            <div class="address_map">
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

<script>
export default {
    computed:{
        address(){
            return this.$store.getters.address
        }
    }
}
</script>
```

