import Vue from 'vue'
import VueRouter from 'vue-router'
import Inedx from '../views/Index.vue'
import merchant from '../views/Merchant.vue'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {path: '/',name: 'Inedx',component: Inedx,
      children:[
        {path: '/',name: 'message',component: () => import('../views/Message.vue')},
        {path: '/Comment',name: 'Comment',component: () => import('../views/Comment.vue')},
        {path: '/merchant',name: 'merchant',component: merchant,},
      ]},
  ]
})

export default router
