import { Default, HeaderOnly, Admin } from '~/layouts';
import { Shop, Home } from '~/pages';
import { Dashboard } from '~/pages/Admin';

const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: Default,
  },
  {
    path: '/home',
    component: Home,
    layout: Default,
  },
  {
    path: '/shop',
    component: Shop,
    layout: Default,
  },
  {
    path: '/admin/dashboard',
    component: Dashboard,
    layout: Admin,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
