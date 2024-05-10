import style from './Sub-Category-Item-Header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function SubCategoryItemHeader({ category = [] }) {
  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('parent')}>
        <Link className={cx('link')}>By Metal</Link>
      </h4>

      <ul className={cx('list')}>
        <li>
          <Link to="">Left Sidebar</Link>
        </li>
        <li>
          <Link to="">No Sidebar</Link>
        </li>
        <li>
          <Link to="">Filter List</Link>
        </li>
        <li>
          <Link to="">Right Sidebar</Link>
        </li>
      </ul>
    </div>
  );
}

export default SubCategoryItemHeader;

// Right Sidebar
// Gallery List
// Shop Slider
// Filter Side
// Category List
// Slider List
