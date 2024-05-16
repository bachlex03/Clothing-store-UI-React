import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import React, { Fragment, useRef, useState } from 'react';

const cx = classNames.bind(styles);
function Input({ label, isRequired, selection, textarea, note, selectValue, notEditable, ...passProps }) {
  const optionRefs = useRef([]);
  const [option, setOption] = useState(true);

  let inputType;

  const props = {
    ...passProps,
  };

  if (isRequired) {
    props.required = true;
  }

  if (selection) {
    optionRefs.current[0] = React.createRef();
    optionRefs.current[1] = React.createRef();

    inputType = (
      <select className={cx('selection')}>
        <option>-- Choose your option --</option>
        <option value="0">Viet Nam</option>
        <option value="0">Ha Noi</option>
      </select>
    );
  } else if (textarea) {
    inputType = <textarea className={cx('text-area')} {...props}></textarea>;
  }

  const labelClasses = cx('label', { isRequired });
  const inputClasses = cx('input', { notEditable });
  return (
    <>
      <label htmlFor={label} className={labelClasses}>
        {label}
      </label>
      {inputType ? inputType : <input id={label} className={inputClasses} readOnly={notEditable} {...props} />}
      {note ? <p className={cx('note')}>{note}</p> : Fragment}
    </>
  );
}

export default Input;
