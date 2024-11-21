import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '~/components';
import * as productService from '~/services/api/productService';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { AxiosError } from 'axios';

import style from './Home.module.scss';
import Tabs from './Tabs';

const cx = classNames.bind(style);

function Home() {
  const navigate = useNavigate();

  const [selectedSlider, setSelectedSlider] = useState(0);
  const [products, setProducts] = useState([]);
  const [areaRelatedProducts, setAreaRelatedProducts] = useState(false);
  const [areaCategories, setAreaCategories] = useState(false);
  const [areaTypeItems, setAreaTypeItems] = useState(false);
  const [areaSubscribe, setAreaSubscribe] = useState(false);

  const relatedProductsRef = useRef(null);
  const categoriesRef = useRef(null);
  const typeItemsRef = useRef(null);
  const subscribeRef = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAreaCategories(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    if (categoriesRef.current) {
      observer.observe(categoriesRef.current);
    }

    return () => {
      if (categoriesRef.current) {
        observer.unobserve(categoriesRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAreaTypeItems(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    if (typeItemsRef.current) {
      observer.observe(typeItemsRef.current);
    }

    return () => {
      if (typeItemsRef.current) {
        observer.unobserve(typeItemsRef.current);
      }
    };
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAreaSubscribe(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    if (subscribeRef.current) {
      observer.observe(subscribeRef.current);
    }

    return () => {
      if (subscribeRef.current) {
        observer.unobserve(subscribeRef.current);
      }
    };
  });

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        // Lọc bỏ sản phẩm có status là Draft
        const activeProducts = response.filter((product) => product.product_status !== 'Draft');
        setProducts(activeProducts);
      } catch (error) {
        console.log('Failed to fetch products: ', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        // Lọc bỏ sản phẩm có status là Draft
        const activeProducts = response.filter((product) => product.product_status !== 'Draft');
        setProducts(activeProducts);
      } catch (error) {
        console.log('Failed to fetch products: ', error);
      }
    };
    fetchProducts();
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
              {products.slice(0, 8).map((product, index) => {
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
        </div>
      </section>

      {/* Categories */}
      <section
        className={areaCategories ? cx('categories-container', 'fadeInUp') : cx('categories-container')}
        ref={categoriesRef}
      >
        <div className={cx('dresses-container')}>
          <img src="pro-cat-dresse.webp" alt="Dresses" />
          <div className={cx('text-heading')}>Dresses</div>
        </div>
        <div className={cx('tshirt-container')}>
          <img src="pro-cat-t-shirts.jpg" alt="T-shirt" />
          <div className={cx('text-heading')}>T-shirt</div>
        </div>
        <div className={cx('outerwear-container')}>
          <img src="pro-cat-t-outerwear.jpg" alt="Outerwear" />
          <div className={cx('text-heading')}>Outerwear</div>
        </div>
      </section>

      {/* Hot items, new arrivals */}
      <section
        className={areaTypeItems ? cx('type-items-container', 'fadeInUp') : cx('type-items-container')}
        ref={typeItemsRef}
      >
        <Tabs />
      </section>

      {/*Subscribe To Our Newsletter */}
      <section className={cx('subscribe-container')} ref={subscribeRef}>
        <div className={areaSubscribe ? cx('contact-us', 'leftToRight') : cx('contact-us')}>
          <div className={cx('text-heading')}>Contact Us</div>
          <span style={{ fontSize: '15px' }}>Email: chanistore@gmail.com</span>
          <span style={{ fontSize: '15px' }}>Phone: 0938xxxxxx</span>
        </div>
        <div className={areaSubscribe ? cx('subscribe-content', 'bottomToTop') : cx('subscribe-content')}>
          <div className={cx('text-heading')}>
            Subscribe To
            <br />
            Our Newsletter
          </div>
          <div className={cx('input-wrapper')}>
            <input type="text" placeholder="Enter your email" />
            <button className={cx('btn', 'btn-accent', 'text-black', 'btn-hover-primary')}>Subscribe</button>
          </div>
        </div>
        <div className={areaSubscribe ? cx('our-store', 'rightToLeft') : cx('our-store')}>
          <div className={cx('text-heading')}>Our Store</div>
          <span style={{ fontSize: '15px' }}>01 Vo Van Ngan, Linh Chieu</span>
          <span style={{ fontSize: '15px' }}>Thu Duc, TP Ho Chi Minh</span>
        </div>
      </section>
    </Fragment>
  );
}

export default Home;
