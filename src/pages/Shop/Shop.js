import { Sidebar } from '~/layouts/components';

import style from './Shop.module.scss';
import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { Product } from '~/components';
const cx = classNames.bind(style);

function Shop() {
  return (
    <Fragment>
      <div className={cx('breadcrumb')}>
        <h2>Breadcrumb</h2>
      </div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-3">
            <div className={cx('sidebar-component')}>
              <Sidebar />
            </div>
          </div>
          <div className="col l-9">
            <div className={cx('shop-header')}>
              <div>Showing 1 - 12 of 35 results</div>
              <div className="flex justify-between">
                <div className={cx('tabs')}>
                  <div className={cx('tab-item')}>All Products</div>
                  <div className={cx('tab-item')}>Suggestions</div>
                  <div className={cx('tab-item')}>Sale Product</div>
                </div>
                <div>Sorting</div>
              </div>
            </div>
            <div className="row">
              <div className="col l-4">
                <div className={cx('product-component')}>
                  <Product product={{}}>Oversized T-shirt with tie-dye print</Product>
                </div>
              </div>
              <div className="col l-4">
                <div className={cx('product-component')}>
                  <Product product={{}}>Pale Blue Drawstring Waist Jersey Shorts</Product>
                </div>
              </div>
              <div className="col l-4">
                <div className={cx('product-component')}>
                  <Product product={{}}>Oversized cardigan</Product>
                </div>
              </div>
              <div className="col l-4">
                <div className={cx('product-component')}>
                  <Product product={{}}>Oversized cardigan</Product>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Shop;
