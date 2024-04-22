import style from './Order.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Order() {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('heading')}>Orders</h3>
      <table className={cx('w-100 table text-center')}>
        <thead className={cx('thead')}>
          <tr>
            <th style={{ width: 15 + '%' }} className={cx()}>
              Order
            </th>
            <th style={{ width: 30 + '%' }} className={cx()}>
              Date
            </th>
            <th style={{ width: 15 + '%' }} className={cx()}>
              Status
            </th>
            <th style={{ width: 20 + '%' }} className={cx()}>
              Total
            </th>
            <th style={{ width: 20 + '%' }} className={cx()}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className={cx('tbody')}>
          <tr className={cx('')}>
            <td className={cx()}>#1553</td>
            <td className={cx()}>Fri Dec 08 11:30:02 ICT 2023</td>
            <td className={cx('text-center')}>Payed</td>
            <td className={cx()}>$ 613.00</td>
            <td className={cx()}>
              <button type="button" className={cx('btn btn-dark rounded-0', 'button')}>
                View
              </button>
            </td>
          </tr>
          <tr>
            <td className={cx()}>#1553</td>
            <td className={cx()}>Fri Dec 08 11:30:02 ICT 2023</td>
            <td className={cx()}>Payed</td>
            <td className={cx()}>$ 613.00</td>
            <td className={cx()}>
              <button type="button" className={cx('btn btn-dark rounded-0', 'button')}>
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Order;
