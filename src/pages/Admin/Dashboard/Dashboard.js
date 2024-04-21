import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faEye,
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faRepeat,
  faArrowsSpin,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Button, SideModel } from '~/components/adminComponents';
import * as productService from '~/services/api/productService';

const cx = classNames.bind(styles);

function Dashboard() {
  const modelRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    setLoading(true);

    try {
      const data = await productService.getAllProducts({
        q: 'min',
      });

      console.log('data: ', data);

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <Fragment>
      {loading && (
        <div className={cx('loading')}>
          <i className={cx('icon-loading')}>
            <FontAwesomeIcon icon={faArrowsSpin} spin />
          </i>
        </div>
      )}
      <div className={cx('container', 'h-screen')} style={{ backgroundColor: '#0f1824', width: '' }}>
        <p className={cx('heading-text')}>List view</p>
        <div className={cx('table-container')}>
          <div className={cx('header-table', 'flex justify-between items-center')}>
            <div className="flex justify-center items-center">
              <i
                className={cx('repeat-icon')}
                onClick={() => {
                  handleGetProducts();
                }}
              >
                <FontAwesomeIcon icon={faRepeat} />
              </i>
              <div className={cx('search')}>
                <span className={cx('search-icon')}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>

                <input
                  className={cx('search-input', 'py-8px pl-32px pr-16px')}
                  type="text"
                  placeholder="Search for ..."
                />
              </div>
            </div>

            <div className={cx('btn-comp')}>
              <Button
                hover
                onClick={() => {
                  modelRef.current.openModel();
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Product
              </Button>
            </div>
          </div>

          <table className={cx('product-table')}>
            <thead>
              <tr>
                <th className="code">Product Code</th>
                <th className="name">Product Name</th>
                <th className="category">Category</th>
                <th className="price">Price</th>
                <th className="stock">Stock</th>
                <th className="status">Status</th>
                <th className="action">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td className="code">{product.product_code}</td>
                    <td className="name">{product.product_name}</td>
                    <td className="category">
                      <span className={cx('box')}>{product.product_category.category_name}</span>
                    </td>
                    <td className="price">
                      ${parseInt(product.product_price).toFixed(2).toString().replace('.', ',')}
                    </td>
                    <td className="stock">{product.product_stocks}</td>
                    <td className="status">
                      <span className={cx('box', 'inactive')}>{product.product_status}</span>
                    </td>
                    <td className="action">
                      <span className={cx('actions')}>
                        <FontAwesomeIcon className={cx('edit')} icon={faEye} />
                      </span>
                      <span className={cx('actions')}>
                        <FontAwesomeIcon className={cx('edit')} icon={faEdit} />
                      </span>
                      <span className={cx('actions')}>
                        <FontAwesomeIcon className={cx('delete')} icon={faTrash} />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={cx('flex justify-between items-center mt-8')}>
            <span className={cx('showing')}>
              Showing <strong>7</strong> of <strong>11</strong> Results
            </span>

            <div className={cx('flex justify-center items-center')}>
              <div className={cx('paging', 'prev')}>
                <FontAwesomeIcon icon={faAngleLeft} /> Prev
              </div>
              <div className={cx('paging', 'active')}>1</div>
              <div className={cx('paging')}>2</div>
              <div className={cx('paging', 'next')}>
                Next <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          </div>
        </div>

        <div className={cx('footer')}>
          <div className="flex justify-between">
            <div className={cx('footer-left')}>@tailwindcss</div>

            <div className={cx('footer-right')}>Design & Develop by Group 1</div>
          </div>
        </div>

        <SideModel ref={modelRef} />
      </div>
    </Fragment>
  );
}

export default Dashboard;
