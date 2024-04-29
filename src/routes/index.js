import { Default, HeaderOnly, Admin, CustomerLayout } from '~/layouts';
import { Shop, Home, Login, Register, Wishlist, Recover, Reset, Verify } from '~/pages';
import { Detail, Order } from '~/pages/Customer';
import { Dashboard } from '~/pages/Admin';

const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: HeaderOnly,
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
  {
    path: '/login',
    component: Login,
    layout: HeaderOnly,
  },
  {
    path: '/register',
    component: Register,
    layout: HeaderOnly,
  },
  {
    path: '/wishlist',
    component: Wishlist,
    layout: HeaderOnly,
  },
  {
    path: '/customer/details',
    component: Detail,
    layout: CustomerLayout,
  },
  {
    path: '/customer/orders',
    component: Order,
    layout: CustomerLayout,
  },
  {
    path: '/recover',
    component: Recover,
    layout: HeaderOnly,
  },
  {
    path: '/reset-password',
    component: Reset,
    layout: HeaderOnly,
  },
  {
    path: '/verify',
    component: Verify,
    layout: HeaderOnly,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
