import style from './CheckoutResult.module.scss';
import classNames from 'classnames/bind';
import React, { useRef, useEffect, useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

const cx = classNames.bind(style);

const CheckoutResult = () => {
  const orderDetails = {
    orderNumber: '#12345',
    amount: 99.99,
    date: new Date().toLocaleDateString(),
  };

  return (
    <div className={cx('success-payment')}>
      <div className={cx('success-payment__container')}>
        <FaRegCheckCircle className={cx('success-payment__icon')} />
        <h1 className={cx('success-payment__title')}>Payment Successful!</h1>
        <p className={cx('success-payment__message')}>
          Thank you for your purchase. Your order has been processed successfully.
        </p>
        {/* <div className={cx('success-payment__details')}>
          <h2>Order Details</h2>
          <ul>
            <li>
              <strong>Order Number:</strong> {orderDetails.orderNumber}
            </li>
            <li>
              <strong>Amount Paid:</strong> ${orderDetails.amount.toFixed(2)}
            </li>
            <li>
              <strong>Date:</strong> {orderDetails.date}
            </li>
          </ul>
        </div> */}
        <button className={cx('success-payment__button')} onClick={() => (window.location.href = '/')}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutResult;
