import style from './Button.module.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function Button({ to, href, children, upperCase, h100, w100, opposite, outline, ...passProps }) {
  let Comp = 'button';

  const props = {
    ...passProps,
  };

  if (to) {
    Comp = Link;
    props.to = to;
  } else if (href) {
    Comp = 'a';
  }

  const classes = cx('wrapper', {
    upperCase,
    h100,
    w100,
    opposite,
    outline,
  });

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}

export default Button;
