import style from './Footer.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';
import { Fragment } from 'react';
const cx = classNames.bind(style);

function Footer() {
  return (
    <Fragment>
      <div className={cx('wrapper')}>
        <div className={cx('content-top', 'row')}>
          <div className={cx('left-block', 'col l-6')}>
            <h3 className={cx('heading')}>About Our Store</h3>
            <p className={cx('text')}>
              Our values in Chani are upheld within high quality tailoring, fabric insight and innovative design
              alongside the desire for innovative and the natural beauty with versatility and top of mind allowing for
              the investment pieces.
            </p>
            <div className={cx('accepted-payment')}>
              <span className={cx('card-img')}>
                <img src={images.card1} alt="" />
              </span>
              <span className={cx('card-img')}>
                <img src={images.card2} alt="" />
              </span>
              <span className={cx('card-img')}>
                <img src={images.card3} alt="" />
              </span>
              <span className={cx('card-img')}>
                <img src={images.card4} alt="" />
              </span>
              <span className={cx('card-img')}>
                <img src={images.card5} alt="" />
              </span>
            </div>
          </div>
          <div className={cx('right-block', 'col l-6')}>
            <div className="row">
              <div className="col l-4">
                <p className={cx('heading-list')}>Shop</p>
                <ul className={cx('list')}>
                  <li>
                    <Link>Dresses</Link>
                  </li>
                  <li>
                    <Link>T-shirts</Link>
                  </li>
                  <li>
                    <Link>Bouses</Link>
                  </li>
                  <li>
                    <Link>Outerwear</Link>
                  </li>
                  <li>
                    <Link>Accessories</Link>
                  </li>
                  <li>
                    <Link>Knitwear</Link>
                  </li>
                  <li>
                    <Link>Pants</Link>
                  </li>
                </ul>
              </div>
              <div className="col l-4">
                <p className={cx('heading-list')}>Links</p>
                <ul className={cx('list')}>
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>Store locations</Link>
                  </li>
                  <li>
                    <Link>Shipping & Returns</Link>
                  </li>
                  <li>
                    <Link>Sustainability</Link>
                  </li>
                  <li>
                    <Link>Help & FAQS</Link>
                  </li>
                  <li>
                    <Link>Contact</Link>
                  </li>
                </ul>
              </div>
              <div className="col l-4">
                <p className={cx('heading-list')}>Help</p>
                <ul className={cx('list')}>
                  <li>
                    <Link>Privacy policy</Link>
                  </li>
                  <li>
                    <Link>Return policy</Link>
                  </li>
                  <li>
                    <Link>Order status</Link>
                  </li>
                  <li>
                    <Link>Gift cards</Link>
                  </li>
                  <li>
                    <Link>Size guide</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('content-bottom')}>
        <div className="flex">
          <div className="flex align-center mr-12px">
            <p className={cx('bottom-text', 'mr-8px')}>United States (USD $)</p>
            <i className={cx('arrow-down-icon')}>
              <FontAwesomeIcon icon={faAngleDown} />
            </i>
          </div>
          <div className="flex align-center">
            <p className={cx('bottom-text', 'mr-8px')}>English</p>
            <i className={cx('arrow-down-icon')}>
              <FontAwesomeIcon icon={faAngleDown} />
            </i>
          </div>
        </div>

        <div>
          <p className={cx('bottom-text')}>©2024 Chani, All Rights Reserved. With Love by CMSSuperHeroes</p>
        </div>
      </div>
    </Fragment>
  );
}

export default Footer;
