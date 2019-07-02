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



# 本次学习的内容总结   2019/7/2

### 创建输入框组件

```vue
组件 myInput.vue :

<template>
    <div class="text_group">
        <div class="input_group" :class="error? 'is-invalid': ''">
            <!-- 输入框   -->
            <input :type="type"
                   :value="value"
                   :placeholder="placeholder"
                   :name="name"
                   @input="$emit('input',$event.target.value)"
            >
            <!-- 输入框后面的按钮 -->
            <button v-if="btnTitle" 
                    :disabled="disabled"
                    @click="$emit('btnClick')">{{btnTitle}}</button>
        </div>
        <!-- 错误提示 -->
            <div class="invalid-feedback" v-if="error">{{error}}</div>
    </div>

</template>

<script>
export default {
  name: "myInput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  }
};
</script>

<style scoped>
.input_group {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input_group input {
  height: 100%;
  width: 60%;
  outline: none;
}
.input_group button {
  border: none;
  outline: none;
  background: #fff;
}
.input_group button[disabled] {
  color: #aaa;
}
.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}
</style>
```

：根据传值的内容决定输入框是否保有btn按钮和错误提示框



### login.vue 页面中引入组件，完成基本的登录页面样式

```js
login.vue :

import myInput from "../components/myInput"
```

```js
login.vue :

export default {
    name:'login',
    components:{
        myInput
    },
    data(){
        return{
            phone:"",
            verifyCode:'',
            error:{},
            btnTitle: "获取验证码",
            disabled: false
        }
    },
```

```vue
login.vue :

<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/logo.jpg" alt="my logo">
        </div>
        <!-- 手机号的input框 -->
        <myInput type="number" 
               placeholder="手机号"  
               v-model="phone"
               :btnTitle="btnTitle" 
               :disabled="disabled" 
               :error="error.phone"
               @btnClick = "getVerifyCode"/>
        <!-- 验证码的input框 -->
        <myInput type="number" placeholder="验证码"  v-model="verifyCode"
               :error="error.code"/>
        <!-- 用户服务协议 -->
        <div class="login_des">
            <p>
                新用户登录即自动注册，表示已同意
                <span>《用户服务协议》</span>
            </p>
        </div>
        <!-- 登录按钮 -->
        <div class="login_btn">
            <button>登录</button>
        </div>
    </div>

</template>
```

### 完成后的页面效果

![](https://raw.githubusercontent.com/LinDunWei/image/master/ele/1562053703753.png) 

### 点击获取验证码后60秒倒计时

input输入框组件btn按钮绑定了click  

> @click="$emit('btnClick')"

在login.vue中使用时，同样给组件绑定相同的事件名

> @btnClick = "getVerifyCode"

```js
login.vue :

getVerifyCode(){
            //判断validatePhone执行返回结果
            if(this.validatePhone()){
                //如果返回结果是true则输入的手机号没问题，发起网络请求
                this.validateBtn();
            }
        },
validateBtn(){
            let time = 60;
            let timer = setInterval(()=>{
                if(time == 0 ){
                    clearInterval(timer);
                    this.disabled = false;
                    this.btnTitle = "获取验证码"
                }else{
                    this.disabled = true;
                    this.btnTitle = time + "秒后重试";
                    time --;
                }
            },1000);
        },
validatePhone(){
    // console.log(this.phone);
    // return;
    //验证手机号码是否为空
    if(!this.phone){
        this.error = {
            phone: '手机号码不能为空'
        };
        return false;
    }else if(!/^1[345678]\d{9}$/.test(this.phone)){
    //验证手机格式
        this.error = {
            phone: "请填写正确的手机号码"
        };
        return false;
    }else{
        this.error = {};
        return true;
    }
        }
```



### 使用聚合数据，完成发送验证码功能

1.项目安装axios

```
cnpm install axios --save
```

2.main.js 引入

```js
import axios from 'axios'

Vue.prototype.$axios = axios

```

3.创建vue.config.js文件，配置跨域

```js
module.exports = {
    devServer:{
        open: true,      //npm run server 项目启动后自动打开浏览器
        host: 'localhost',  // 主机名字  一般本地开发是 localhost
        port: 8080,     // 端口号
        https: false,   
        hotOnly: false, //热更新
        proxy:{             //配置跨域
            'api':{
                target: 'https://ele-interface.herokuapp.com/api/',  //跨域地址
                ws: true,                                             //是否启用websockets

                //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，
                //这样服务端和服务端进行数据的交互就不会有跨域问题   
                changeOrigin: true,    
                pathRewrite:{
                    '^/api': ''
                }
            }
        },
        before: app=>{}
    }
}
```

4.使用axios发起请求

```js
login.vue :

getVerifyCode(){
            //判断validatePhone执行返回结果
            if(this.validatePhone()){
                //如果返回结果是true则输入的手机号没问题，发起网络请求
                this.validateBtn();

                //发起请求
                this.$axios.post("/api/posts/sms_send",{
                    key: '563d25da9f1dabb9d8075cabb8f4ae6c',
                    tpl_id: '169705',
                    phone: this.phone
                }).then(res => {
                    console.log(res);
                })
            }
        },
```

5.嘀嘀嘀，验证码来了

![](https://raw.githubusercontent.com/LinDunWei/image/master/ele/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190702165735.jpg)