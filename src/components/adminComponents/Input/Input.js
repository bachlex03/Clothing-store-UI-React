import style from './Input.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUpload, fas } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

const cx = classNames.bind(style);

function Input({
  hint,
  selectOptions,
  name = '',
  value = '',
  setValue,
  colors,
  sizes,
  type,
  image,
  textarea,
  placeholder,
  big,
  children,
  ...passProps
}) {
  const [display, setDisplay] = useState(false);
  const [category, setCategory] = useState('Select category');
  const [isChoose, setIsChoose] = useState(false);

  const textRef = useRef(null);

  const handleSelect = (e) => {
    if (e.target.innerText === children) {
      textRef.current.textContent = children;

      setIsChoose(false);

      return;
    }

    textRef.current.textContent = e.target.innerText;

    setValue(e.target.innerText);

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
      })}
      name={name}
      value={value}
      type={type || 'text'}
      placeholder={placeholder || children}
      {...props}
    />
  );

  if (selectOptions) {
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
          })}
          onMouseLeave={() => setDisplay(false)}
        >
          <li className={cx('item-default')} onClick={handleSelect}>
            {children}
          </li>
          {selectOptions.map((option, index) => {
            return (
              <li key={index} onClick={handleSelect}>
                {option}
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
          return <input type="checkbox" className={cx('colors')} style={{ backgroundColor: color }} />;
        })}
      </div>
    );
  } else if (sizes) {
    Comp = (
      <div className={cx('size-container')}>
        {sizes.map((size, index) => {
          return (
            <div className={cx('size-item')}>
              {size}
              <input type="checkbox" className={cx('sizes')} />
            </div>
          );
        })}
      </div>
    );
  } else if (image) {
    Comp = (
      <div className={cx('img-container', 'mt12')}>
        <div className={cx('img-inner')}>
          <FontAwesomeIcon className={cx('upload-icon')} icon={faUpload} />
          <p>Drag and drop your product images or browse your product images</p>
        </div>
      </div>
    );
  } else if (textarea) {
    Comp = <textarea className={cx('input')} type="text" rows={4} placeholder={placeholder || children} />;
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
