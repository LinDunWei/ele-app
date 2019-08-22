

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



## 内容总结 2019/8/22   

> 更新内容：更新了**shop.vue**页面中，导航组件切换时，给 **router-view** 添加了  **keep-alive** 标签，达到一个缓存的作用，同理在  **APP.vue**  中也使用它，在点击 **去结算** 按钮，路由跳转到结算页面，及  **settlement.vue** 页面时，返回  **shop.vue** 时有一个缓存，不至于之前点击添加购物车的数据丢失。
>
> 另外，购物车结算使用了 **VUEX** 进行了存储。 
>
> 笔记待续。。。
