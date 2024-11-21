import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { Product, Pagination } from '~/components';
import * as categoryService from '~/services/api/categoryService';
import images from '~/assets/images';
import styles from './CategoryProduct.module.scss';

const cx = classNames.bind(styles);

function CategoryProducts() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('default');
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.product_price - b.product_price;
    } else if (sortOrder === 'desc') {
      return b.product_price - a.product_price;
    }
    return 0;
  });

  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const fetchProducts = useMutation({
    mutationFn: async () => {
      return await categoryService.getProductsByCategory(slug);
    },
    onSuccess: (data) => {
      const activeProducts = data.filter((product) => product.product_status !== 'Draft');
      setProducts(activeProducts);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(`Error ${error.response?.status}`, {
          description: `${error.response?.data?.message}`,
        });
      }
    },
  });

  useEffect(() => {
    fetchProducts.mutate();
    console.log(products);
  }, [slug]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <div
        className={cx('breadcrumb')}
        style={{ background: `url(${images.breadcrumb}) 50% / cover no-repeat`, backgroundAttachment: 'fixed' }}
      >
        <div className={cx('content')}>
          <h2 className={cx('text')}>{slug}</h2>
          <span className={cx('context')}>
            <p className={cx('start')}>Home</p>
            <FontAwesomeIcon icon={faAngleRight} className={cx('breadcrumb-icon')} />
            <p className={cx('current')}>Categories</p>
            <FontAwesomeIcon icon={faAngleRight} className={cx('breadcrumb-icon')} />
            <p className={cx('current')}>{slug}</p>
          </span>
        </div>
      </div>

      <div className="grid wide">
        {products.length > 0 ? (
          <>
            <div className={cx('shop-header')}>
              <div className="flex justify-between align-center mb-10px mt-12px">
                <div className={cx('counter-product')}>
                  Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, products.length)} of{' '}
                  {products.length} products
                </div>
                <div className={cx('sorting')}>
                  <select
                    value={sortOrder}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className={cx('sort-select')}
                  >
                    <option value="default">Default sorting</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              {currentProducts.map((product) => (
                <div key={product._id} className="m-4 col l-3 c-6">
                  <div className={cx('product-component')}>
                    <Product product={product} />
                  </div>
                </div>
              ))}
            </div>

            <div className={cx('pagination')}>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        ) : (
          <div className={cx('no-products')}>
            <img src="/notfoundproduct.png" alt="No products found" className={cx('no-products-img')} />
            <p className={cx('no-products-text')}>Please check back later or browse other categories</p>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default CategoryProducts;
