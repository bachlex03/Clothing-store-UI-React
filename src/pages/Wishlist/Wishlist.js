import WishListItem from '~/components/WishListItem';
import style from './Wishlist.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

const cx = classNames.bind(style);

function Wishlist() {
    const wishList = useSelector((state) => state.wishlist.values);

    return (
        <div className={cx('container-fl')}>
            <div className={cx('topbar')}>
                <h1 className={cx('title')}>View your wishlist products</h1>
            </div>
            <div className={cx('container-fl-content')}>
                <div className={cx('content-wishlist')}>
                    <div className={cx('site-blocks-table')}>
                        <h2 className={cx('sub-title')}>
                            My Wishlist <i className="bi bi-suit-heart"></i>
                        </h2>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <th className={cx('product-remove')}></th>
                                    <th className="product-thumbnail"></th>
                                    <th className={cx('product-name')}>Product</th>
                                    <th className="product-price">Price</th>
                                    <th className={cx('product-quantity')}>Stock Status</th>
                                    <th className={cx('product-total')}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishList.map((product) => (
                                    <tr key={product._id}>
                                        <WishListItem product={product} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={cx('social-icon')}>
                    <ul>
                        <li>
                            <a href="#" className="btn btn-black btn-sm">
                                <i className="bi bi-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="btn btn-black btn-sm">
                                <i className="bi bi-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="btn btn-black btn-sm">
                                <i className="bi bi-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="btn btn-black btn-sm">
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
