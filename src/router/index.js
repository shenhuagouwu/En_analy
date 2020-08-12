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
/* 1. 定义路由组件 */
import Layout from '@/layout';

Vue.use(Router);

/* 2. 定义路由 */
const routes = [
    {
        path: '/',
        redirect: '/Enpromotion',
        component: Layout,
        children: [
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
                    }
                ]
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
/* 5. 暴露出该文件 */
export default router;