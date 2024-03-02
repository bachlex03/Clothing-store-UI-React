import style from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Button() {
  return <h3 className={cx('test-css')}>Button</h3>;
}

export default Button;
