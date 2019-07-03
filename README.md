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



## 内容总结 2019/7/3

1.为登录按钮添加状态，只有手机号和验证码都有输入才可以点击按钮

为登录按钮绑定`disabled` ，值为一个计算属性`isClick`；同时绑定点击事件`handleLogin` 

```vue
<!-- 登录按钮 -->
    <div class="login_btn">
        <button :disabled="isClick" @click="handleLogin">登录</button>
    </div>
```

```js
computed:{
        isClick(){
            if(!this.phone || !this.verifyCode){
                return true
            }else{
                return false
            }
        }
    },
```

我们需要一个效果，当按钮不可点击也就是`disabled`的值为true的时候，背景色为淡绿色

样式代码使用css属性选择器

```css
.login_btn button[disabled] {
  background-color: #8bda81;
}
```



2.登录按钮的点击事件`handleLogin` 

```js
handleLogin(){
    //取消错误提醒
    this.error = {}
    //发送请求
    this.$axios.post("/api/posts/sms_back",{
        phone: this.phone,
        code: this.verifyCode
    }).then(res=>{
        //成功，保存登录状态,转首页
        localStorage.setItem("ele_login",true);    //这里保存的ele_login登录状态会作为路由重定向判断
        this.$router.push("/");
    }).catch(err => {
        console.log(err);
        console.log(err.response);
        // 返回错误信息
        this.error = {
            code: err.response.data.msg
        };
    });

},
```

这里我们输入的验证码正确的话，接口走成功回调，我们需要使用缓存来保存一个登录状态`ele_login`

验证码错误时，在失败回调中我们需要给data中的error对象赋值一个KV，也就是我们在组件中绑定的error值

```vue
<!-- 验证码的input框 -->
<myInput type="number" placeholder="验证码"  v-model="verifyCode"
       :error="error.code"/>
```

