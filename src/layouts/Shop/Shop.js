import { Header, Sidebar, Footer } from '../components';
import style from './Shop.module.scss';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Shop({ children }) {
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const st = window.pageYOffset;

      if (st > lastScrollTop) {
        setScrollDirection('down');
      } else if (st < lastScrollTop) {
        setScrollDirection('up');
      }
      if (st < 30) {
        setScrollDirection('top');
      }

      lastScrollTop = st;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const classes = cx('header-component', {
    show: scrollDirection === 'up',
    hide: scrollDirection === 'down',
    top: scrollDirection === 'top',
  });

  return (
    <div>
      <div className={classes}>
        <Header animation blur />
      </div>
      <div className={cx('container')}>
        <div className="left-block"></div>
        <div className="right-block">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
