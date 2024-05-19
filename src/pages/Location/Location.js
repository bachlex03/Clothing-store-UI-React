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
    </div>
  );
}

export default Location;