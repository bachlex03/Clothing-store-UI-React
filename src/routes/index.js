import { Default, HeaderOnly, Admin, Shop as ShopLayout } from '~/layouts';
import { Shop, Home } from '~/pages';
import { Products, Invoices } from '~/pages/Admin';

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
    layout: ShopLayout,
  },
  {
    path: '/admin/products',
    component: Products,
    layout: Admin,
  },
  {
    path: '/admin/invoices',
    component: Invoices,
    layout: Admin,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
