import React, { useEffect, useState } from 'react';
import style from './Tabs.module.scss';
import classNames from 'classnames/bind';
import { Product } from '~/components';
import * as productService from '~/services/api/productService';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Tabs() {
  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState([]);

  const updateTab = (index) => {
    setTab(index);
  };

  const fetchingProduct = useMutation({
    mutationFn: async () => {
      return await productService.getAllProducts({ q: 'min' });
    },
    onSuccess: (data) => {
      toast.info('Welcome to our shop!');

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

  useEffect(() => {
    fetchingProduct.mutate();
  }, []);

  return (
    <div className={cx('container-tabs')}>
      <div className={cx('containter-content')}>
        <div className={cx('tab')}>
          <ul>
            <li className={tab === 0 ? cx('active') : cx('no-active')} onClick={() => updateTab(0)}>
              Hot Items
            </li>
            <li className={tab === 1 ? cx('active') : cx('no-active')} onClick={() => updateTab(1)}>
              New Arrivals
            </li>
          </ul>
        </div>
        <div className={tab === 0 ? cx('show-content') : cx('content')}>
          <div className={cx('products-container')}>
            <div className="row">
              {products.map((product, index) => {
                if (index < 4) {
                  return (
                    <div className="col l-3">
                      <div className={cx('product-component')}>
                        <Product product={product} />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className={tab === 1 ? cx('show-content') : cx('content')}>
          <div className={cx('products-container')}>
            <div className="row">
              {products.map((product, index) => {
                if (index >= 4) {
                  return (
                    <div className="col l-3">
                      <div className={cx('product-component')}>
                        <Product product={product} />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className={cx('button-viewall')}>
          <Link to="/shop" className={cx('btn', 'btn-accent', 'text-black', 'btn-hover-primary')}>
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
