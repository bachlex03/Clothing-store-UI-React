import style from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import { faAngleDown, faRightToBracket, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const cx = classNames.bind(style);

function Header() {
  const [light, setLight] = useState('');

  return (
    <div className={cx('container')}>
      <div className={cx('sub')}>
        <p className={cx('left-text')}>Free shipping on US orders $100+ & Free exchanges</p>

        <div className={cx('auth-actions')}>
          <Link
            href="#"
            onClick={() => {
              setLight(!light);
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
          <img src={light ? images.logoDark : images.logo} alt="" />
        </div>

        <div className={cx('actions-wrapper')}>
          <div className={cx('user-actions')}>
            <div className={cx('search')}>search</div>

            <div className={cx('wishlist')}>wishlist</div>

            <div className={cx('cart')}>cart</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
