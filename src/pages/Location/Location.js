import style from './Location.module.scss';
import classNames from 'classnames/bind';
import React, { useRef, useEffect, useState } from 'react';
const cx = classNames.bind(style);

function Location() {
  // Sử dụng useRef để lưu trữ ref của mỗi section
  const sectionRefs = useRef([]);

  // Sử dụng useEffect để thiết lập ref của mỗi section khi component được render
  useEffect(() => {
    // Lấy tất cả các section
    const sections = document.querySelectorAll('section');
    // Gán ref cho mỗi section
    sectionRefs.current = Array.from(sections).map((_, index) => sectionRefs.current[index] || React.createRef());
  }, []);

  // Hàm xử lý khi cuộn trang
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    // Lặp qua mỗi section để kiểm tra nếu section nào có vị trí gần với vị trí cuộn
    sectionRefs.current.forEach((sectionRef, index) => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionRef.current.offsetHeight) {
          // Nếu section nằm trong vùng nhìn thấy, thực hiện thao tác cần thiết
          console.log(`Section ${index + 1} is in view`);
        }
      }
    });
  };

  // Gắn sự kiện cuộn trang khi component được mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <div className={cx('container')}>
      <div className={cx('image-container')}>
        <img className={cx('')} src="https://www.rollingstone.com/wp-content/uploads/2024/01/Best-Sites-for-Womenswear-15-Gap-1.jpg" />
      </div>

      <div className={cx('grid wide')}>
        <div className={cx('row', 'divide')}></div>
        {/* ITEM1 */}
        <div className={cx('background', 'row')}>
          <div className={cx('col l-5', 'content')}>
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
          <img className={cx('type1', 'col l-7')} src="https://demo.cmssuperheroes.com/themeforest/chani/wp-content/uploads/elementor/thumbs/banner-11-qh2ydna95c5ll3wk5e2wv7pdwzoy3p0xkrev3klnee.webp" />
        </div>
        <div className={cx('row', 'divide')}></div>
        {/* ITEM2 */}
        <div className={cx('background', 'row')}>
          <img className={cx('type1', 'col l-7')} src="https://demo.cmssuperheroes.com/themeforest/chani/wp-content/uploads/elementor/thumbs/banner-13-qh2ydq3rpu9gjxsgoxaskozrp5b1qsc4l5dbjehgvq.webp" />
          <div className={cx('col l-5', 'content')}>
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
        {/* ITEM2 */}
        <div className={cx('background', 'row')}>
          <div className={cx('col l-5', 'content')}>
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
          <img className={cx('type1', 'col l-7')} src="https://demo.cmssuperheroes.com/themeforest/chani/wp-content/uploads/elementor/thumbs/instagram-6-qh2ydq3rpu9gjxsgoxaskozrp5b1qsc4l5dbjehgvq.jpg" />
        </div>
      </div>
      <div className={cx('row', 'divide')}></div>
      <div className={cx('row', 'divide')}></div>
      <div className={cx('grid', 'bd-under')}>
        {/* ITEM1 */}
        <div className={cx('background1', 'fb-center', 'row')}>
          <div className={cx('col l-3', 'center')}>
            <p className={cx('fb-title')}>Contact Us</p>
            <p className={cx('fb-info', 'fd-pdbt')}>Email: chani@cmssuperheroes.com</p>
            <p className={cx('fb-info')}>Phone: 02 01061245741</p>
          </div>
          <div className={cx('col l-6', 'center')}>
            <p className={cx('fb-title3', 'bd-2s')}> Subscribe To Our Newsletter</p>
            <div className={cx('fb-mg2', 'row')}>
              <div className={cx('pd-r', 'col l-5 l-o-2')}>
                <input className={cx('fb-input3')} type="text" placeholder="Your Email Address" />
              </div>
              <a href="#" className={cx('button', 'wh', 'col l-3')}>SUBCRIBE</a>
            </div>
            <p>By subscribing, you accept the Privacy Policy</p>
            <p>icon1 icon2 icon3</p>
          </div>
          <div className={cx('col l-3', 'center')}>
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