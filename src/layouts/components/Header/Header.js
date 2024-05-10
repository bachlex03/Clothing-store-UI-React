import style from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAngleDown, faRightToBracket, faAddressCard, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

import { Search, CategoryHeader } from '~/components';
import images from '~/assets/images';
const cx = classNames.bind(style);

function Header() {
  const [light, setLight] = useState(null);
  const [logo, setLogo] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const [scrollPosition, setScrollDirection] = useState('top');

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      let st = window.pageYOffset;

      console.log(st);

      if (st > lastScrollTop) {
        setScrollDirection('down');
      } else if (st < lastScrollTop) {
        setScrollDirection('up');
      }
      if (st < 100) {
        setLight(null);
        setLogo(false);
      } else {
        setLight('');
        setLogo(true);
      }

      lastScrollTop = st;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            href="#"
            onClick={() => {
              setLight(null);
            }}
          >
            <i className={cx('icon')}>
              <FontAwesomeIcon icon={faRightToBracket} />
            </i>
            Login
          </Link>
          <Link href="#">
            <i className={cx('icon')}>
              <FontAwesomeIcon icon={faAddressCard} />
            </i>
            My Account
          </Link>
        </div>
      </div>

      <div className={cx('main')} light={light}>
        <nav>
          <ul className={cx('list-header')}>
            <li className={cx('header-item')}>
              <Link className={cx('header-link')} href="/home" light={light}>
                Home{' '}
              </Link>
            </li>

            <li className={cx('header-item', 'shop-header')}>
              <Link className={cx('header-link')} href="#" light={light}>
                Shop
                <i className={cx('nav-icon')}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </i>
              </Link>

              <div display-non="true" className={cx('category-header-component')}>
                <CategoryHeader />
              </div>
            </li>

            <li className={cx('header-item')}>
              <Link className={cx('header-link')} href="#" light={light}>
                Product
                <i className={cx('nav-icon')}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </i>
              </Link>
            </li>

            <li className={cx('header-item')}>
              <Link className={cx('header-link')} href="#" light={light}>
                Pages
                <i className={cx('nav-icon')}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </i>
              </Link>
            </li>

            <li className={cx('header-item')}>
              <Link className={cx('header-link')} href="#" light={light}>
                Blog
                <i className={cx('nav-icon')}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </i>
              </Link>
            </li>

            <li className={cx('header-item')}>
              <Link className={cx('header-link')} href="#" light={light}>
                Features
                <i className={cx('nav-icon')}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </i>
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
                <Search light={light} />
              </div>
              <i className={cx('icon-header', 'ti-search')} light={light}></i>
            </div>

            {/* Wishlist */}
            <div className={cx('wishlist')}>
              <i className={cx('icon-header', 'ti-heart')} light={light}></i>
            </div>

            {/* Cart */}
            <div className={cx('cart')}>
              <div className={cx('cart-component')}>{/* <Search /> */}</div>
              <i className={cx('icon-header', 'cart-icon', 'ti-shopping-cart')} light={light}></i>
            </div>
            {/* 
            <div
              className={cx('cart-wrapper', 'icon-wrapper')}
              onMouseMove={handleOpen} onMouseLeave={handleClose}
            >
              <Link to="/cart">
                <i className={cx('icon', 'cart-icon', 'ti-shopping-cart')}></i>
                <span className={cx('quantity')}>{cartQuantity}</span>
              </Link>

              <div
                className={cx('cart-component')}
                display-non="true"
                onMouseMove={(e) => {
                  e.stopPropagation();
                }}
                ref={cartRef}
                onAnimationEnd={handleDisplay}
              >
                <Cart />
              </div>
            </div>
            
            
            
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
