import style from './Cart.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { TbCurrencyDollar } from 'react-icons/tb';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function Cart() {
  const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartList')) || []);

  const handleChangeQuantity = (value, id) => {
    if (+value === 0) return;
    const newCartList = cartList.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: value };
      }
      return item;
    });
    setCartList(newCartList);
  };

  const handleQuantity = (type, id) => {
    const newCartList = cartList.map((item) => {
      if (item._id === id) {
        if (type === 1) {
          return { ...item, quantity: +item.quantity + 1 };
        } else {
          if (item.quantity === 1) return item;
          return { ...item, quantity: +item.quantity - 1 };
        }
      }
      return item;
    });
    setCartList(newCartList);
  };

  const removeProduct = (id) => {
    const newCartList = cartList.filter((item) => item._id !== id);
    setCartList(newCartList);
  };

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);

  return (
    <div className={cx('cart-container')}>
      <form>
        <table className={cx('table-container')}>
          <thead>
            <tr>
              <th className="choose"></th>
              <th className="thumbnail"></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th className="remove"></th>
            </tr>
          </thead>
          <tbody>
            {cartList && cartList.length > 0 ? (
              cartList.map((item) => {
                return (
                  <tr className={cx('cart-item')}>
                    <td className="choose">
                      <input value="test" type="checkbox" />
                    </td>
                    <td className={cx('product-thumbnail')}>
                      <img
                        width="110"
                        height="138"
                        loading="lazy"
                        src={item && item.product_imgs.length > 0 ? item.product_imgs[0].url : ''}
                        alt="thumbnail"
                      />
                    </td>
                    <td className="product-name">
                      <Link to={`/products/${item.product_slug}`}>{item.product_name}</Link>
                      <div>Color: {item.selectedColor} </div>
                      <div>Size: {item.selectedSize}</div>
                    </td>
                    <td className={cx('product-price')} data-title="Price">
                      <bdi>
                        <span className={cx('icon')}>
                          <TbCurrencyDollar />
                        </span>
                        {parseFloat(item.product_price).toFixed(2)}
                      </bdi>
                    </td>
                    <td className={cx('product-quantity')} data-title="Quantity">
                      <div className={cx('quantity')}>
                        <input
                          type="number"
                          className={cx('qty')}
                          id
                          name
                          value={item.quantity}
                          onChange={(e) => handleChangeQuantity(e.target.value, item._id)}
                          size="4"
                          min="0"
                          max=""
                          step="1"
                          placeholder=""
                          inputMode="numeric"
                          autoComplete="off"
                        />
                        <span
                          className={cx('cms-qty-act', 'cms-qty-up')}
                          onClick={() => handleQuantity(1, item._id)}
                        ></span>
                        <span
                          className={cx('cms-qty-act', 'cms-qty-down')}
                          onClick={() => handleQuantity(-1, item._id)}
                        ></span>
                      </div>
                    </td>
                    <td className={cx('product-subtotal')}>
                      <bdi>
                        <span className={cx('icon')}>
                          <TbCurrencyDollar />
                        </span>
                        {parseFloat(item.product_price * item.quantity).toFixed(2)}
                      </bdi>
                    </td>
                    <td className={cx('product-remove')} onClick={() => removeProduct(item._id)}>
                      X
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} align="center">
                  No product in cart
                </td>
              </tr>
            )}
            <tr>
              <td colSpan={'6'} className="actions">
                <div className={cx('coupon')}>
                  <input
                    type="text"
                    name="coupon_code"
                    className="input-coupon"
                    id="coupon_code"
                    value=""
                    placeholder="Coupon code"
                  />
                  <button type="submit" className={cx('button')} name="apply_coupon" value="Apply coupon">
                    Apply coupon
                  </button>
                </div>
                <button type="submit" className={cx('button')} name="update_cart" value="Update cart" disabled="">
                  Update cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className={cx('cart-collaterals')}>
        <div className={cx('cart_totals')}>
          <h2>Cart totals</h2>
          <table className={cx('table-container')}>
            <tbody>
              <tr className={cx('cart-subtotal')}>
                <th>Subtotal</th>
                <td data-title="Subtotal">
                  <bdi>
                    <span className={cx('icon')}>
                      <TbCurrencyDollar />
                    </span>
                    79.00
                  </bdi>
                </td>
              </tr>
              <tr className={cx('shipping-totals')}>
                <th>Shipping</th>
                <td data-title="Shipping">
                  <ul id="shipping_method" className={cx('shipping-methods')}>
                    <li>
                      <input
                        type="radio"
                        name="shipping_method[0]"
                        data-index="0"
                        id="shipping_method_0_flat_rate1"
                        value="flat_rate:1"
                        class="shipping_method"
                        checked="checked"
                      />
                      <label for="shipping_method_0_flat_rate1">Flat rate</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="shipping_method[0]"
                        data-index="0"
                        id="shipping_method_0_wc_pickup_store"
                        value="wc_pickup_store"
                        class="shipping_method"
                      />
                      <label for="shipping_method_0_wc_pickup_store">Pickup Store</label>
                    </li>
                  </ul>
                  <p class="shipping-destination">
                    Shipping to <strong>CA</strong>.
                  </p>
                </td>
              </tr>
              <tr class={cx('order-total')}>
                <th>Total</th>
                <td data-title="Total">
                  <strong>
                    <bdi>
                      <span className={cx('icon')}>
                        <TbCurrencyDollar />
                      </span>
                      79.00
                    </bdi>
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={cx('proceed-to-checkout')}>
            <Link to="/" className={cx('btn', 'btn-accent', 'text-white', 'btn-hover-primary')}>
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
