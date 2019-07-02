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

<script>
import myInput from "../components/myInput"
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
    methods:{
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
    }
}
</script>

<style scoped>
    .login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>