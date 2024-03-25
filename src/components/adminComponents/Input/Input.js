import style from './Input.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUpload } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Input({ hint, selectOptions, colors, sizes, type, image, textarea, placeholder, children }) {
  let Comp = <input className={cx('input')} type={type || 'text'} placeholder={placeholder || children} />;

  if (selectOptions) {
    Comp = (
      <div className={cx('select')}>
        Select {children}
        <FontAwesomeIcon className={cx('caret-icon')} icon={faCaretDown} />
        <ul className={cx('list', 'none')}>
          <li className={cx('item-default')}>{'Select ' + children}</li>
          {selectOptions.map((option) => {
            return <li>{option}</li>;
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
