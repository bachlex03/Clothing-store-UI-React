import style from './DetailInvoiceModal.module.scss';
import classNames from 'classnames/bind';
import Modal from './Modal';

const cx = classNames.bind(style);

function DetailInvoiceModal({ isOpen, onClose, title }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className={cx('content')}>
          <div className={cx('head')}>
            <div className={cx('info')}>
              <h2>Invoice</h2>
              <p>
                <strong>BILLED: </strong> Edna Frank
              </p>
              <p>
                <strong>DATE: </strong> March 12, 2021
              </p>
              <p>
                <strong>ORDER ID: </strong> #1553
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
                <tr>
                  <td className={cx('product-name')}>Product 1</td>
                  <td>$ 100.00</td>
                  <td>1</td>
                  <td>$ 100.00</td>
                </tr>
                <tr>
                  <td className={cx('product-name')}>Product 2</td>
                  <td>$ 100.00</td>
                  <td>1</td>
                  <td>$ 100.00</td>
                </tr>
                <tr>
                  <td className={cx('product-name')}>Product 3</td>
                  <td>$ 100.00</td>
                  <td>1</td>
                  <td>$ 100.00</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total</td>
                  <td>$ 300.00</td>
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
