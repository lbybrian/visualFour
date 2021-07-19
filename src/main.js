//主文件，项目入口
//采用vue+element-ui框架
//根据需要引入相关工具类 方便模块引用

import Vue from 'vue'

//引入elmentUI组件
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import 'element-ui/lib/theme-chalk/index.css'

//引入公共样式
import './assets/css/common.css'
//引入阿里巴巴字体图标库
import './assets/css/iconfont.css'


//封装接口
// import config from '../static/config/interface.js';
import Adapter from "./assets/js/adapter";
Vue.prototype.adapter = window.adapter = new Adapter(InterfaceConfig);
// window.tAdapter = webCpu.initAdapter(InterfaceConfig);
Vue.prototype.tAdapter = window.tAdapter = webCpu.initAdapter(InterfaceConfig)


//公共方法
import util from "./assets/js/util.js";
Vue.prototype.util = util;
window.util = util;

//路由
import Router from 'vue-router';
Vue.use(Router);
var routeData = util.transRouteComponent(RouteConfig.admin);

var router = new Router({
        base: __dirname,
        mode: 'hash',
        scrollBehavior: () => ({
            y: 0
        }),
        routes: routeData
    })
    // router.beforeEach((to, from, next) => {
    //   // if(to.path == '/'){
    //   let oUserInfo = JSON.parse(localStorage.getItem('userinfo'));
    //   if (localStorage.getItem('userinfo')) {//toekn存在
    //     if (to.path == '/login') {//token存在，并且是login页面
    //       next('/');
    //     } else {//token存在，不是login页面
    //       next();
    //     }
    //   } else {
    //     if (to.path == '/login') {//token不存在，并且是login页面
    //       next();
    //     } else {//token不存在，不是login页面
    //       next('/login');
    //     }
    //   }
    //   // }
    // })

import App from './App'

//渲染
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})