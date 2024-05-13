import { Sidebar } from '~/layouts/components';

import style from './Shop.module.scss';
import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { Product } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(style);

function Shop() {
  return (
    <Fragment>
      <div className={cx('breadcrumb')} style={{ background: `url(${images.breadcrumb}) 50% / cover no-repeat` }}></div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-3">
            <div className={cx('sidebar-component')}>
              <Sidebar />
            </div>
          </div>
          <div className="col l-9">
            <div className={cx('shop-header')}>
              <div className="flex justify-between align-center mb-10px">
                <div className={cx('tabs')}>
                  <div className={cx('tab-item')}>All Products</div>
                  <div className={cx('tab-item')}>Suggestions</div>
                  <div className={cx('tab-item')}>Sale Products</div>
                </div>
                <div className={cx('sorting')}>
                  <p className={cx('counter-product')}>Showing 1 - 12 of 35</p>
                  <div className={cx('sorting-content', 'flex align-center')}>
                    <p className={cx('sorting-text')}>Default sorting</p>

                    <i className={cx('sort-icon')}>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </i>
                  </div>
                </div>
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
