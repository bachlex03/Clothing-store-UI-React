import style from './DetailInvoiceModal.module.scss';
import classNames from 'classnames/bind';
import Modal from './Modal';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function DetailInvoiceModal({ isOpen, onClose, invoice }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <div className={cx('content')}>
          <div className={cx('head')}>
            <div className={cx('info')}>
              <h3 className={cx('heading')}>Invoice</h3>
              <p>
                <strong>BILLED: </strong> {invoice?.invoice_fullname}
              </p>
              <p>
                <strong>DATE: </strong> {new Date(invoice.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>ORDER ID: </strong> #{invoice && invoice._id && invoice._id.slice(-4)}
              </p>
            </div>
            <div className={cx('logo')}>
              <img src={require('~/assets/images/logo-chani-dark.png')}></img>
              <h5>Fashion as unique as you are.</h5>
            </div>
          </div>
          <div className={cx('detail')}>
            <table>
              <thead>
                <tr>
                  <th className={cx('product-name')}>Product</th>
                  <th className={cx('product-price')}>Price</th>
                  <th className={cx('product-quantity')}>Quantity</th>
                  <th className={cx('product-total')}>Total</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td className={cx('product-name')}>Product 1</td>
                  <td>$ 100.00</td>
                  <td>1</td>
                  <td>$ 100.00</td>
                </tr> */}
                {invoice &&
                  invoice.invoice_products &&
                  invoice.invoice_products.map((item) => (
                    <tr key={item._id}>
                      <Link to={`/products/${item.slug ?? '#'}`}>
                        <td className={cx('product-name')}>{item.product_name}</td>
                      </Link>
                      <td>${item.product_final_price || item.product_price}</td>
                      <td>{item.product_quantity}</td>
                      <td>${(item.product_final_price || item.product_price) * item.product_quantity}</td>
                    </tr>
                  ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  <td>${invoice.invoice_total / 25000}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={cx('footer')}>
          <p>Thank you for your purchase!</p>
          <p>If you have any questions about your order, please contact our customer service.</p>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailInvoiceModal;
