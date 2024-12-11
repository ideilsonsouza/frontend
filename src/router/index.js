import appRouters from '@/app/router';
import AppLayout from '@/layout/AppLayout.vue';
import { authStored } from '@/store/auth';
import { settingsStored } from '@/store/settings';
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
                ...appRouters
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


router.beforeEach(async (to, from, next) => {
    try {
        const settings = settingsStored();
        const auth = authStored();

        if (settings.platform.auth) {
            // Verifica se a rota é protegida
            if (!to.meta.unprotected) {
                // Valida o estado de autenticação
                // Atualiza o estado `isAuth`

                if (!auth.isAuth) {
                    return next('/auth/login'); // Redireciona para login se não autenticado
                } else if (to.meta.admin) {
                    // Verifica se o usuário tem privilégios de admin
                    if (auth.user?.super || auth.user?.team) {
                        return next(); // Permite acesso se for admin
                    } else {
                        return next('/access'); // Redireciona para acesso negado
                    }
                }
            }
        }

        next(); // Permite navegação para rotas não protegidas ou sem restrições
    } catch (error) {
        console.error('Erro durante navegação:', error.message);
        next('/404'); // Redireciona para página de erro em caso de falha
    }
});

export default router;
