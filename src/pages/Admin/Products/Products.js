import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faEye,
  faPlus,
  faTrash,
  faRotateRight,
  faArrowsSpin,
} from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Button, SideModel, Search, DeleteModel } from '~/components/adminComponents';
import * as productService from '~/services/api/productService';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';

const cx = classNames.bind(styles);

function Products() {
  const addProductModelRef = useRef(null);
  const deleteProductModelRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  // Call API
  const fetchingProduct = useMutation({
    mutationFn: async () => {
      setLoading(true);

      return await productService.getAllProducts({ q: 'min' });
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: 'All products have been fetched successfully',
      });

      setProducts(data);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('error.response.data', error.response?.data);
        console.log('error.response.status', error.response?.status);

        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }

      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
  });

  useEffect(() => {
    fetchingProduct.mutate();
  }, []);

  // const handleGetProducts = async () => {
  //   setLoading(true);

  //   try {
  //     const data = await productService.getAllProducts({
  //       q: 'min',
  //     });

  //     setProducts(data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 500);
  //   }
  // };

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('disconnect', () => {
      console.log('Disconnected from server', socket.id);
    });

    socket.on('connect', () => {
      console.log('Connected to server', socket.id);
    });

    socket.on('payment-status', (data) => {
      console.log('Received message from server:', data);
    });

    return () => {
      socket.disconnect();
    };
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
              <Search />
            </div>

            <div className={cx('btn-comp')}>
              <Button
                hover
                onClick={() => {
                  addProductModelRef.current.openModel();
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Product
              </Button>
            </div>
          </div>

          <div
            className={cx('refresh-container')}
            onClick={() => {
              fetchingProduct.mutate();
            }}
          >
            <i className={cx('repeat-icon mr-12px')}>
              <FontAwesomeIcon icon={faRotateRight} />
            </i>
            Refresh
          </div>

          <table className={cx('product-table')}>
            <thead className={cx('table-head')}>
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

            <tbody className={cx('table-body')}>
              {products.map((product, index) => {
                const status = product.product_status === 'Published' ? true : false;

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
                      <span className={cx('box', { Published: status, Draft: !status })}>{product.product_status}</span>
                    </td>
                    <td className="action">
                      <span className={cx('actions')}>
                        <FontAwesomeIcon className={cx('edit')} icon={faEye} />
                      </span>
                      <span className={cx('actions')}>
                        <FontAwesomeIcon className={cx('edit')} icon={faEdit} />
                      </span>
                      <span
                        className={cx('actions')}
                        data-id={product._id}
                        onClick={(e) => {
                          const id = e.currentTarget.getAttribute('data-id');

                          deleteProductModelRef.current.openModel(id, product.product_name);
                        }}
                      >
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

        {/* <div className={cx('footer')}>
              <div className="flex justify-between">
                <div className={cx('footer-left')}>@tailwindcss</div>
    
                <div className={cx('footer-right')}>Design & Develop by Group 1</div>
              </div>
            </div> */}

        <SideModel ref={addProductModelRef} />
        <DeleteModel ref={deleteProductModelRef} />
      </div>
    </Fragment>
  );
}

export default Products;
