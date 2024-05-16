import style from './MenuItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

const defaultIcon = <FontAwesomeIcon icon={faStar} />;

function MenuItem({ name = 'Default', icon = defaultIcon, to = '/admin', toUrl = '/admin' }) {
  console.log('to', to);

  console.log('toUrl', toUrl);

  return (
    <Link to={to} className={cx('link')}>
      <div className={cx('menu-item', 'flex items-center')}>
        <span className={cx('icon')}>{icon}</span>
        <span className={cx('item-name')}>{name}</span>
        <span className={cx('icon-right')}>
          <FontAwesomeIcon icon={faAngleRight} />
        </span>
      </div>
    </Link>
  );
}

export default MenuItem;
