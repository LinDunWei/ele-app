import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
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
        {
          path:'/address',
          name: 'address',
          component: ()=> import('./views/Address.vue')
        },
        {
          path: '/city',
          name: 'city',
          component: ()=> import('./views/City.vue')
        }
      ]
    },
    {
      path:'/login',
      name: 'Login',
      component: ()=> import('./views/login.vue')
    },
    {
      path:'/search',
      name: 'Search',
      component: ()=> import('./views/search.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: ()=> import('./views/Shops/shop.vue'),
      redirect: '/goods',
      children:[
        {
          path:'/goods',
          name: 'goods',
          component: ()=> import('./views/Shops/goods.vue')
        },
        {
          path:'/comments',
          name: 'comments',
          component: ()=> import('./views/Shops/comments.vue')
        },
        {
          path:'/seller',
          name: 'seller',
          component: ()=> import('./views/Shops/seller.vue')
        }
      ]
    },
    {
      path:'/myAddress',
      name: 'myAddress',
      component: ()=> import('./views/Oeders/MyAddress.vue')
    },
    {
      path:'/addAddress',
      name: 'addAddress',
      component: ()=> import('./views/Oeders/AddAddress.vue')
    },
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
