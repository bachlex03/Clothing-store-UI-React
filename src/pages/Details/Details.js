import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import style from './Detail.module.scss';
import './Bootstrap-carousel.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { TbCurrencyDollar } from 'react-icons/tb';
import { FaCircle, FaCheckCircle } from 'react-icons/fa';
import Tabs from './Tabs';
import { useParams } from 'react-router-dom';
import { getDetails } from '~/services/api/productService';
import _ from 'lodash';

const cx = classNames.bind(style);

function Details() {
  const order = ['S', 'M', 'L', 'XL', '2XL'];

  const { slug } = useParams();

  const [product, setProduct] = useState({});
  const [sizesByColor, setSizesByColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeAvailable, setSizeAvailable] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartList')) || []);

  useEffect(() => {
    getDetailProduct();
  }, []);

  useEffect(() => {
    if (product && product.skus && product.skus.length > 0) {
      const skus = _.cloneDeep(product.skus);
      const sizesByColor = _.chain(skus)
        .groupBy('sku_color')
        .map((value, key) => ({ sku_color: key, sizes: value }))
        .value();
      console.log(sizesByColor);
      setSizesByColor(sizesByColor);
      setSelectedColor(sizesByColor[0].sku_color);
    }
  }, [product]);

  useEffect(() => {
    const selectedColorObject = sizesByColor.find((item) => item.sku_color === selectedColor);
    if (selectedColorObject) {
      const sizes = selectedColorObject ? selectedColorObject.sizes : [];
      sizes.sort((a, b) => {
        return order.indexOf(a.sku_size) - order.indexOf(b.sku_size);
      });
      const available = sizes.filter((item) => item.sku_quantity > 0);
      setSizeAvailable(available);
      setSelectedSize(sizes[0].sku_size);
    }
  }, [sizesByColor, selectedColor]);

  useEffect(() => {
    if (sizeAvailable && sizeAvailable.length > 0) {
      setSelectedSize(sizeAvailable[0].sku_size);
    }
  }, [sizeAvailable]);

  const getDetailProduct = async () => {
    const result = await getDetails(slug);
    console.log(result);
    setProduct(result);
  };

  const handleQuantity = (type) => {
    if (type === 1) {
      setQuantity(+quantity + 1);
    } else {
      if (+quantity === 1) {
        return;
      }
      setQuantity(+quantity - 1);
    }
  };

  useEffect(() => {
    if (+quantity === 0) {
      setQuantity(1);
    }
  }, [quantity]);

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);

  const handleAddToCart = () => {
    const productExist = cartList.find(
      (item) => item._id === product._id && item.selectedColor === selectedColor && item.selectedSize === selectedSize,
    );

    if (productExist) {
      setCartList(
        cartList.map((item) =>
          item._id === product._id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCartList([...cartList, { ...product, quantity, selectedColor, selectedSize }]);
    }
  };

  return (
    <div className={cx('product-detail-container')}>
      <div className={cx('notices-container')}></div>
      <div className={cx('content-container')}>
        <div className={cx('detail-content')}>
          <Carousel autoPlay={false} showIndicators={false} thumbWidth={'110px'} showStatus={false}>
            {product.product_imgs && product.product_imgs.length > 0 ? (
              product.product_imgs.map((item) => {
                return (
                  <div className={cx('product-image')}>
                    <img src={item.url} alt={`img-${item.original_filename}`} />
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </Carousel>
          <div className={cx('product-info')}>
            <div className={cx('title')}>{product.product_name}</div>
            <div className={cx('price')}>
              <span>
                <TbCurrencyDollar />
                {parseFloat(product.product_price).toFixed(2)}
              </span>
            </div>
            <div className={cx('description')}>{product.product_description}</div>
            <div className={cx('color')}>
              <div className={cx('color-selected')}>Color</div>
              <div className={cx('color-product')}>
                {sizesByColor &&
                  sizesByColor.length > 0 &&
                  sizesByColor.map((item) => {
                    return item.sku_color === 'Brown' ? (
                      <span
                        className={cx('type-color')}
                        key={item.sku_color}
                        onClick={() => setSelectedColor(item.sku_color)}
                      >
                        {selectedColor && selectedColor === item.sku_color ? (
                          <FaCheckCircle color={item.sizes[0].sku_color} />
                        ) : (
                          <FaCircle color={item.sizes[0].sku_color} cursor="pointer" />
                        )}
                        {item.sku_color}
                      </span>
                    ) : item.sku_color === 'Yellow' ? (
                      <span
                        className={cx('type-color')}
                        key={item.sku_color}
                        onClick={() => setSelectedColor(item.sku_color)}
                      >
                        {selectedColor && selectedColor === item.sku_color ? (
                          <FaCheckCircle color={item.sizes[0].sku_color} />
                        ) : (
                          <FaCircle color={item.sizes[0].sku_color} cursor="pointer" />
                        )}
                        {item.sku_color}
                      </span>
                    ) : item.sku_color === 'White' ? (
                      <span
                        className={cx('type-color')}
                        key={item.sku_color}
                        onClick={() => setSelectedColor(item.sku_color)}
                      >
                        {selectedColor && selectedColor === item.sku_color ? (
                          <FaCheckCircle color={item.sizes[0].sku_color} />
                        ) : (
                          <FaCircle color={item.sizes[0].sku_color} cursor="pointer" />
                        )}
                        {item.sku_color}
                      </span>
                    ) : item.sku_color === 'Pink' ? (
                      <span
                        className={cx('type-color')}
                        key={item.sku_color}
                        onClick={() => setSelectedColor(item.sku_color)}
                      >
                        {selectedColor && selectedColor === item.sku_color ? (
                          <FaCheckCircle color={item.sizes[0].sku_color} />
                        ) : (
                          <FaCircle color={item.sizes[0].sku_color} cursor="pointer" />
                        )}
                        {item.sku_color}
                      </span>
                    ) : item.sku_color === 'Red' ? (
                      <span
                        className={cx('type-color')}
                        key={item.sku_color}
                        onClick={() => setSelectedColor(item.sku_color)}
                      >
                        {selectedColor && selectedColor === item.sku_color ? (
                          <FaCheckCircle color={item.sizes[0].sku_color} />
                        ) : (
                          <FaCircle color={item.sizes[0].sku_color} cursor="pointer" />
                        )}
                        {item.sku_color}
                      </span>
                    ) : null;
                  })}
              </div>
            </div>
            <div className={cx('size')}>
              <div className={cx('size-selected')}>
                <span>Size</span>
                <div>SIZE CHART</div>
              </div>
              <div className={cx('size-product')}>
                {sizeAvailable &&
                  sizeAvailable.length > 0 &&
                  sizeAvailable.map((item) => {
                    return selectedSize === item.sku_size ? (
                      <span className={cx('type-size', 'active')} key={item.sku_size}>
                        {item.sku_size}
                      </span>
                    ) : (
                      <span
                        className={cx('type-size')}
                        key={item.sku_size}
                        onClick={() => setSelectedSize(item.sku_size)}
                      >
                        {item.sku_size}
                      </span>
                    );
                  })}
              </div>
              <div className={cx('add-to-cart')}>
                <div className={cx('quantity')}>
                  <input
                    type="number"
                    className={cx('qty')}
                    id
                    name
                    value={quantity}
                    size="4"
                    min="0"
                    max=""
                    step="1"
                    placeholder=""
                    inputMode="numeric"
                    autoComplete="off"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <span className={cx('cms-qty-act', 'cms-qty-up')} onClick={() => handleQuantity(1)}></span>
                  <span className={cx('cms-qty-act', 'cms-qty-down')} onClick={() => handleQuantity(-1)}></span>
                </div>
                <button className={cx('button')} onClick={() => handleAddToCart()}>
                  Add to cart
                </button>
              </div>
              <div className={cx('categories')}>Categories: Accessories Clothing Women</div>
            </div>
          </div>
        </div>
        <div className={cx('tab-panel-container')}>
          <Tabs />
        </div>
        <div className="related-products-container"></div>
        <div className="contact-container"></div>
      </div>
    </div>
  );
}

export default Details;
