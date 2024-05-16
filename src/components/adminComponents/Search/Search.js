import style from './Search.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Search({ color }) {
  return (
    <div className={cx('search')}>
      <span className={cx('search-icon')}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>

      <input
        className={cx('search-input', 'py-8px pl-32px pr-16px')}
        style={{ color: color }}
        type="text"
        placeholder="Search for ..."
      />
    </div>
  );
}

export default Search;
