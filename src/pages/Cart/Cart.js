import Table from 'react-bootstrap/Table';
import style from './Cart.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { TbCurrencyDollar } from 'react-icons/tb';

const cx = classNames.bind(style);

function Cart() {
  return (
    <div className={cx('cart-container')}>
      <form>
        <Table striped borderless className={cx('table-container')}>
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
            <tr className={cx('cart-item')}>
              <td className="choose">
                <input value="test" type="checkbox" />
              </td>
              <td className={cx('product-thumbnail')}>
                <img
                  width="110"
                  height="138"
                  loading="lazy"
                  src="https://demo.cmssuperheroes.com/themeforest/chani/wp-content/uploads/Dust-Lightweight-Jacket-1-400x500.jpg"
                />
              </td>
              <td className="product-name">
                <Link to="/">Dark Olive Short Dress</Link>
              </td>
              <td className={cx('product-price')} data-title="Price">
                <bdi>
                  <span className={cx('icon')}>
                    <TbCurrencyDollar />
                  </span>
                  79.00
                </bdi>
              </td>
              <td className={cx('product-quantity')} data-title="Quantity">
                <div className={cx('quantity')}>
                  <input
                    type="number"
                    className={cx('qty')}
                    id
                    name
                    value="2"
                    size="4"
                    min="0"
                    max=""
                    step="1"
                    placeholder=""
                    inputMode="numeric"
                    autoComplete="off"
                  />
                  <span className={cx('cms-qty-act', 'cms-qty-up')}></span>
                  <span className={cx('cms-qty-act', 'cms-qty-down')}></span>
                </div>
              </td>
              <td className="product-subtotal">Subtotal</td>
              <td className="remove">x</td>
            </tr>
            <tr className={cx('cart-item')}>
              <td className="choose">
                <input value="test" type="checkbox" />
              </td>
              <td className={cx('product-thumbnail')}>
                <img
                  width="110"
                  height="138"
                  loading="lazy"
                  src="https://demo.cmssuperheroes.com/themeforest/chani/wp-content/uploads/Dark-Olive-Short-Dress-1-110x138.jpg"
                />
              </td>
              <td className="product-name">
                <Link to="/">Dark Olive Short Dress</Link>
              </td>
              <td className={cx('product-price')} data-title="Price">
                <bdi>
                  <span>
                    <TbCurrencyDollar />
                  </span>
                  79.00
                </bdi>
              </td>
              <td className={cx('product-quantity')} data-title="Quantity">
                <div className={cx('quantity')}>
                  <input
                    type="number"
                    className={cx('qty')}
                    id
                    name
                    value="2"
                    size="4"
                    min="0"
                    max=""
                    step="1"
                    placeholder=""
                    inputMode="numeric"
                    autoComplete="off"
                  />
                  <span className={cx('cms-qty-act', 'cms-qty-up')}></span>
                  <span className={cx('cms-qty-act', 'cms-qty-down')}></span>
                </div>
              </td>
              <td className="product-subtotal">Subtotal</td>
              <td className="remove">x</td>
            </tr>
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
        </Table>
      </form>
    </div>
  );
}

export default Cart;
