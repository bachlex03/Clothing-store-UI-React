import style from './Input.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Input({ hint, children }) {
  return (
    <div className={cx('container')}>
      <p className={cx('heading')}>{children}</p>

      <input className={cx('input')} placeholder={children} />

      <p className={cx('hint')}>{hint}</p>
    </div>
  );
}

export default Input;
