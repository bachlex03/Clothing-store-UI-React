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

  const data = props.data || [];

  if (isRequired) {
    props.required = true;
  }

  const setSelectedOption = props.setOption || (() => {});
  if (selection) {
    inputType = (
      <select className={cx('selection')} onChange={(e) => setSelectedOption(e.target.value)}>
        <option>-- Choose your option --</option>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
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
