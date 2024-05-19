import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '~/components';
import * as productService from '~/services/api/productService';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';

import style from './Home.module.scss';

const cx = classNames.bind(style);

function Home() {
  const navigate = useNavigate();

  const [selectedSlider, setSelectedSlider] = useState(0);
  const [products, setProducts] = useState([]);
  const [areaRelatedProducts, setAreaRelatedProducts] = useState(false);

  const relatedProductsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAreaRelatedProducts(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    if (relatedProductsRef.current) {
      observer.observe(relatedProductsRef.current);
    }

    return () => {
      if (relatedProductsRef.current) {
        observer.unobserve(relatedProductsRef.current);
      }
    };
  }, []);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedSlider((prev) => (prev === 1 ? 0 : 1));
    }, 5500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useLayoutEffect(() => {
    if (window.location.href.endsWith('/')) {
      navigate('/home');
    }
  }, []);

  return (
    <Fragment>
      {/* Slider */}
      <section className={cx('slider')}>
        <div className={selectedSlider === 0 ? cx('slider-item', 'active') : cx('slider-item')}>
          <div className={selectedSlider === 0 ? cx('img-wrapper', 'active') : cx('img-wrapper')}>
            <img src="slider-1-scaled.webp" alt="Image Slider 1" />
          </div>
          <div className={selectedSlider === 0 ? cx('text-wrapper', 'active') : cx('text-wrapper')}>
            <div className={cx('text-line')}>You can have anything you want If you dress for it.</div>
            <div className={cx('text-title')}>
              Inspired By Nature &
              <br />
              Crafted With Love
            </div>
            <div className={cx('shop-now')}>
              <Link to="/shop" className={cx('btn', 'btn-accent', 'text-black', 'btn-hover-primary')}>
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className={selectedSlider === 1 ? cx('slider-item', 'active') : cx('slider-item')}>
          <div className={selectedSlider === 1 ? cx('img-wrapper', 'active') : cx('img-wrapper')}>
            <img src="slider-2.webp" alt="Image Slider 1" />
          </div>
          <div className={selectedSlider === 1 ? cx('text-wrapper', 'active') : cx('text-wrapper')}>
            <div className={cx('text-line')}>You can have anything you want If you dress for it.</div>
            <div className={cx('text-title')}>
              Outrageous Fashion
              <br />
              Always For You!
            </div>
            <div className={cx('shop-now')}>
              <Link to="/shop" className={cx('btn', 'btn-accent', 'text-black', 'btn-hover-primary')}>
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section
        className={
          areaRelatedProducts ? cx('related-products-container', 'fadeInUp') : cx('related-products-container')
        }
      >
        <div className={cx('related-products-content')}>
          <div className={cx('text-heading')} ref={relatedProductsRef}>
            Featured Product
          </div>
          <div className={cx('products-container')}>
            <div className="row">
              {products.map((product, index) => {
                return (
                  <div className="col l-3">
                    <div className={cx('product-component')}>
                      <Product product={product} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={cx('button-viewall')}>
              <Link to="/shop" className={cx('btn', 'btn-accent', 'text-black', 'btn-hover-primary')}>
                View All
              </Link>
            </div>
          </div>
          <div className={cx('categories-container')}></div>
        </div>
      </section>

      {/* Categories */}
      <section className={cx('categories-container')}>
        <div className={cx('dresses-container')}>
          <img src="pro-cat-dresse.webp" alt="Dresses" />
        </div>
        <div className={cx('tshirt-container')}>
          <img src="pro-cat-t-shirts.jpg" alt="T-shirt" />
          <div className={cx('layout-blur')}></div>
        </div>
        <div className={cx('outerwear-container')}>
          <img src="pro-cat-t-outerwear.jpg" alt="Outerware" />
        </div>
      </section>
    </Fragment>
  );
}

export default Home;
