import style from './Category.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const cx = classNames.bind(style);

let classes = {};

let listHeight = 0;

function Category({ category = {} }) {
  const [open, setOpen] = useState(true);

  const iconRefs = useRef();
  const listRef = useRef();

  classes = { closed: !open };

  const children = category.children || [];

  const handleOpen = () => {
    console.log('listHeight', listHeight);
    listRef.current.style.transition = 'all 0.7s ease-in-out';
    listRef.current.style.maxHeight = !open ? listHeight + 60 + 'px' : 0;

    setOpen(!open);
  };

  // handle animation
  useEffect(() => {
    if (listRef.current.clientHeight > 10) {
      listHeight = listRef.current.clientHeight;

      console.log('listHeight', listHeight);
    }

    listRef.current.style.transition = 'none';

    setOpen(false);
  }, []);

  return (
    <div className={cx('parent')}>
      <div className="flex justify-between align-center">
        <Link to={`/categories/${category.slug}`}>
          <h4 className={cx('heading')}>{category?.name ?? 'Accessories'}</h4>
        </Link>
        <i className={cx('icon', classes)} ref={iconRefs} onClick={handleOpen}>
          <FontAwesomeIcon icon={faPlus} />
        </i>
      </div>
      <ul className={cx('list', classes)} ref={listRef}>
        {category.children.map((child, index) => {
          return (
            <li key={index}>
              <Link to={`/categories/${child.slug}`} className={cx('item')}>
                {child.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Category;
