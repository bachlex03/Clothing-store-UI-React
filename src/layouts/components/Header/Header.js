import style from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAngleDown, faRightToBracket, faAddressCard, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove as removeUser } from '~/redux/features/user/userSlice';
import { toast } from 'sonner';

import { Search, CategoryHeader, Cart, Text } from '~/components';

import images from '~/assets/images';
const cx = classNames.bind(style);

let timer;

function Header({ animation = false, blur = false, light = null, color, lightLogo = false }) {
    const [lightEffect, setLightEffect] = useState(light);
    const [logo, setLogo] = useState(false);
    const [blurEffect, setBlurEffect] = useState(blur);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [scrollPosition, setScrollDirection] = useState('top');

    const categoriesRef = useRef();
    const cartRef = useRef();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.information);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!animation) {
            setLightEffect('');
            setLogo(true);

            return;
        }
        let lastScrollTop = 0;

        const handleScroll = () => {
            let st = window.pageYOffset;

            if (st > lastScrollTop) {
                setScrollDirection('down');
            } else if (st < lastScrollTop) {
                setScrollDirection('up');
            }
            if (st < 100) {
                setLightEffect(null);

                setLogo(false);
            } else {
                setLightEffect('');

                if (!lightLogo) {
                    setLogo(true);
                }
            }

            lastScrollTop = st;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleDisplay = (current) => {
        if (!current) return;

        let closed = current.getAttribute('closing');

        if (closed) {
            current.setAttribute('display-non', '');
        }
    };

    const handleOpen = (current) => {
        if (!current) return;

        current.removeAttribute('display-non');

        current.removeAttribute('closing');

        current.setAttribute('opening', '');
    };

    const handleClose = (current) => {
        if (!current) return;

        clearTimeout(timer);

        timer = null;

        current.removeAttribute('opening');

        current.setAttribute('closing', true);

        current.removeEventListener('animationend', () => { });
    };

    const classes = cx('header-component', {
        show: scrollPosition === 'up',
        hide: scrollPosition === 'down',
        top: scrollPosition === 'top',
    });

    return (
        <div className={cx('container')}>
            <div className={cx('sub')}>
                <p className={cx('left-text')}>Free shipping on US orders $100+ & Free exchanges</p>

                <div className={cx('auth-actions')}>
                    <Link
                        to={user ? '/shop' : '/login'}
                        onClick={() => {
                            setLightEffect(null);
                            if (user) {
                                // remove token from local storage
                                localStorage.removeItem('token');
                                // remove user from redux store
                                dispatch(removeUser());
                                console.log('User logged out');
                            }
                        }}
                    >
                        <i className={cx('icon')}>
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </i>
                        {user ? 'Logout' : 'Login'}
                    </Link>
                    <Link
                        to={user ? '/customer/details' : '/login'}
                        onClick={() => {
                            if (!user) {
                                toast.error('Please login to view your account');
                            }
                        }}
                    >
                        <i className={cx('icon')}>
                            <FontAwesomeIcon icon={faAddressCard} />
                        </i>
                        My Account
                    </Link>
                </div>
            </div>

            <div
                className={cx('main', {
                    blur,
                })}
                light={lightEffect}
            >
                <nav>
                    <ul className={cx('list-header')}>
                        <li className={cx('header-item')}>
                            <Link className={cx('header-link')} href="/home" light={lightEffect}>
                                <p className={cx('header-link-text')}>Home</p>
                            </Link>
                        </li>

                        <li
                            className={cx('header-item', 'shop-header')}
                            onMouseOver={(e) => {
                                if (!timer) {
                                    timer = setTimeout(() => {
                                        handleOpen(categoriesRef.current);
                                    }, 200);
                                }
                            }}
                            onMouseLeave={(e) => {
                                handleClose(categoriesRef.current);
                            }}
                        >
                            <Link className={cx('header-link')} to={'/shop'} light={lightEffect}>
                                <p className={cx('header-link-text')}>
                                    Shop
                                    <i className={cx('nav-icon')}>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </i>
                                </p>
                            </Link>

                            <div
                                display-non="true"
                                className={cx('category-header-component')}
                                ref={categoriesRef}
                                onMouseMove={(e) => {
                                    e.stopPropagation();
                                }}
                                onAnimationEnd={() => {
                                    handleDisplay(categoriesRef.current);
                                }}
                            >
                                <CategoryHeader handleClose={handleClose(categoriesRef.current)} />
                            </div>
                        </li>

                        <li className={cx('header-item')}>
                            <Link className={cx('header-link')} href="#" light={lightEffect}>
                                <p className={cx('header-link-text')}>About Us</p>
                            </Link>
                        </li>

                        <li className={cx('header-item')}>
                            <Link className={cx('header-link')} href="#" light={lightEffect}>
                                <p className={cx('header-link-text')}>Blog</p>
                            </Link>
                        </li>

                        <li className={cx('header-item')}>
                            <Link className={cx('header-link')} href="#" light={lightEffect}>
                                <p className={cx('header-link-text')}>
                                    Pages
                                    <i className={cx('nav-icon')}>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </i>
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div>
                    <img src={logo ? images.logoDark : images.logo} alt="" />
                </div>

                <div className={cx('actions-wrapper')}>
                    <div className={cx('user-actions')}>
                        {/* Search */}

                        <div className={cx('search')}>
                            <div className={cx('search-component')}>
                                <Search light={lightEffect} color={color} />
                            </div>
                        </div>

                        {/* Wishlist */}
                        <div className={cx('wishlist')}>
                            <Link to="/wishlist">
                                <i className={cx('icon-header', 'ti-heart')} light={lightEffect} blur={blurEffect}></i>
                            </Link>
                        </div>

                        {/* Cart */}
                        <div
                            className={cx('cart')}
                            onMouseMove={() => {
                                handleOpen(cartRef.current);
                            }}
                            onMouseLeave={() => {
                                handleClose(cartRef.current);
                            }}
                        >
                            <Link to="/cart">
                                <i
                                    className={cx('icon-header', 'cart-icon', 'ti-shopping-cart')}
                                    light={lightEffect}
                                    blur={blurEffect}
                                ></i>
                                {/* <span className={cx('quantity')}>{cartQuantity}</span> */}
                            </Link>

                            <div
                                className={cx('cart-component')}
                                display-non="true"
                                onMouseMove={(e) => {
                                    e.stopPropagation();
                                }}
                                ref={cartRef}
                                onAnimationEnd={handleDisplay(cartRef.current)}
                            >
                                <Cart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
