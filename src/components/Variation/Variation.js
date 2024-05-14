import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Variation.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(style);

function Variation({ obj = {} }) {
  const [checked, setChecked] = useState(true);

  return (
    <div
      className={cx('wrapper', 'flex justify-between align-center')}
      onClick={() => {
        // handleCheck();
      }}
    >
      <div className="flex align-center">
        <i className={cx('icon')}>
          {checked ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}
        </i>
        <p className={cx('name')}>Red</p>
      </div>
      <span className={cx('quantity')}>(0)</span>
    </div>
  );
}

export default Variation;
