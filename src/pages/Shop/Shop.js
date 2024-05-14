import { Sidebar } from '~/layouts/components';

import style from './Shop.module.scss';
import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { Product, Text } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(style);

function Shop() {
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
              <Sidebar />
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
                    <Text>Suggestions</Text>
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
