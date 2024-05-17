import style from './Cart.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { TbCurrencyDollar } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import { vnpayIPN } from '~/services/api/paymenService';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';

const cx = classNames.bind(style);

function Cart() {
  const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cartList')) || []);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const params = window.location.search;
    if (params && params.includes('vnp_BankCode')) {
      getVNpayIpnMutate.mutate();
    }
  }, []);

  const getVNpayIpnMutate = useMutation({
    mutationFn: async () => {
      return await getVNPayIpn();
    },
    onSuccess: (data) => {
      console.log('data', data);
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

  const getVNPayIpn = async () => {
    const params = window.location.search;
    console.log(params);
    const response = await vnpayIPN(params);
    console.log(response);
    if (response.RspCode === '00') {
      setCartList([]);
      toast.success('Success', {
        description: 'Checkout successfully!',
      });
    } else {
      toast.error(`Error`, {
        description: `Checkout failed!`,
      });
    }
  };

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

  const removeProduct = (id, color, size) => {
    const newCartList = cartList.filter(
      (item) => item._id !== id || item.selectedColor !== color || item.selectedSize !== size,
    );
    setCartList(newCartList);
  };

  useEffect(() => {
    let total = 0;
    localStorage.setItem('cartList', JSON.stringify(cartList));
    cartList.map((item) => {
      total += item.product_price * item.quantity;
    });
    setTotal(total);
  }, [cartList]);

  return (
    <div className={cx('cart-container')}>
      <form>
        <table className={cx('table-container')}>
          <thead>
            <tr>
              {/* <th className="choose"></th> */}
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
                    {/* <td className="choose">
                      <input value="test" type="checkbox" />
                    </td> */}
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
                      <Link to={`/products/${item.product_slug}`} style={{ fontSize: '2rem', marginBottom: '8px' }}>
                        {item.product_name}
                      </Link>
                      <div style={{ marginBottom: '8px' }}>Color: {item.selectedColor} </div>
                      <div style={{ marginBottom: '8px' }}>Size: {item.selectedSize}</div>
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
                    <td
                      className={cx('product-remove')}
                      onClick={() => removeProduct(item._id, item.selectedColor, item.selectedSize)}
                    >
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
          </tbody>
        </table>
      </form>
      <div className={cx('cart-collaterals')}>
        <div className={cx('cart_totals')}>
          <h2 style={{ textAlign: 'right' }}>Cart totals</h2>
          <table className={cx('table-container')} style={{ textAlign: 'right' }}>
            <tbody>
              <tr className={cx('cart-subtotal')}>
                <th>Subtotal</th>
                <td data-title="Subtotal">
                  <bdi>
                    <span className={cx('icon')}>
                      <TbCurrencyDollar />
                    </span>
                    {parseFloat(total).toFixed(2)}
                  </bdi>
                </td>
              </tr>
              <tr className={cx('shipping-totals')}>
                <th>Shipping</th>
                <td data-title="Shipping" className={cx('shipping')}>
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
                </td>
              </tr>
              <tr class={cx('order-total')} style={{ marginTop: '10px' }}>
                <th>Total</th>
                <td data-title="Total">
                  <strong>
                    <bdi>
                      <span className={cx('icon')}>
                        <TbCurrencyDollar />
                      </span>
                      {parseFloat(total).toFixed(2)}
                    </bdi>
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={cx('proceed-to-checkout')}>
            <Link to="/checkout" className={cx('btn', 'btn-accent', 'text-white', 'btn-hover-primary')}>
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
