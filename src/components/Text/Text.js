import style from './Text.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Text({ children, overflow, ...passProps }) {
  const classes = cx('text', {
    overflow: overflow,
  });

  return <p className={cx('wrapper', classes)}>{children}</p>;
}

export default Text;
