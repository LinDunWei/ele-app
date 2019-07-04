import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
    {
      path:'/login',
      name: 'Login',
      component: ()=> import('./views/login.vue')
    }
  ]
})
//路由守卫
router.beforeEach((to,from,next)=>{
  //获取登录状态，ele-login自由命名
  const isLogin = localStorage.ele_login ? true : false;
  //判断访问的页面，如果是登录页面就正常跳转
  if(to.path == '/login'){
    next();
  }else{
    //如果访问的是其他路径，则判断登录状态再决定访问路径
    isLogin ? next() : next('/login');
  }
})



export default router;
