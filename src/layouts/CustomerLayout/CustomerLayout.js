import style from './CustomerLayout.module.scss';
import classNames from 'classnames/bind';
import { Header, Footer, CustomerSidebar } from '../components';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function CustomerLayout({ children }) {
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
    <>
      <div className={classes}>
        <Header />
      </div>
      <main className={cx('container')}>
        <div className={cx('topbar')}>
          <h1 className={cx('title')}>My Account</h1>
        </div>
        <div className={cx('flex', 'section-1100')}>
          <CustomerSidebar />
          <div className={cx('w100')}>{children}</div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default CustomerLayout;
