import style from './CustomerSidebar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function CustomerSidebar() {
  return (
    <ul className={cx('nav')}>
      <li>
        <Link to="/customer/details" className={cx('link')}>
          Account details
        </Link>
      </li>
      <li>
        <Link to="/customer/addresses" className={cx('link')}>
          Addresses
        </Link>
      </li>
      <li>
        <Link to="/customer/orders" className={cx('link')}>
          Orders
        </Link>
      </li>
      <li>
        <Link to="/wishlist" className={cx('link')}>
          Wishlist
        </Link>
      </li>
    </ul>
  );
}

export default CustomerSidebar;
