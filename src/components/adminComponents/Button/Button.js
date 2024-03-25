import style from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Button({ hover, reset, children }) {
  return <div className={cx('container', { hover, reset })}>{children}</div>;
}

export default Button;
