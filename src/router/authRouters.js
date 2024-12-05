
export const authRouters = [
    {
        path: '/auth/login',
        name: 'auth_login',
        meta: {
            title: 'Fazer Login',
            unprotected: true,
        },
        component: () => import('@/views/auth/Login.vue')
    },
]