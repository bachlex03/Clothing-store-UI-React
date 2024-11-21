import styles from './Side-Product.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Price } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function SideProduct({ product = {}, sale }) {
    return (
        <div className="flex  mt-20px">
            <Link
                to={{
                    pathname: `/products/${product?.product_slug ?? 'demo'}`,
                }}
            >
                <img src={product?.product_imgs[0]?.secure_url} alt="Product" className={cx('img')} />
            </Link>
            <div className={cx('content')}>
                <Link
                    to={{
                        pathname: `/products/${product?.product_slug ?? 'demo'}`,
                    }}
                >
                    <p className={cx('name')}>{product?.product_name ?? 'Pale Blue Drawstring Waist Jersey Shorts'}</p>

                    <div className={cx('stars')}>
                        <i className={cx('star-icon')}>
                            <FontAwesomeIcon icon={faStarSolid} />
                        </i>
                        <i className={cx('star-icon')}>
                            <FontAwesomeIcon icon={faStarSolid} />
                        </i>
                        <i className={cx('star-icon')}>
                            <FontAwesomeIcon icon={faStarSolid} />
                        </i>
                        <i className={cx('star-icon')}>
                            <FontAwesomeIcon icon={faStarSolid} />
                        </i>
                        <i className={cx('star-icon')}>
                            <FontAwesomeIcon icon={faStarSolid} />
                        </i>
                    </div>
                </Link>
                <div className="mt-10">
                    <Price promotion={product?.product_promotion ?? 0} value={product?.product_price ?? 50} sale={sale} fs_15 />
                </div>
            </div>
        </div>
    );
}

export default SideProduct;
