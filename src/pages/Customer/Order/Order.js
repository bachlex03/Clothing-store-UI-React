import style from './Order.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import DetailInvoiceModal from '~/components/DetailInvoiceModal';
import * as accountService from '~/services/api/accountService';
import { useMutation } from '@tanstack/react-query'; // Ensure correct import
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Order() {
  const [openModal, setOpenModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [invoice, setInvoice] = useState({});
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
    console.log('invoice', invoice);
    setOpenModal(true);
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
                <td className={cx('action', 'text-center')}>
                  <div className={cx('btn-wrapper')}>
                    <button type="button" className={cx('button')} onClick={() => handleViewInvoice(invoice)}>
                      View
                    </button>
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

      <DetailInvoiceModal isOpen={openModal} onClose={() => setOpenModal(false)} invoice={invoice}></DetailInvoiceModal>
    </div>
  );
}

export default Order;
