import style from './Search.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, fas } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useState, useRef, useEffect } from 'react';
import useDebounce from '~/hooks/useDebounce';
import images from '~/assets/images';
import { Price } from '~/components';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import * as productService from '~/services/api/productService';

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

  const searchProductApi = useMutation({
    mutationFn: async (q) => {
      // setLoading(true);

      return await productService.search({
        q,
      });
    },
    onSuccess: (data) => {
      toast.success('Success');

      setProducts(data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }
    },
  });

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
    listRef.current.style.display = 'none';
  }, []);

  useEffect(() => {
    if (!inputValue) {
      setProducts([]);
      return;
    }

    searchProductApi.mutate(debounced);
  }, [debounced, inputValue]);

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
          listRef.current.style.display = 'none';
        }}
        style={{ display: products.length > 0 ? 'block' : 'none' }}
      >
        {products.length ? (
          products.map((product, index) => {
            console.log('product', product);

            return (
              <li className="flex align-center">
                <Link to={`/products/${product?.product_slug ?? '#'}`} className={cx('link')}>
                  <img
                    src={product?.product_imgs ? product?.product_imgs[0].secure_url : images.demoImageCart}
                    alt="product-img"
                    className={cx('img')}
                  />
                  <div className="w100">
                    <h4 className={cx('name')}>{product?.product_name ?? 'Default name'}</h4>
                    <div className="flex justify-between baseline mt-12px">
                      <span className={cx('category')}>
                        <span className={cx('variations')}>
                          {product?.product_type ? product.product_type : 'Clothe'}
                        </span>{' '}
                        |{' '}
                        <span className={cx('variations')}>
                          {product?.product_brand ? product.product_brand : 'Gucci'}
                        </span>{' '}
                        |{' '}
                        <span className={cx('variations')}>
                          {product?.product_category?.category_name ? product.product_category.category_name : 'Dress'}
                        </span>
                      </span>
                      <p className={cx('price-component')}>
                        <Price value={product?.product_price ?? 0} old_new_price fs_15 />
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })
        ) : (
          <div className={cx('not-found')}>Product "{debounced}" not found </div>
        )}
      </ul>
    </div>
  );
}

export default Search;
