import style from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Button({ hover, children }) {
  return <div className={cx('container', { hover })}>{children}</div>;
}

export default Button;
