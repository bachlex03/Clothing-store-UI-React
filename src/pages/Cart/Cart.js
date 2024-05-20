import style from './Cart.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { TbCurrencyDollar } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import { vnpayIPN } from '~/services/api/paymenService';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { update, remove, clearCart } from '~/redux/features/cart/cartSlice';

const cx = classNames.bind(style);

function Cart() {
  const [total, setTotal] = useState(0);

  //handle
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.values);

  const handleIncrease = (index, item) => {
    let updatedObj = {
      index,
      item: {
        ...item,
        quantity: +item.quantity + 1,
      },
    };

    dispatch(update(updatedObj));
  };

  const handleDecrease = (index, item) => {
    let updatedObj = {
      index,
      item: {
        ...item,
        quantity: +item.quantity - 1,
      },
    };
    if (item.quantity === 1) return;

    dispatch(update(updatedObj));
  };

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
      dispatch(clearCart());
      toast.success('Success', {
        description: 'Checkout successfully!',
      });
    } else {
      toast.error(`Error`, {
        description: `Checkout failed!`,
      });
    }
  };

  const handleChangeQuantity = (index, item, value) => {
    if (+value === 0 || +value < 0) return;
    let updatedObj = {
      index,
      item: {
        ...item,
        quantity: value,
      },
    };

    dispatch(update(updatedObj));
  };

  useEffect(() => {
    let total = 0;
    cartItems.map((item) => {
      total += item.price * item.quantity;
    });
    setTotal(total);
  }, [cartItems]);

  return (
    <div className={cx('cart-container')}>
      <form>
        <table className={cx('table-container')}>
          <thead>
            <tr>
              <th className="thumbnail"></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th className="remove"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => {
                return (
                  <tr className={cx('cart-item')}>
                    <td className={cx('product-thumbnail')}>
                      <img
                        width="110"
                        height="138"
                        loading="lazy"
                        src={item && item.image ? item.image : ''}
                        alt="thumbnail"
                      />
                    </td>
                    <td className="product-name">
                      <Link to={`/products/${item.slug}`} style={{ fontSize: '2rem', marginBottom: '8px' }}>
                        {item.name}
                      </Link>
                      <div style={{ marginBottom: '8px' }}>Color: {item.color} </div>
                      <div style={{ marginBottom: '8px' }}>Size: {item.size}</div>
                    </td>
                    <td className={cx('product-price')} data-title="Price">
                      <bdi>
                        <span className={cx('icon')}>
                          <TbCurrencyDollar />
                        </span>
                        {parseFloat(item.price).toFixed(2)}
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
                          onChange={(e) => handleChangeQuantity(index, item, e.target.value)}
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
                          onClick={() => handleIncrease(index, item)}
                        ></span>
                        <span
                          className={cx('cms-qty-act', 'cms-qty-down')}
                          onClick={() => handleDecrease(index, item)}
                        ></span>
                      </div>
                    </td>
                    <td className={cx('product-subtotal')}>
                      <bdi>
                        <span className={cx('icon')}>
                          <TbCurrencyDollar />
                        </span>
                        {parseFloat(item.price * item.quantity).toFixed(2)}
                      </bdi>
                    </td>
                    <td className={cx('product-remove')} onClick={() => dispatch(remove(index))}>
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
