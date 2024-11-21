import style from './CheckoutResult.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { FaRegCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import * as checkoutService from '~/services/api/checkoutService';
import { useDispatch } from 'react-redux';
import { clearCart } from '~/redux/features/cart/cartSlice';

const cx = classNames.bind(style);

const formatToVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const hour = dateString.substring(8, 10);
  const minute = dateString.substring(10, 12);
  const second = dateString.substring(12, 14);

  const date = new Date(year, month - 1, day, hour, minute, second);
  return date.toLocaleString();
};

const CheckoutResult = () => {
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchingVnPayIpn = useMutation({
    mutationFn: async (data) => await checkoutService.vnPayIpn(data),
    onSuccess: (response) => {
      const { RspCode } = response.data;
      setPaymentStatus(RspCode);
      
      if (RspCode === '00') {
        dispatch(clearCart());
      }
      window.history.replaceState({}, '', '/checkout-result');
    }
  });

  useEffect(() => {
    const data = new URLSearchParams(window.location.search);
    
    if (data.toString() !== '') {
      const orderNumber = data.get('vnp_OrderInfo');
      const amount = data.get('vnp_Amount');
      const payDate = data.get('vnp_PayDate');

      setOrderDetails({
        orderNumber,
        amount: amount ? Number(amount) / 100 : 0,
        date: formatDate(payDate)
      });

      fetchingVnPayIpn.mutate(data);
    }
  }, []);

  const renderPaymentResult = () => {
    if (paymentStatus === '00') {
      return (
        <>
          <FaRegCheckCircle className={cx('success-payment__icon')} />
          <h1 className={cx('success-payment__title')}>Payment Successful!</h1>
          <p className={cx('success-payment__message')}>
            Thank you for your purchase. Your order has been processed successfully.
          </p>
        </>
      );
    } else {
      return (
        <>
          <FaTimesCircle className={cx('success-payment__icon', 'failed')} />
          <h1 className={cx('success-payment__title', 'failed')}>Payment Failed!</h1>
          <p className={cx('success-payment__message')}>
            Sorry, your payment could not be processed. Please try again or contact support.
          </p>
        </>
      );
    }
  };

  return (
    <div className={cx('success-payment')}>
      <div className={cx('success-payment__container')}>
        {renderPaymentResult()}
        
        <div className={cx('success-payment__details')}>
          <h2>Order Details</h2>
          <ul>
            <li>
              <strong>Order Number:</strong> {orderDetails?.orderNumber}
            </li>
            <li>
              <strong>Amount:</strong> {orderDetails?.amount ? formatToVND(orderDetails.amount) : '0 ₫'}
            </li>
            <li>
              <strong>Date:</strong> {orderDetails?.date}
            </li>
          </ul>
        </div>

        <button
          className={cx('success-payment__button')}
          onClick={() => window.location.href = '/'}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutResult;
