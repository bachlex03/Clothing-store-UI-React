import style from './Product.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Price, Text } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { add, update } from '~/redux/features/cart/cartSlice';
import { add as addToWishlist, remove as removeFromWishlist } from '~/redux/features/wishlist/wishlistSlice';

const cx = classNames.bind(style);

function Product({ product, children, ...passProps }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.values);

  // check if product is in wishlist, return true if it is
  const checkWishlist = (product) => {
    return wishlistItems.some((item) => item._id === product._id);
  };

  // if product is in wishlist, set isWishlist to true else false
  const [isWishlist, setIsWishlist] = useState(checkWishlist(product) ?? false);

  // handle add to wishlist
  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  // handle remove from wishlist
  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishlist(product));
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('img-wrapper')}>
        <div className="relative">
          <i className={cx('wishlist-top', 'icon')} liked={isWishlist ? '' : false}>
            {isWishlist ? <FontAwesomeIcon icon={faHeartSolid} /> : ''}
          </i>
          {product?.promotion ? <span className={cx('tag')}>-{product.promotion}% OFF</span> : ''}

          <Link to={`/products/${product?.product_slug ?? '#'}`}>
            <img src={product.product_imgs[0]?.secure_url ?? images.demoShopImg} className={cx('img')} alt="" />
          </Link>
        </div>
        <div className={cx('actions')}>
          <i
            className={cx('icon')}
            onClick={() => {
              let newIsWishlist = !isWishlist;
              newIsWishlist ? handleAddToWishlist(product) : handleRemoveFromWishlist(product);
              setIsWishlist(newIsWishlist);
            }}
            liked={isWishlist ? '' : false}
          >
            {isWishlist ? <FontAwesomeIcon icon={faHeartSolid} /> : <FontAwesomeIcon icon={faHeartRegular} />}
          </i>
          <Link to={product?.product_slug ?? '#'}>
            <p className={cx('select-text')}>
              <Text>Select options</Text>
            </p>
          </Link>
          <i className={cx('icon')}>
            <FontAwesomeIcon icon={faEye} />
          </i>
        </div>
      </div>

      <span className={cx('category')}>{product?.product_category?.category_name ?? 'Category'}</span>

      <p className={cx('name')}>{product?.product_name ?? 'Default Sunflower'}</p>
      <div className={cx('price-component')}>
        <Price value={100} pos_shop />
      </div>
    </div>
  );
}

export default Product;
