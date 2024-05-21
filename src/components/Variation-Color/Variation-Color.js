import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Variation-Color.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { ColorsHash, ColorsString } from '~/common/constants';

const cx = classNames.bind(style);

function ColorVariation({ valueStr = 'BROWN', onCheck }) {
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
        <span className={cx('color-hash')} style={{ backgroundColor: `${ColorsHash[valueStr]}` }}></span>
        <p className={cx('name')}>{ColorsString[ColorsHash[valueStr]]}</p>
      </div>
      <i
        className={cx('icon')}
        onClick={() => {
          setChecked(!checked);
          onCheck(valueStr);
        }}
        style={{ opacity: checked ? 1 : '' }}
      >
        {checked ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}
      </i>
    </div>
  );
}

export default ColorVariation;
