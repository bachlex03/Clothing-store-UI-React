import style from './RecoverNoti.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function RecoverNoti(props) {
  const { message } = props;
  return (
    <div className={cx('content')}>
      <h2 className={cx('sub-title')}>
        <span className={cx('bi bi-check-circle-fill')} style={{ color: 'green' }}>
          {' '}
        </span>
        {message}
      </h2>
    </div>
  );
}

export default RecoverNoti;
