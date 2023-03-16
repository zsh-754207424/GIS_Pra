import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import c from '../views/c.vue'
var deVue = "c"
//定义routes路由的集合，数组类型
const routes=[
  /*{
    path:'/',
    component:computer,
    children: [
      {
        path: "phone",
        component: phone
      },
      {
        path: "computer",
        component: computer
      },
    ]
  },*/
  //单个路由均为对象类型，path代表的是路径，component代表组件
  {path:'/c',component:c},
  //默认显示的页面设置
  //可以配置重定向
  {path:'',redirect:deVue},
  //{path:'',redirect:"/AksuGis"},
  //或者重新写个路径为空的路由
  //{path:"",component:page1}
  //{path:"/user/:name",component:user}
]

//实例化VueRouter并将routes添加进去
const router=new VueRouter({
//ES6简写，等于routes：routes
  routes
});
//抛出这个这个实例对象方便外部读取以及访问
export default router
