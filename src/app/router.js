
const appRouters = [
    {
        path: '/platform/settings',
        name: 'platform_seetings',
        component: () => import('@/app/config/Settings.vue')
    },
    {
        path: '/platform/silderbar',
        name: 'platform_seetings_silderbar',
        component: () => import('@/app/config/Settings.vue')
    }
];

export default appRouters