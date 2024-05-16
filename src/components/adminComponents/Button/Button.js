import style from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Button({ hover, reset, del, active, children, ...passProps }) {
  const props = {
    ...passProps,
  };
  return (
    <button className={cx('container', { hover, reset, del, active })} {...props}>
      {children}
    </button>
  );
}

export default Button;
