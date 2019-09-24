// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.baseURL = '';   //配置接口地址c
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
router.beforeEach((to,from,next) => {
  if(to.meta.needLogin == true){
    if(window.sessionStorage.data){
      next()
      return
    }
    next('/login')
  }else{
    next()
  }
})
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
