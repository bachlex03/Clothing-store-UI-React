import style from './Search.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useState, useRef, useEffect } from 'react';

// import { useDebounce } from '~/hooks';
// import { Price } from "~/components";
// import * as searchService from '~/apiServices/searchService';

const cx = classNames.bind(style);

function Search() {
  const [inputValue, setInputValue] = useState('');
  const [clearIcon, setClearIcon] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [products, setProducts] = useState([]);

  const inputRef = useRef();
  const clearRef = useRef();
  const spinnerRef = useRef();
  const listRef = useRef();

  // const debounced = useDebounce(inputValue, 500);

  // const handleClear = (e) => {
  //   setInputValue('');

  //   setProducts([]);

  //   inputRef.current.focus();
  // };

  // useEffect(() => {
  //   if (inputValue.trim() === '') {
  //     setClearIcon(false);
  //   } else {
  //     setClearIcon(true);
  //   }
  // }, [inputValue]);

  // useEffect(() => {
  //   listRef.current.style.display = 'none';
  // }, []);

  // useEffect(() => {
  //   if (!inputValue) {
  //     setProducts([]);

  //     return;
  //   }

  //   const fetchApi = async () => {
  //     try {
  //       const result = await searchService.search(debounced);

  //       listRef.current.style.display = 'block';
  //       setProducts(result);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchApi();
  // }, [debounced]);

  const icons = {
    xmark: (
      <i
        className={cx('icon', 'xmark')}
        ref={clearRef}
        // onClick={handleClear}
      >
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
          placeholder="Searching..."
          className={cx('search-input')}
          ref={inputRef}
          onChange={(e) => {
            setInputValue(e.target.value);

            setClearIcon(false);

            setSpinner(false);
          }}
          value={inputValue}
        />
        {/* {clearIcon ? icons.xmark : Fragment} */}
        {/* {spinner ? icons.spinner : Fragment} */}
      </div>
    </div>
  );
}

export default Search;
