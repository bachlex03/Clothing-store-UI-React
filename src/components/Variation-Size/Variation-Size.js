import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Variation-Size.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(style);

function SizeVariation({ valueStr = '', quantity = 0, onCheck }) {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={cx('wrapper', 'flex justify-between align-center')}
      onClick={() => {
        setChecked(!checked);
        onCheck(valueStr);
      }}
    >
      <div className="flex align-center">
        <i className={cx('icon')} style={{ opacity: checked ? 1 : '' }}>
          {checked ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}
        </i>
        <p className={cx('name')}>{valueStr}</p>
      </div>
      <span className={cx('quantity')}>({quantity})</span>
    </div>
  );
}

export default SizeVariation;
