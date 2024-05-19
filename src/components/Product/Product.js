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
import { renderCategories } from '~/utils/render-category';

import { useDispatch, useSelector } from 'react-redux';
import { add, update } from '~/redux/features/cart/cartSlice';

const cx = classNames.bind(style);

function Product({ product, children, ...passProps }) {
  const [isWishlist, setIsWishlist] = useState(false);

  // handle add to cart
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.values);

  console.log('cartItems', cartItems);

  const handleAddToCart = (product) => {
    console.log('product', product);

    dispatch(add(product));
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
              setIsWishlist(!isWishlist);
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
      <div
        className={cx('price-component')}
        onClick={() => {
          handleAddToCart(product);
        }}
      >
        <Price value={product?.product_price ?? 100} pos_shop />
      </div>
    </div>
  );
}

export default Product;
