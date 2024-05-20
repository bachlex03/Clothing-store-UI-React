import { Sidebar } from '~/layouts/components';

import style from './Shop.module.scss';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { Product, Text } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import * as productService from '~/services/api/productService';
import { getCategories } from '~/services/api/categoryService';
import { renderCategories } from '~/utils/render-category';

import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Shop() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  function bySizes(wantedSizes) {
    return (product) => {
      let toKeep = false;
      product.product_sizes.forEach((productSize) => {
        wantedSizes.forEach((wantedSize) => {
          if (productSize.toLowerCase() === wantedSize.toLowerCase()) toKeep = true;
        });
      });
      return toKeep;
    };
  }

  function byColors(wantedColors) {
    return (product) => {
      let toKeep = false;
      product.product_colors.forEach((productColor) => {
        wantedColors.forEach((wantedColor) => {
          if (productColor.toLowerCase() === wantedColor.toLowerCase()) toKeep = true;
        });
      });
      return toKeep;
    };
  }

  useEffect(() => {
    console.log('selectedSizes', selectedSizes);
    console.log('selectedColors', selectedColors);
    console.log('products', products);
    if (selectedSizes.length === 0 && selectedColors.length === 0) {
      setFilterProducts(products);
      return;
    } else if (selectedSizes.length === 0 && selectedColors.length > 0) {
      const filteredProducts = products.filter(byColors(selectedColors));
      setFilterProducts(filteredProducts);
    } else if (selectedSizes.length > 0 && selectedColors.length === 0) {
      console.log('product chưa filter', products);
      const filteredProducts = products.filter(bySizes(selectedSizes));
      console.log('filteredProducts', filteredProducts);
      setFilterProducts(filteredProducts);
    } else if (selectedSizes.length > 0 && selectedColors.length > 0) {
      const filteredProducts = products.filter(byColors(selectedColors));
      const filteredProducts2 = filteredProducts.filter(bySizes(selectedSizes));
      setFilterProducts(filteredProducts2);
    }
  }, [selectedSizes, selectedColors]);

  useEffect(() => {
    console.log('filterProducts', filterProducts);
  }, [filterProducts]);

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

  const fetchingCategory = useMutation({
    mutationFn: async () => {
      return await getCategories();
    },
    onSuccess: (data) => {
      console.log('data', renderCategories(data));
      setCategories(renderCategories(data));
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
    fetchingCategory.mutate();
  }, []);

  useEffect(() => {
    fetchingProduct.mutate();
  }, []);

  return (
    <Fragment>
      <div
        className={cx('breadcrumb')}
        style={{ background: `url(${images.breadcrumb}) 50% / cover no-repeat`, backgroundAttachment: 'fixed' }}
      >
        <div className={cx('content')}>
          <h2 className={cx('text')}>Our Shop</h2>
          <span className={cx('context')}>
            <p className={cx('start')}>Home</p>
            <FontAwesomeIcon icon={faAngleRight} className={cx('breadcrumb-icon')} />
            <p className={cx('current')}>Shop</p>
          </span>
        </div>
      </div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-3">
            <div className={cx('sidebar-component')}>
              <Sidebar categories={categories} setColors={setSelectedColors} setSizes={setSelectedSizes} />
            </div>
          </div>
          <div className="col l-9">
            <div className={cx('shop-header')}>
              <div className="flex justify-between align-center mb-10px mt-12px">
                <div className={cx('tabs')}>
                  <div className={cx('tab-item')}>
                    <Text>Categories</Text>
                  </div>
                  <div className={cx('tab-item')}>
                    <Link to={'/login'}>
                      <Text>Suggestions</Text>
                    </Link>
                  </div>
                  <div className={cx('tab-item')}>
                    <Text>Sale Products</Text>
                  </div>
                </div>
                <div className={cx('sorting')}>
                  <p className={cx('counter-product')}>Showing 1 - 12 of 35</p>
                  <div className={cx('sorting-content', 'flex align-center')}>
                    <p className={cx('sorting-text')}>
                      <Text>
                        Default sorting
                        <i className={cx('sort-icon')}>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </i>
                      </Text>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {selectedColors.length === 0 && selectedSizes.length === 0
                ? products.map((product, index) => {
                    return (
                      <div className="col l-4">
                        <div className={cx('product-component')}>
                          <Product product={product} />
                        </div>
                      </div>
                    );
                  })
                : filterProducts.map((product, index) => {
                    return (
                      <div className="col l-4">
                        <div className={cx('product-component')}>
                          <Product product={product} />
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Shop;
