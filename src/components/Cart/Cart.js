import style from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { Button, Price } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortU, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

// import { Price, Button } from "~/components";

// import { remove } from '~/redux/features/cart/cartSlice';

const cx = classNames.bind(style);

function Cart() {
  //   const dispatch = useDispatch();
  const wrapperRef = useRef();

  const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartList')) || []);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    let total = 0;
    localStorage.setItem('cartList', JSON.stringify(cartList));
    cartList.map((item) => {
      total += item.product_price * item.quantity;
    });
    setTotalCart(total);
    console.log('cartList', cartList);
  }, [cartList]);

  //   useEffect(() => {
  //     wrapperRef.current.addEventListener('scroll', (event) => {
  //       console.log('scrolling...');
  //       const maxScrollHeight = wrapperRef.current.scrollHeight - wrapperRef.current.clientHeight;

  //       // Check if scroll reached the maximum height
  //       if (wrapperRef.current.scrollTop === maxScrollHeight) {
  //         console.log('reached the bottom of the scroll');

  //         document.body.addEventListener('wheel', function (e) {
  //           e.preventDefault();
  //         });
  //       }
  //     });
  //   });

  //   const cartItems = useSelector((state) => state.cart.values);
  const cartItems = [];

  const colors = ['Gold', 'Silver', 'Bronze'];
  const sizes = ['16.0', '17.0', '18.0', '19.0'];

  let total = 0;

  return (
    <div className={cx('cart')}>
      <i className={cx('play-icon')}>
        <FontAwesomeIcon icon={faPlay} />
      </i>
      <h3 className={cx('cart-heading')}>Cart</h3>
      <div>
        <div ref={wrapperRef} className={cx('wrapper')}>
          {cartList && cartList.length > 0
            ? cartList.map((item) => {
                return (
                  <div className={cx('cart-item')}>
                    <i
                      onClick={(e) => {
                        // dispatch(remove(index));
                      }}
                    >
                      <svg
                        className={cx('icon')}
                        xmlns="http://www.w3.org/2000/svg"
                        height="14px"
                        viewBox="-100 -100 584 712"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </i>
                    <div className={cx('item-info')}>
                      <Link to={`#`}>
                        <img src={item.product_imgs[0].url} alt="" className={cx('item-img')} />
                      </Link>
                      <div className="flex-1">
                        <div className={cx('flex-container')}>
                          <div>
                            <Link to={`#`}>
                              <h4 className={cx('item-heading')}>{item.product_name}</h4>
                            </Link>
                            <div className={cx('variation-wrapper')}>
                              <div>Color: {item.selectedColor}</div>
                              <div className="mt-5">Size: {item.selectedSize}</div>
                            </div>
                          </div>
                          <div className={cx('price-wrapper')}>
                            <div className={cx('item-price')}>
                              <div className={cx('quantity-price')}>
                                <span className={cx('item-quantity')}>{item.quantity} ×</span>
                                <p className={cx('price-component')}>
                                  <Price value={item.product_price} />
                                </p>
                              </div>
                              <span className={cx('sub-total')}>
                                ${parseFloat(item.product_price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : 'No items in cart'}

          {/* <div className={cx('cart-item')}>
            <i
              onClick={(e) => {
                // dispatch(remove(index));
              }}
            >
              <svg className={cx('icon')} xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="-100 -100 584 712">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </i>
            <div className={cx('item-info')}>
              <Link to={`#`}>
                <img src={images.demoImageCart} alt="" className={cx('item-img')} />
              </Link>
              <div className="flex-1">
                <div className={cx('flex-container')}>
                  <div>
                    <Link to={`#`}>
                      <h4 className={cx('item-heading')}>Classic Shine Necklace</h4>
                    </Link>
                    <div className={cx('variation-wrapper')}>
                      <div>Color: {colors[0]}</div>
                      <div className="mt-5">Size: {sizes[0]}</div>
                    </div>
                  </div>
                  <div className={cx('price-wrapper')}>
                    <div className={cx('item-price')}>
                      <div className={cx('quantity-price')}>
                        <span className={cx('item-quantity')}>1 ×</span>
                        <p className={cx('price-component')}>
                          <Price value={20} />
                        </p>
                      </div>
                      <span className={cx('sub-total')}>$ 20.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className={cx('cart-total', 'mt-12px')}>
        <span>Subtotal: </span>
        <span className={cx('total-price')}>$ {parseFloat(totalCart).toFixed(2)}</span>
      </div>
      <div className={cx('btn-comp-1', 'mt-20px')}>
        <Button upperCase h100 w100 to={'/cart'}>
          View Cart
        </Button>
      </div>
      <div className={cx('btn-comp-1', 'mt-8px')}>
        <Button upperCase opposite h100 w100 outline to={'/checkout'}>
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
