import style from './Img-Category-Item-Header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(style);

function ImgCategoryItemHeader({ title = 'Default Title', thumb = images.headerCategory_1 }) {
  return (
    <div className={cx('img-container')}>
      <p className={cx('title')}>{title}</p>
      <p className={cx('sub-title')}>View Collection</p>
      <img className={cx('img')} src={thumb} alt="" />
    </div>
  );
}

export default ImgCategoryItemHeader;

// Right Sidebar
// Gallery List
// Shop Slider
// Filter Side
// Category List
// Slider List
