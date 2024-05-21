import style from './Input.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import React from 'react';

const cx = classNames.bind(style);

let activateSize = -1;

function Input({
  hint,
  selectOptions,
  name = '',
  value = '',
  setValue,
  hasChild,
  colors,
  sizes,
  type,
  image,
  textarea,
  placeholder,
  big,
  children,
  dropdownTop,
  readOnly,
  disabled,
  reset = false,
  setReset,
  ...passProps
}) {
  const [display, setDisplay] = useState(false);
  const [category, setCategory] = useState('Select category');
  const [isChoose, setIsChoose] = useState(false);
  const [activeColor, setActiveColor] = useState(-1);
  const [activeSizes, setActiveSizes] = useState([]);

  console.log('selectOptions', selectOptions);

  const textRef = useRef(null);
  const inputImgRef = useRef(null);

  if (reset) {
    textRef.current.textContent = '--';
  }

  const handleSelect = (e) => {
    if (e.target.innerText === children) {
      textRef.current.textContent = children;

      setIsChoose(false);

      setValue('');

      return;
    }

    textRef.current.textContent = e.target.innerText;

    if (e.currentTarget.getAttribute('data-id')) {
      setValue({
        name: e.target.innerText,
        id: e.currentTarget.getAttribute('data-id'),
      });
    } else {
      setValue(e.target.innerText);
    }

    setDisplay(false);

    setIsChoose(true);

    setCategory(e.target.innerText);
  };

  const props = {
    ...passProps,
  };

  let Comp = (
    <input
      className={cx('input', {
        isBig: big,
        readOnly: readOnly,
      })}
      name={name}
      value={value}
      type={type || 'text'}
      placeholder={placeholder || children}
      // disabled={disabled}
      {...props}
    />
  );

  if (hasChild && typeof selectOptions === 'object') {
    Comp = (
      <div className={cx('select')} onClick={() => setDisplay(!display)}>
        <p
          ref={textRef}
          className={cx('', {
            isChose: isChoose,
          })}
        >
          {children}
        </p>
        <FontAwesomeIcon className={cx('caret-icon')} icon={faCaretDown} />
        <ul
          className={cx('list', 'parent', {
            none: !display,
            dropdownTop: dropdownTop,
          })}
          onMouseLeave={() => setDisplay(false)}
        >
          <li className={cx('item-default')} onClick={handleSelect}>
            {children}
          </li>
          {selectOptions.map((option, index) => {
            return (
              <li key={index}>
                <p className={cx('parent')}>{option.name}</p>

                <ul>
                  {option.children.map((child, index) => {
                    return (
                      <li key={index} onClick={handleSelect} className={cx('child')}>
                        {child.name}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (selectOptions) {
    Comp = (
      <div className={cx('select')} onClick={() => setDisplay(!display)}>
        <p
          ref={textRef}
          className={cx('', {
            isChose: isChoose,
          })}
        >
          {children}
        </p>
        <FontAwesomeIcon className={cx('caret-icon')} icon={faCaretDown} />
        <ul
          className={cx('list', {
            none: !display,
            dropdownTop: dropdownTop,
          })}
          onMouseLeave={() => setDisplay(false)}
        >
          <li className={cx('item-default')} onClick={handleSelect}>
            {children}
          </li>
          {selectOptions.map((option, index) => {
            return (
              <li key={index} onClick={handleSelect} data-id={option?._id ?? null}>
                {option?.name ? option.name : option}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (colors) {
    Comp = (
      <div className={cx('mt16')}>
        {colors.map((color, index) => {
          return (
            <input
              key={index}
              data-key={index}
              type="checkbox"
              className={cx('colors', {
                active: activeColor === index ? true : false,
              })}
              style={{ backgroundColor: color }}
              onClick={() => {
                setActiveColor(index);

                console.log('reset', reset);

                setValue(color);
              }}
            />
          );
        })}
      </div>
    );
  } else if (sizes) {
    Comp = (
      <div className={cx('size-container')}>
        {sizes.map((size, index) => {
          return (
            <div
              key={index}
              className={cx('size-item', {
                active: activeSizes.length
                  ? activeSizes.some((activeSize) => activeSize.index === index)
                    ? true
                    : false
                  : false,
              })}
              onClick={(e) => {
                value = e.target.innerText;

                if (activeSizes.some((size) => size.size === value)) {
                  const filtered = activeSizes.filter((size) => size.size !== value);

                  setActiveSizes(filtered);

                  setValue(filtered);
                  return;
                }

                console.log('push');

                let newArr = [...activeSizes];

                newArr.push({
                  size: value,
                  index: index,
                });

                setActiveSizes(newArr);

                setValue(newArr);
              }}
            >
              {size}
              <input type="checkbox" className={cx('sizes', 'active')} />
            </div>
          );
        })}
      </div>
    );
  } else if (image) {
    Comp = (
      <div
        className={cx('img-container', 'mt12')}
        onClick={() => {
          inputImgRef.current.click();
        }}
      >
        <div className={cx('img-inner')}>
          <FontAwesomeIcon className={cx('upload-icon')} icon={faUpload} />
          <p>Drag and drop your product images or browse your product images</p>
        </div>

        <input
          type={type}
          name="images"
          id=""
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          ref={inputImgRef}
          onChange={(e) => {
            setValue([...e.target.files]);
          }}
        />
      </div>
    );
  } else if (textarea) {
    Comp = <textarea className={cx('input')} type="text" rows={4} placeholder={placeholder || children} {...props} />;
  }

  return (
    <div className={cx('container', 'mt16')}>
      <p className={cx('heading')}>{children}</p>

      {Comp}

      <p className={cx('hint')}>{hint}</p>
    </div>
  );
}

export default Input;
