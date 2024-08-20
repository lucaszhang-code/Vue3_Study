// 创建一个路由器并暴露出去

// 引入：createRouter
import {createRouter, createWebHistory} from 'vue-router'
// 引入一个一个可能要呈现的组件
import Home from "../pages/Home.vue";
import News from "../pages/News.vue";
import About from "../pages/About.vue";

// 创建路由器
const router = createRouter({
    history: createWebHistory(),    // 路由器的工作模式（稍后讲解）
    routes: [
        {
            name: 'zhuye',
            path: '/home',
            component: Home
        },
        {
            name: 'guanyu',
            path: '/about',
            component: About
        },
        {
            name: 'xinwen',
            path: '/news',
            component: News
        }
    ]
})

// 暴露出去router
export default router;

