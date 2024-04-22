import style from './Wishlist.module.scss';
import classNames from 'classnames/bind';
import { WishlistItem } from '~/components';

const cx = classNames.bind(style);

function Wishlist() {
  return (
    <div className={cx('container-fluid px-0')}>
      <div className={cx('container-fluid', 'topbar')}>
        <h1 className={cx('title', 'text-center')}>View your wishlist products</h1>
      </div>
      <div className={cx('container-fluid px-4 mb-5')}>
        <div className={cx('content-wishlist')}>
          <div className={cx('row row-cols-1 mx-0')}>
            <WishlistItem />
            <WishlistItem />
            <WishlistItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
