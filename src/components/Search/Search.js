import style from './Search.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, fas } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useState, useRef, useEffect } from 'react';
import useDebounce from '~/hooks/useDebounce';
import images from '~/assets/images';
import { Price } from '~/components';

// import { useDebounce } from '~/hooks';
// import { Price } from "~/components";
// import * as searchService from '~/apiServices/searchService';

const cx = classNames.bind(style);

function Search({ light, color }) {
  const [inputValue, setInputValue] = useState('');
  const [clearIcon, setClearIcon] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [products, setProducts] = useState([{}, {}]);

  const inputRef = useRef();
  const clearRef = useRef();
  const spinnerRef = useRef();
  const listRef = useRef();

  const debounced = useDebounce(inputValue, 500);

  const handleClear = (e) => {
    setInputValue('');

    setProducts([]);

    inputRef.current.focus();
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);

    setClearIcon(false);

    setSpinner(false);
  };

  useEffect(() => {
    if (inputValue.trim() === '') {
      setClearIcon(false);
    } else {
      setClearIcon(true);
    }
  }, [inputValue]);

  useEffect(() => {
    // listRef.current.style.display = 'none';
  }, []);

  useEffect(() => {
    if (!inputValue) {
      setProducts([]);

      return;
    }

    // const fetchApi = async () => {
    //   try {
    //     const result = await searchService.search(debounced);

    //     listRef.current.style.display = 'block';
    //     setProducts(result);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // fetchApi();
  }, [debounced]);

  const icons = {
    xmark: (
      <i className={cx('icon', 'xmark')} ref={clearRef} onClick={handleClear}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </i>
    ),
    spinner: (
      <i ref={spinnerRef} className={cx('icon', 'spinner')}>
        <FontAwesomeIcon icon={faSpinner} />
      </i>
    ),
  };

  return (
    <div className={cx('wrapper')}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className={cx('search-input')}
          ref={inputRef}
          onChange={handleInput}
          onFocus={() => {
            setShowResult(true);

            if (inputValue.length > 0) {
              listRef.current.style.display = 'block';
            }
          }}
          value={inputValue}
          light={light}
          style={{ color: color }}
        />
        {clearIcon ? icons.xmark : Fragment}
        {spinner ? icons.spinner : Fragment}
      </div>
      <ul
        ref={listRef}
        className={cx('list')}
        onMouseLeave={() => {
          // listRef.current.style.display = 'none';

          inputRef.current.blur();
        }}
      >
        {/* {products.map((product, index) => {
          return (
            
          );
        })} */}
        <li className="flex align-center">
          <Link to={`#`} className={cx('link')}>
            <img src={images.demoImageCart} alt="product-img" className={cx('img')} />
            <div className="w100">
              <h4 className={cx('name')}>Classic Shine Necklace</h4>
              <div className="flex justify-between baseline mt-12px">
                <span className={cx('category')}>
                  {' '}
                  <span className={cx('variations')}>Clothe</span> | <span className={cx('variations')}>Dresses</span> |{' '}
                  <span className={cx('variations')}>Gucci</span>
                </span>{' '}
                <p className={cx('price-component')}>
                  <Price value={20} promotion={15} old_new_price fs_15 />
                </p>
              </div>
            </div>
          </Link>
        </li>

        <li className="flex align-center">
          <Link to={`#`} className={cx('link')}>
            <img src={images.demoImageCart} alt="product-img" className={cx('img')} />
            <div className="w100">
              <h4 className={cx('name')}>Classic Shine Necklace</h4>
              <div className="flex justify-between align-center mt-12px">
                <span className={cx('category')}>
                  {' '}
                  <span className={cx('variations')}>Clothe</span> | <span className={cx('variations')}>Dresses</span> |{' '}
                  <span className={cx('variations')}>Gucci</span>
                </span>{' '}
                <p className={cx('price-component')}>
                  <Price value={20} fs_15 />
                </p>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Search;

/*
{products.length ? (
  products.map((product, index) => {
    console.log('product: ', product);
    return (
      <li key={index}>
        <Link to={`#`} className="flex align-center">
          <img src={images.demoImageCart} alt="product-img" className={cx('img')} />
          <div>
            <h4 className={cx('name')}>Default name</h4>
            <div className="flex justify-between align-center mt-10">
              <span className={cx('category')}>category</span> $20.00
            </div>
          </div>
        </Link>
      </li>
    );
  })
) : (
  <div className={cx('not-found')}>Product not found </div>
)}
*/
