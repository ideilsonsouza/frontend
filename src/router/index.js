import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { authRouters } from './authRouters';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
            ]
        },
        ...authRouters,

        {
            path: '/404',
            name: 'notfound',
            meta: {
                title: 'Pagina não encontrada',
                unprotected: true,
            },
            component: () => import('@/views/NotFound.vue')
        },

        {
            path: '/:catchAll(.*)',
            redirect: '/404'
        },
    ]
});

export default router;
