import style from './Contact.module.scss';
import classNames from 'classnames/bind';
import React, { useRef, useEffect, useState } from 'react';
const cx = classNames.bind(style);
function Contact() {
  // Sử dụng useRef để lưu trữ ref của mỗi s  ection
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
      <div className={cx('map-container')}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4843007287523!2d106.77192227078775!3d10.850721408840128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1716124392878!5m2!1svi!2s" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
        <div className={cx('contact', '', '')}>
          <p className={cx('title')}>New York</p>
          <p className={cx('font', 'info')}>Our new store now: 2307 Beverley Rd Brooklyn, New York</p>
          <div className={cx('font', 'row', 'mg-bt')}>
            <p className={cx('col l-4')}>Week Days</p>
            <p className={cx('al', 'col l-5 l-o-3')}>09.00 - 24:00</p>
          </div>
          <div className={cx('font', 'row', 'mg-bt')}>
            <p className={cx('col l-4')}>Saturday</p>
            <p className={cx('al', 'col l-5 l-o-3')}>08:00 - 03.00</p>
          </div>
          <div className={cx('font', 'row', 'mg-bt')}>
            <p className={cx('col l-4')}>Sunday</p>
            <p className={cx('al', 'col l-5 l-o-3')}>Day off</p>
          </div>
          <a href="#" className={cx('button')}>GET DIRECTIONS</a>
        </div>
        {/* <div className={cx('info-map')}>
          <p className={cx('title')}>New York</p>
          <p className={cx('address')}>Our new store now: 2307 Beverley Rd Brooklyn, New York</p>
          <p className={cx('fb-info')}>Week Days</p>
          <p className={cx('fb-info')}>09:00-24:00</p>
        </div> */}
      </div>
      <div className={cx('row', 'divide')}></div>
      <div className={cx('grid wide')}>
        {/* ITEM1 */}
        <div className={cx('background', 'row')}>
          <div className={cx('col l-4', '')}>
            <p className={cx('fb-title')}>Contact Info</p>
            <p className={cx('fb-info', 'fd-pdbt')}>Email Us:  chani@cmssuperheroes.com</p>
            <p className={cx('fb-info')}>Call Us:  002 0198745701</p>
            <p className={cx('fb-title', 'fd-pdbt')}>Address</p>
            <p className={cx('fb-info', 'fd-pdbt')}>2307 Beverley Rd Brooklyn, New York</p>
            <p className={cx('fb-info')}>11226 United States.</p>
            <p className={cx('fb-title', 'fd-pdbt')}>Support Hours </p>
            <p className={cx('fb-info', 'fd-pdbt')}>Mon-Fri 9:00am – 5:00pm PST</p>
            <p className={cx('fb-info')}>*Excludes Holidays</p>
            <p className={cx('fb-title', 'fd-pdbt')}>Social Media</p>
            <p> icon1   icon2  icon3</p>
          </div>
          <div className={cx('col l-8', '')}>
            <p className={cx('fb-title2')}>How can we help?</p>
            <p className={cx('fb-info2')}>Let us know your questions, thoughts and ideas via the form below. Our support team will get back to you as soon as possible.</p>
            <div className={cx('fb-mg', 'row')}>
              <div className={cx('col l-6')}>
                <input className={cx('fb-input')} type="text" placeholder="Name" />
              </div>
              <div className={cx('col l-6')}>
                <input className={cx('fb-input')} type="text" placeholder="Email" />
              </div>
            </div>
            <div className={cx('fb-mg', 'row')}>
              <div className={cx('col l-6')}>
                <input className={cx('fb-input')} type="text" placeholder="Phone" />
              </div>
              <div className={cx('col l-6')}>
                <input className={cx('fb-input')} type="text" placeholder="Order Number" />
              </div>
            </div>
            <div className={cx('fb-mg', 'row')}>
              <div className={cx('col l-12')}>
                <input className={cx('fb-input2')} type="text" placeholder="Your Message" />
              </div>
            </div>
            <a href="#" className={cx('button')}>SUBMIT</a>
          </div>
        </div>
      </div>
      <div className={cx('row', 'divide')}></div>
      <div className={cx('row', 'divide')}></div>
      <div className={cx('grid wide','bd-under')}>
        {/* ITEM1 */}
        <div className={cx('background1','fb-center', 'row' )}>
          <div className={cx('col l-3', 'center')}>
            <p className={cx('fb-title')}>Contact Us</p>
            <p className={cx('fb-info', 'fd-pdbt')}>Email: chani@cmssuperheroes.com</p>
            <p className={cx('fb-info')}>Phone: 02 01061245741</p>
          </div>
          <div className={cx('col l-6', 'center')}>
            <p className={cx('fb-title3', 'bd-2s')}> Subscribe To Our Newsletter</p>
            <div className={cx('fb-mg2', 'row')}>
              <div className={cx('pd-r','col l-5 l-o-2')}>
                <input className={cx('fb-input3')} type="text" placeholder="Your Email Address" />
              </div>
              <a href="#" className={cx('button','wh','col l-3')}>SUBCRIBE</a>
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

export default Contact;