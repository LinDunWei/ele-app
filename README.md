

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



## 内容总结 2019/8/21   

> 更新内容：更新了**myAddress**我的地址页中，编辑地址和删除地址的功能。
>
> 注意点：**myAddress**和**addAddress**在路由跳转时是要把参数**addressInfo**对象带过去的，编辑地址和新增地址都是公用**addAddress**组件，只需在路由传参时修改**addressInfo**对象中的**title**值来区分，另外踩坑点是，在**我的**页面，及**Me**组件跳转到**addAddress**组件时页不要忘记传参**addressInfo**对象，不然会报错。
>
> 笔记待续。。。
