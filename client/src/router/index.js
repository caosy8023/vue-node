import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Comment from '@/components/Comment'
import User from '@/components/User'
import ShopCar from '@/components/ShopCar'
import Order from '@/components/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/index',
      redirect:'/home/index',
      component: Index
    },
    {
      path: '/home/index',
      name: 'Index',
      component: Index,
      meta:{
        keepAlive:true,
        needLogin:true
      }
    },
    {
      path: '/home/comment',
      name: 'Comment',
      component: Comment,
      meta:{
        keepAlive:true,
        needLogin:true
      }
    },
    {
      path: '/user/index',
      name: 'User',
      component: User,
      meta:{
        keepAlive:true,
        needLogin:true
      }
    },
    {
      path: '/shopcar/index',
      name: 'ShopCar',
      component: ShopCar,
      meta:{
        keepAlive:true,
        needLogin:true
      }
    },
    {
      path: '/order/index',
      name: 'Order',
      component: Order,
      meta:{
        keepAlive:true,
        needLogin:true
      }
    }
  ]
})
