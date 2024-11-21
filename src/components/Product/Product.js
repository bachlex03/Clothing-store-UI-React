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

    const getUrlImage = (product) => {
        if (product.product_imgs.length > 0) {
            const splitURL = product.product_imgs[0]?.secure_url?.split('/upload/');
            return `${splitURL[0]}/upload/h_884,w_690/${splitURL[1]}`;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-wrapper')}>
                <div className="relative">
                    <i className={cx('wishlist-top', 'icon')} liked={isWishlist ? '' : false}>
                        {isWishlist ? <FontAwesomeIcon icon={faHeartSolid} /> : ''}
                    </i>
                    {product?.current_discount ? <span className={cx('tag')}>-{product.current_discount}% OFF</span> : ''}

                    <Link to={`/products/${product?.product_slug ?? '#'}`}>
                        <img src={getUrlImage(product)} className={cx('img')} alt={`${product?.product_name || 'Product'}`} />
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
                    <Link to={`/products/${product?.product_slug}` ?? '#'}>
                        <p className={cx('select-text')}>
                            <Text>Select options</Text>
                        </p>
                    </Link>
                    <Link to={`/products/${product?.product_slug}` ?? '#'}>
                        <i className={cx('icon', 'eye-icon')}>
                            <FontAwesomeIcon icon={faEye} />
                        </i>
                    </Link>
                </div>
            </div>

            <span className={cx('category')}>{product?.product_category?.category_name ?? 'Category'}</span>

            <p className={cx('name')}>{product?.product_name ?? 'Default Sunflower'}</p>
            <div className={cx('price-component')}>
                {product?.current_discount ? (
                    <Price value={product?.product_price ?? 100} promotion={product?.current_discount} pos_shop />
                ) : (
                    <Price value={product?.product_price ?? 100} pos_shop />
                )}
            </div>
        </div>
    );
}

export default Product;
