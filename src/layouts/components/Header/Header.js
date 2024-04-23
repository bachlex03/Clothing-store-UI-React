import style from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAngleDown, faRightToBracket, faAddressCard, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

import { Search } from '~/components';
import images from '~/assets/images';
const cx = classNames.bind(style);

function Header() {
  const [light, setLight] = useState('');
  const [logo, setLogo] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(0);

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
          <ul className={cx('list')}>
            <li>
              <Link href="/home" light={light}>
                Home{' '}
              </Link>
            </li>

            <li>
              <Link href="#" light={light}>
                Shop
                <i className={cx('nav-icon')}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </i>
              </Link>
            </li>

            <li>
              <Link href="#" light={light}>
                Product
                <i className={cx('nav-icon')}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </i>
              </Link>
            </li>

            <li>
              <Link href="#" light={light}>
                Pages
                <i className={cx('nav-icon')}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </i>
              </Link>
            </li>

            <li>
              <Link href="#" light={light}>
                Blog
                <i className={cx('nav-icon')}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </i>
              </Link>
            </li>

            <li>
              <Link href="#" light={light}>
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
                <Search />
              </div>
              <i className={cx('icon-header', 'ti-search')}></i>
            </div>

            {/* Wishlist */}
            <div className={cx('wishlist')}>
              <i className={cx('icon-header')}>
                <FontAwesomeIcon icon={faHeart} />
              </i>
            </div>

            {/* Cart */}
            <div className={cx('cart')}>
              <div className={cx('cart-component')}>{/* <Search /> */}</div>
              <i className={cx('icon-header', 'cart-icon', 'ti-shopping-cart')}></i>
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
