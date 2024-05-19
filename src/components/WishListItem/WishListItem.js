import style from './WishListItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { remove as removeFromWishlist } from '~/redux/features/wishlist/wishlistSlice';

const cx = classNames.bind(style);

function WishListItem({ product }) {
  const dispatch = useDispatch();

  const cloudinaryTransformation = 'c_fill,h_280,w_180,q_100';
  const productImgUrl = product.product_imgs[0]?.secure_url.replace('/upload/', `/upload/${cloudinaryTransformation}/`);
  const productImgUrlHover = product.product_imgs[1]?.secure_url.replace(
    '/upload/',
    `/upload/${cloudinaryTransformation}/`,
  );

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeFromWishlist(product));
  };

  return (
    <>
      <td className={cx('product-remove')}>
        <a href="#" onClick={handleDelete}>
          <i className="bi bi-x" style={{ fontSize: '20px' }}></i>
        </a>
      </td>
      <td className={cx('product-thumbnail')}>
        <div className={cx('figure')}>
          <img
            src={productImgUrl}
            alt={product.product_name ?? 'product'}
            className={cx('image-main')}
            loading="lazy"
          />
          <img
            src={productImgUrlHover}
            alt={product.product_name ?? 'product'}
            className={cx('image-hover')}
            loading="lazy"
          />
        </div>
      </td>
      <td className={cx('product-name')}>{product.product_name}</td>
      <td>{product.product_price}</td>
      <td className={cx('product-quantity')}>{product.product_status}</td>
      <td className={cx('product-total')}>
        <div className={cx('button-block')}>
          <Link
            to={`/products/${product?.product_slug ?? '#'}`}
            className={cx('button', 'quickview-btn', 'text-btn')}
            style={{ width: '100%' }}
          >
            View Detail
          </Link>
        </div>
      </td>
    </>
  );
}

export default WishListItem;
