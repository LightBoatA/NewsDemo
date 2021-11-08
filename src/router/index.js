import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入需要的组件
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'

Vue.use(VueRouter)

const routes = [
  // 主页的路由规则
  { path: '/', component: Home },
  // 用户页的路由规则
  { path: '/user', component: User }
]

const router = new VueRouter({
  routes
})

export default router
