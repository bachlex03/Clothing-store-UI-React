import style from './Order.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import DetailInvoiceModal from '~/components/DetailInvoiceModal';
import ReviewOrderModal from '~/pages/Customer/Order/ReviewOrderModal/ReviewOrderModal';
import * as accountService from '~/services/api/accountService';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Order() {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [invoice, setInvoice] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  const fetchingInvoice = useMutation({
    mutationFn: async () => {
      return await accountService.getInvoices();
    },
    onSuccess: (data) => {
      console.log('data', data);
      setInvoices(data.data);
    },
    onError: (error) => {
      console.log('error', error);
      toast.error(`Error ${error.response?.status}`, {
        description: `${error.response?.data?.message}`,
      });
      // if code is 401, it means user is not authenticated, navigate to login page
      if (error.response?.status === 401) {
        navigate('/login');
      }
    },
  });

  useEffect(() => {
    fetchingInvoice.mutate();
  }, []);

  // set show modal and set invoice
  const handleViewInvoice = (invoice) => {
    setInvoice(invoice);
    setOpenDetailModal(true);
  };

  // Update this function to set the selected order ID
  const handleReviewOrder = (invoice) => {
    setSelectedOrderId(invoice._id);
    setOpenReviewModal(true);
  };

  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('heading')}>Orders</h3>
      <table className={cx('table')}>
        <thead className={cx('thead')}>
          <tr>
            <th style={{ width: 15 + '%' }} className={cx('order', 'text-left')}>
              Order
            </th>
            <th style={{ width: 30 + '%' }} className={cx('date', 'text-left')}>
              Date
            </th>
            <th style={{ width: 15 + '%' }} className={cx('status', 'text-left')}>
              Status
            </th>
            <th style={{ width: 15 + '%' }} className={cx('total', '')}>
              Total
            </th>
            <th style={{ width: 20 + '%' }} className={cx('action', 'text-center')}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className={cx('tbody')}>
          {invoices && invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td className={cx('order')}>#{invoice._id && invoice._id.slice(-4)}</td>
                <td className={cx('date')}>{new Date(invoice.createdAt).toLocaleString()}</td>
                <td className={cx('status')}>{invoice.invoice_status}</td>
                <td className={cx('total')}>${invoice.invoice_total / 25000}</td>
                <td className={cx('action')}>
                  <div className={cx('btn-wrapper')}>
                    <div className={cx('btn-column')}>
                      <button type="button" className={cx('button')} onClick={() => handleViewInvoice(invoice)}>
                        View
                      </button>
                    </div>
                    <div className={cx('btn-column')}>
                      {/* {invoice.invoice_status === 'paid' && ( */}
                      <button type="button" className={cx('button', 'review-button')} onClick={() => handleReviewOrder(invoice)}>
                        Review
                      </button>
                      {/* )} */}
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No invoices found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <DetailInvoiceModal isOpen={openDetailModal} onClose={() => setOpenDetailModal(false)} invoice={invoice} />
      <ReviewOrderModal
        isOpen={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        orderId={selectedOrderId} // Pass orderId instead of products
      />
    </div>
  );
}

export default Order;
