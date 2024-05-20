import { Default, HeaderOnly, Admin, CustomerLayout, Shop as ShopLayout } from '~/layouts';
import { Shop, Home, Login, Wishlist, Recover, Reset, Verify, Cart, Details, Checkout, Contact, Location } from '~/pages';
import { Address, Detail, Order } from '~/pages/Customer';
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
  {
    path: '/location',
    component: Location,
    layout: HeaderOnly,
  },
  {
    path: '/contact',
    component: Contact,
    layout: HeaderOnly,
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
  {
    path: '/login',
    component: Login,
    layout: HeaderOnly,
  },
  {
    path: '/register',
    component: Login,
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
    path: '/customer/addresses',
    component: Address,
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
