import { Default, HeaderOnly } from '~/layouts';
import { Shop, Home, Login } from '~/pages';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: HeaderOnly,
    },
    {
        path: '/home',
        component: Home,
        layout: HeaderOnly,
    },
    {
        path: '/shop',
        component: Shop,
        layout: Default,
    },
    {
        path: '/login',
        component: Login,
        layout: Default,
    },
];

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
