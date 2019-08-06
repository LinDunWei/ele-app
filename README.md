

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



## 内容总结 2019/8/7   

> 实现排序导航

先搞个排序导航组件（ filterView.vue ） 接受home.vue已经请求的数据

```js
props:{
    filterData: Object
},
```

home.vue 引入注册FilterView组件。

1.绑定filterData事件，将axios请求到的filterData传值子组件filterView.vue

```html
<!--home.vue-->
<!-- 导航 -->
        <FilterView @update="update" @searchFixed = "showFilterView" :filterData = "filterData" />
```

```js
getData(){
      this.$axios("/api/profile/shopping").then(res => {
        // console.log(res);
        this.swipeImgs = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
      this.$axios("/api/profile/filter").then(res => {
        console.log(res);
        this.filterData = res.data;
      });
    },
```

```vue
<!--filterView.vue-->

<template>
    <div @click.self="hideView" :class="{'open' : isSort || isScreen}">
        <!-- 导航 -->
        <div v-if="filterData" class="filter_wrap">
            <aside class="filter">
                <div v-for="(item,index) in filterData.navTab" 
                    :key="index" 
                    class="filter_nav" 
                    :class="{'filter-bold' : currentFilter == index}"
                    @click="filterSort(index)">
                    <span>{{item.name}}</span>
                    <i v-if="item.icon" :class="'fa fa-'+ item.icon"></i>
                </div>
            </aside>
        </div>
        <!-- 排序 -->
        <section class="filter-extend" v-if="isSort">
            <ul>
                <li v-for="(item,index) in filterData.sortBy" :key="index"
                    @click="selectSort(item,index)">
                    <span :class="{'selectName' : currentSort == index}">{{item.name}}</span>
                    <i v-show="currentSort == index" class="fa fa-check"></i>
                </li>
            </ul>
        </section>
        <!-- 筛选 -->
        <section class="filter-extend" v-if="isScreen">
            <div class="filter-sort">
                <div v-for="(screen,index) in filterData.screenBy" :key="index" class="morefilter">
                    <p class="title">{{screen.title}}</p>
                    <ul>
                        <li v-for="(item,i) in screen.data" :key="i">
                            <img v-if="item.icon" :src="item.icon" alt="">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="morefilter-btn">
                <span class="morefilter-clear">清空</span>
                <span class="morefilter-ok">确定</span>
            </div>
        </section>
    </div>
</template>
```

2.aside标签中，给每个下级div绑定点击事件filterSort，并传入索引。根据不同按钮实现不同操作。

```js

```

3.isSort决定点击综合排序时面板的出现，同时也决定蒙层样式open作用与否，这里样式open设置在组件最外层。

```css
.open {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.5s ease-in-out;
    z-index: 3;
    }
```

另外，虽然组件的top值为0，但受home.vue中搜索框样式的影响，无法实现搜索框和组件的置顶效果，这里则需要动态的修改搜索框的样式。绑定class`fixedview` ，由showFilter值决定。

```html
<!-- home.vue -->
<div class="search_wrap" :class="{'fixedview' : showFilter}">
    <div class="shop_search">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
    </div>
</div>
```

4.给排序面板每一个li标签绑定`selectSort` 点击事件，传入item和index，更新列表数据由filterData.sortBy下的字段code决定，将code传递出去可以在home组件中操作数据的更新。

```js
selectSort(item,index){
            this.currentSort = index;
            //第一个导航的名字改变为综合排序下点击所得到的选项
            this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
            //再把排序版隐藏
            this.hideView();

            //更新数据，在home里面，发送事件传递数据过去
            this.$emit("update",{condation : item.code});
        }
```





欲知后事如何，且看下回更新。。。