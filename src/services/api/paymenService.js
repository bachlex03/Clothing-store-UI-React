import axios from 'axios';
import * as request from '~/utils/request';

export const getInfoCheckout = async (param) => {
  const result = await request.get(`users/checkoutInfo`);

  return result.data;
};

export const updateInfo = async (data) => {
  const result = await request.put('users/checkoutInfo', data);

  return result;
};

export const paymentVNPay = async (data) => {
  const result = await request.post('payment', data);

  return result;
};

export const paymentCash = async (data) => {
  const result = await request.post('payment/cash', data);

  return result;
};

export const vnpayIPN = async (param) => {
  const result = await request.get(`vnpay/vnpay_ipn${param}`);

  return result.data;
};
