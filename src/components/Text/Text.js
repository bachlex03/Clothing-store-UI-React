import style from './Text.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Text({ children, overflow, hoverLight, transY, ...passProps }) {
  const classes = cx('text', {
    overflow,
    hoverLight,
  });

  return (
    <p className={cx('wrapper', classes)} style={{ transform: `translateY(${transY + '%'})` }}>
      {children}
    </p>
  );
}

export default Text;
