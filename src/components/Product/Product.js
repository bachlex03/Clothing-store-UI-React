import style from './Product.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Price } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(style);

function Product({ product, children, ...passProps }) {
  const [isWishlist, setIsWishlist] = useState(false);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('img-wrapper')}>
        <img src={images.demoShopImg} className={cx('img')} alt="" />
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
          <p className={cx('select-text')}>Select options</p>
          <i className={cx('icon')}>
            <FontAwesomeIcon icon={faEye} />
          </i>
        </div>
      </div>

      <span className={cx('category')}>category</span>

      <p className={cx('name')}>{children}</p>
      <div className={cx('price-component')}>
        <Price value={100} promotion={20} pos_shop />
      </div>
    </div>
  );
}

export default Product;
