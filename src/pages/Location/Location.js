import style from './Location.module.scss';
import classNames from 'classnames/bind';
import React, { useRef, useEffect, useState } from 'react';
import {
  faFacebook, faInstagram, faTiktok, faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(style);

const slides = [
  {
    quote: "Love it! It's knitted from extra fine mulesing free Merino wool and really has kept its shape over time. Can't wait to buy some more colours and new awesome styles!",
    author: "LOLA DARK"
  },
  {
    quote: "You can never take too much care over the choice of your shoes. Too many women think they are unimportant, but the real proof of an elegant woman is what is on her feet.",
    author: "CHRISTIAN DIOR"
  }
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <div className="slide">
        <div className={cx('slider-quote')}>{slides[currentSlide].quote}</div>
        <div> - {slides[currentSlide].author} - </div>
      </div>
    </div>
  );
};


function Location() {
  return (
    <div className={cx('container')}>
      <div className={cx('image-container')}>
        <img className={cx('')} src="https://lh7-us.googleusercontent.com/o7f-74RbKcMtyIHOpPL0CRLIc2Wdh3u0yjPtBMNRcJTBAtB0Op7a2OsME9UBYCxYXekyU9zO-lN8w-k00NpK0EvcVqQJL6Nt99qzS1wLUZQQwBbcPom7STrLAqnTt0ONphue4Eu8zklBfos6KdkqYKg" />
        <p className={cx('image-location')}>Store Locations</p>
      </div>
      <div className={cx('grid wide')}>
        {/* SLIDER */}
        <div className={cx('background1', 'row')}>
          <div className={cx('col l-o-3 l-6 m-12 c-12', 'center')}>
            <Slideshow/>
          </div>
        </div>
        <div className={cx('row', 'divide')}></div>
        {/* LOCATION 1 */}
        <div className={cx('background', 'row')}>
          <div className={cx('col l-5 m-12 c-12', 'content')}>
            <p className={cx('title')}>New York</p>
            <p className={cx('info')}>Our new store now: 2307 Beverley Rd Brooklyn, New York</p>
            <div className={cx('row', 'mg-bt')}>
              <p className={cx('col l-4')}>Week Days</p>
              <p className={cx('al', 'col l-4 l-o-4')}>09.00 - 24:00</p>
            </div>
            <div className={cx('row', 'mg-bt')}>
              <p className={cx('col l-4')}>Saturday</p>
              <p className={cx('al', 'col l-4 l-o-4')}>08:00 - 03.00</p>
            </div>
            <div className={cx('row', 'mg-bt')}>
              <p className={cx('col l-4')}>Sunday</p>
              <p className={cx('al', 'col l-4 l-o-4')}>Day off</p>
            </div>
            <a href="#" className={cx('button')}>GET DIRECTIONS</a>
          </div>
          <img className={cx('type1', 'col l-7 m-0 c-0')} src="https://demo.cmssuperheroes.com/themeforest/chani/wp-content/uploads/elementor/thumbs/banner-11-qh2ydna95c5ll3wk5e2wv7pdwzoy3p0xkrev3klnee.webp" />
        </div>
        <div className={cx('row', 'divide')}></div>
        {/* LOCATION 2 */}
        <div className={cx('background', 'row')}>
          <img className={cx('type1', 'col l-7 m-0 c-0')} src="https://demo.cmssuperheroes.com/themeforest/chani/wp-content/uploads/elementor/thumbs/banner-13-qh2ydq3rpu9gjxsgoxaskozrp5b1qsc4l5dbjehgvq.webp" />
          <div className={cx('col l-5 m-12 c-12', 'content')}>
            <p className={cx('title')}>US Store</p>
            <p className={cx('info')}>Our new store now: 2307 Beverley Rd Brooklyn, New York</p>
            <div className={cx('row', 'mg-bt')}>
              <p className={cx('col l-4')}>Week Days</p>
              <p className={cx('al', 'col l-4 l-o-4')}>09.00 - 24:00</p>
            </div>
            <div className={cx('row', 'mg-bt')}>
              <p className={cx('col l-4')}>Saturday</p>
              <p className={cx('al', 'col l-4 l-o-4')}>08:00 - 03.00</p>
            </div>
            <div className={cx('row', 'mg-bt')}>
              <p className={cx('col l-4')}>Sunday</p>
              <p className={cx('al', 'col l-4 l-o-4')}>Day off</p>
            </div>
            <a href="#" className={cx('button')}>GET DIRECTIONS</a>
          </div>
        </div>
        <div className={cx('row', 'divide')}></div>
        {/* LOCATION 3 */}
        <div className={cx('background', 'row')}>
          <div className={cx('col l-5 m-12 c-12', 'content')}>
            <p className={cx('title')}>Chicago</p>
            <p className={cx('info')}>Our new store now: 2307 Beverley Rd Brooklyn, New York</p>
            <div className={cx('row', 'mg-bt')}>
              <p className={cx('col l-4')}>Week Days</p>
              <p className={cx('al', 'col l-4 l-o-4')}>09.00 - 24:00</p>
            </div>
            <div className={cx('row', 'mg-bt')}>
              <p className={cx('col l-4')}>Saturday</p>
              <p className={cx('al', 'col l-4 l-o-4')}>08:00 - 03.00</p>
            </div>
            <div className={cx('row', 'mg-bt')}>
              <p className={cx('col l-4')}>Sunday</p>
              <p className={cx('al', 'col l-4 l-o-4')}>Day off</p>
            </div>
            <a href="#" className={cx('button')}>GET DIRECTIONS</a>
          </div>
          <img className={cx('type1', 'col l-7 m-0 c-0')} src="https://demo.cmssuperheroes.com/themeforest/chani/wp-content/uploads/elementor/thumbs/instagram-6-qh2ydq3rpu9gjxsgoxaskozrp5b1qsc4l5dbjehgvq.jpg" />
        </div>
      </div>
      <div className={cx('row', 'divide')}></div>
      <div className={cx('row', 'divide')}></div>
      <div className={cx('grid wide', 'bd-under')}>
        {/* SUBCRIBE */}
        <div className={cx('background1', 'fb-center', 'row')}>
          <div className={cx('col l-3 m-3 c-0', 'center')}>
            <p className={cx('fb-title')}>Contact Us</p>
            <p className={cx('fb-info', 'fd-pdbt')}>Email: chani@cmssuperheroes.com</p>
            <p className={cx('fb-info')}>Phone: 02 01061245741</p>
          </div>
          <div className={cx('col l-6 m-6 c-12', 'center')}>
            <p className={cx('fb-title3', 'bd-2s')}> Subscribe To Our Newsletter</p>
            <div className={cx('fb-mg2', 'row')}>
              <div className={cx('pd-r', 'col l-5 l-o-2 m-12 c-12')}>
                <input className={cx('fb-input3')} type="text" placeholder="Your Email Address" />
              </div>
              <a href="#" className={cx('button', 'wh', 'col l-3 m-12 c-12')}>SUBCRIBE</a>
            </div>
            <p>By subscribing, you accept the Privacy Policy</p>
            <FontAwesomeIcon className={cx('icon')} icon={faFacebook} />
            <FontAwesomeIcon className={cx('icon')} icon={faInstagram} />
            <FontAwesomeIcon className={cx('icon')} icon={faTiktok} />
            <FontAwesomeIcon className={cx('icon')} icon={faTwitter} />
          </div>
          <div className={cx('col l-3 m-3 c-0', 'center')}>
            <p className={cx('fb-title')}>Our store</p>
            <p className={cx('fb-info', 'fd-pdbt')}>2307 Beverley Rd Brooklyn, New York</p>
            <p className={cx('fb-info')}>11226 United States.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Location;