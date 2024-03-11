import { Default, HeaderOnly } from '~/layouts';
import { Header } from '~/layouts/components';
import { Shop, Home, Cart } from '~/pages';

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
    path: '/cart',
    component: Cart,
    layout: HeaderOnly,
  },
];

const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
