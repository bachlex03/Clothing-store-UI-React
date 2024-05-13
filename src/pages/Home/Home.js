import { Fragment, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import style from './Home.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(style);

function Home() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (window.location.href.endsWith('/')) {
      navigate('/home');
    }
  }, []);

  return (
    <Fragment>
      {/* Slider */}
      <section className={cx('slider')}>{/* <img loading="lazy" src={images.slider} alt="" /> */}</section>

      {/* Products */}
    </Fragment>
  );
}

export default Home;
