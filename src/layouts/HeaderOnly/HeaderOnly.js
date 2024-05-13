import style from './HeaderOnly.module.scss';
import classNames from 'classnames/bind';

import { Header, Footer } from '../components';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function HeaderOnly({ children }) {
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
        <Header animation color={'#ccc'} />
      </div>
      <div className="container">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default HeaderOnly;
