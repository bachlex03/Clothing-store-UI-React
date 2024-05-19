import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import style from './Home.module.scss';

const cx = classNames.bind(style);

function Home() {
  const navigate = useNavigate();

  const [selectedSlider, setSelectedSlider] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedSlider((prev) => (prev === 1 ? 0 : 1));
    }, 5500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useLayoutEffect(() => {
    if (window.location.href.endsWith('/')) {
      navigate('/home');
    }
  }, []);

  return (
    <Fragment>
      {/* Slider */}
      <section className={cx('slider')}>
        <div className={selectedSlider === 0 ? cx('slider-item', 'active') : cx('slider-item')}>
          <div className={selectedSlider === 0 ? cx('img-wrapper', 'active') : cx('img-wrapper')}>
            <img src="slider-1-scaled.webp" alt="Image Slider 1" />
          </div>
          <div className={selectedSlider === 0 ? cx('text-wrapper', 'active') : cx('text-wrapper')}>
            <div className={cx('text-line')}>You can have anything you want If you dress for it.</div>
            <div className={cx('text-title')}>
              Inspired By Nature &
              <br />
              Crafted With Love
            </div>
            <div className={cx('shop-now')}>
              <Link to="/shop" className={cx('btn', 'btn-accent', 'text-black', 'btn-hover-primary')}>
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className={selectedSlider === 1 ? cx('slider-item', 'active') : cx('slider-item')}>
          <div className={selectedSlider === 1 ? cx('img-wrapper', 'active') : cx('img-wrapper')}>
            <img src="slider-2.webp" alt="Image Slider 1" />
          </div>
          <div className={selectedSlider === 1 ? cx('text-wrapper', 'active') : cx('text-wrapper')}>
            <div className={cx('text-line')}>You can have anything you want If you dress for it.</div>
            <div className={cx('text-title')}>
              Outrageous Fashion
              <br />
              Always For You!
            </div>
            <div className={cx('shop-now')}>
              <Link to="/shop" className={cx('btn', 'btn-accent', 'text-black', 'btn-hover-primary')}>
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className={cx('related-products-container')}>
        <div className={cx('related-products-content')}>
          <div className={cx('text-heading')}>Featured Product</div>
          <div className={cx('products-container')}>Check out our latest products</div>
        </div>
      </section>
    </Fragment>
  );
}

export default Home;
