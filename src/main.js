import Vue from 'vue'
import App from './App.vue'

// import {Row,Button,Container,Aside,Header,Main} from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router/index'

import store from './store/index'

import './api/mock.js'

// 引入cookie
import Cookie from 'js-cookie'

Vue.config.productionTip = false

// Vue.use(Row)
// Vue.use(Button)
// Vue.use(Container)
// Vue.use(Aside)
// Vue.use(Header)
// Vue.use(Main)
Vue.use(ElementUI)

// 添加全局前置导航守卫（建议写在路由配置文件中）
router.beforeEach((to,from,next) => {
  // 判断token存不存在
  const token = Cookie.get('token')

  // token 不存在,说明当前用户是未登录,应该跳回登录页面
  if(!token && to.name !== 'login') {
    next({name: 'login'})
  }else if(token && to.name === 'login'){ // 如果token存在，说明用户登录，此时跳转至首页
    next({ name: 'home'})
  }else{
    next();
  }
})



const vm = new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('ADD_ROUTERS',router)
  }
})

vm.$mount('#app')
