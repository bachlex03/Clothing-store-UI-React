import style from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Button({ hover, reset, children, ...passProps }) {
  const props = {
    ...passProps,
  };
  return (
    <div className={cx('container', { hover, reset })} {...props}>
      {children}
    </div>
  );
}

export default Button;
