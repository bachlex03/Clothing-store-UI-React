import { Default, HeaderOnly, Admin } from '~/layouts';
import { Shop, Home, Cart, Details, Checkout } from '~/pages';
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
    layout: Default,
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
  {
    path: '/cart',
    component: Cart,
    layout: HeaderOnly,
  },
  {
    path: '/products/:slug',
    component: Details,
    layout: HeaderOnly,
  },
  {
    path: '/checkout',
    component: Checkout,
    layout: HeaderOnly,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
