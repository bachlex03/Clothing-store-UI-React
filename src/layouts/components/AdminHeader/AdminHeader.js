import style from './AdminHeader.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function AdminHeader() {
  return (
    <div
      className={cx('header-container', 'px-16px', 'flex justify-between items-center')}
      style={{ backgroundColor: '#132337' }}
    >
      <div className="flex justify-between items-center">
        <span className={cx('arrow-left-i', 'icon')}>
          <FontAwesomeIcon icon={faAnglesLeft} />
        </span>

        <div className={cx('search')}>
          <span className={cx('search-icon')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>

          <input className={cx('search-input', 'py-8px pl-32px pr-16px')} type="text" placeholder="Search for ..." />
        </div>
      </div>

      <div className={cx('right-block', 'flex justify-center items-center')}>
        <div className="">
          <img
            src="https://themesdesign.in/tailwick/html-dark/assets/images/flags/20/us.svg"
            className={cx('languages')}
            alt=""
          />
        </div>
        <div className="">
          <i className={cx('icon', 'ti-shine')}></i>
        </div>
        <div className="">
          <i className={cx('icon', 'ti-bell')}></i>
        </div>
        <div className="">
          <i className={cx('icon', 'ti-settings')}></i>
        </div>
        <div className="">
          <img
            src="https://user-images.githubusercontent.com/5709133/50445980-88299a80-0912-11e9-962a-6fd92fd18027.png"
            className={cx('avatar')}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
