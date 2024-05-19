import style from './Sub-Category-Item-Header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function SubCategoryItemHeader({ category = {} }) {
  console.log('category', category);
  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('parent')}>
        <Link className={cx('link')}>{category.name}</Link>
      </h4>

      <ul className={cx('list')}>
        {category.children.map((child, index) => {
          return (
            <li key={index}>
              <Link to={`/categories/${child.slug}`}>{child.name}</Link>
            </li>
          );
        })}
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
