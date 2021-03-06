/*
 * @Author: your name
 * @Date: 2020-05-14 16:27:38
 * @LastEditTime: 2020-06-06 11:24:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \git_Enxlsx\src\router\index.js
 */ 
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
/* 1. 定义路由组件 */
import Layout from '@/layout';
Vue.use(Router);

/* 2. 定义路由 */
const routes = [
    {
        path: "/login",
        component: () => import('@/views/login/login'),
        name: 'LoginPage',
    },
    {
        path: '/',
        redirect: '/default',
        component: Layout,
        children: [
            {
                path: 'default',
                component: () => import('@/views/default/default'),
                name: 'defaultPage',
            },
            {
                path: '/Enpromotion',
                component: () => import('@/views/Enpromotion/index'),
                name: 'EnpromotionPage',
                children: [
                    {
                        path: '/Enpromotion',
                        component: () => import('@/views/Enpromotion/enalldata'),
                        name: 'enalldataPage',
                    },
                    {
                        path: '/Enpromotion/encostRecord',
                        component: () => import('@/views/Enpromotion/encostRecord'),
                        name: 'encostRecordPage',
                    }
                ]
            },
            {
                path: '/SNS',
                component: () => import('@/views/SNS/index'),
                name: 'SNSPage',
                children: [
                    {
                        path: '/SNS',
                        component: () => import('@/views/SNS/alldata'),
                        name: 'snsalldataPage',
                    },
                    {
                        path: '/SNS/Persona',
                        component: () => import('@/views/SNS/Persona'),
                        name: 'snsPersonaPage',
                    }
                ]
            },
            {                
                path: '/longword',
                component: () => import('@/views/longword/index'),
                name: 'longwordPage',
                children: [
                    {
                        path: '/longword',
                        component: () => import('@/views/longword/loalldata'),
                        name: 'loalldataPage',
                    },
                    {
                        path: '/longword/addlong',
                        component: () => import('@/views/longword/addlong'),
                        name: 'addlongPage',
                    },
                    {
                        path: '/longword/longtail',
                        component: () => import('@/views/longword/longtail'),
                        name: 'longtailPage',
                    },
                    {                
                        path: '/longword/PersonalStatistic',
                        component: () => import('@/views/longword/PersonalStatistic'),
                        name: 'personalstatisticPage'
                    },
                    {
                        path: '/longword/DomainTime',
                        component: () => import('@/views/longword/DomainTime'),
                        name: 'DomainTimePage',
                    },
                ]
            },
            {                
                path: '/changePassword',
                component: () => import('@/views/login/ChangePassword'),
                name: 'changePasswordPage'
            }
        ]
    }
];
/* 3. 创建 router 实例 */
const router = new Router({
    /* 4. 传 `routes` 配置，这里是缩写，相当于 routes: routes */
    mode:'history',
    routes
});
var ThereField = '/login';
router.beforeEach(function(to,from,next){
    if (store.state.user.zhanghu!=""&&store.state.user.zhanghu!="undefined") {
        if(to.path === "/login"){
            next({path: "/"});
        }else{
            next();
        }
    } else {
        if(ThereField.indexOf(to.path)!==-1){
            next();
        }else{
            next({
                path: "/login",
            });
        }
    }
});
/* 5. 暴露出该文件 */
export default router;