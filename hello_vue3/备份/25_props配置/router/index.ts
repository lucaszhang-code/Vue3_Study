// 创建一个路由器并暴露出去

// 引入：createRouter
import {createRouter, createWebHistory} from 'vue-router'
// 引入一个一个可能要呈现的组件
import Home from "../pages/Home.vue";
import News from "../pages/News.vue";
import About from "../pages/About.vue";
import Detail from "../pages/Detail.vue";

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
            component: News,
            children: [
                {
                    name: 'xiangqing',
                    path: 'detail/:id/:title/:content?',
                    component: Detail,
                    // 第一种写法，将路由写的所有params参数作为props传给组件
                    // props: true

                    // 第二种写法：函数写法，可以自己决定讲什么作为props给路由组件
                    // props(route) {
                    //     return route.query
                    // }
                    // 对象写法，可以自己决定将什么作为props给路由组件
                    props:{

                    }

                }
            ]
        }
    ]
})

// 暴露出去router
export default router;

