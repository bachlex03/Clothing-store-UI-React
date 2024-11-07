import * as request from '~/utils/request';
import axios from 'axios';

export const login = async (user) => {
  const result = await request.post('auth/login', user);

  return result;
};

export const register = async (user) => {
  const result = await request.post('auth/register', user);

  return result;
};

export const sendMailToken = async (token) => {
  const result = await request.get(`auth/sendMailToken?${token}`);

  return result;
};

export const verifyEmail = async (token) => {
  const result = await request.post('auth/verifyEmail', token);

  return result;
};

export const recoverPassword = async (email) => {
  const result = await request.post('auth/recover', email);

  return result;
};

export const resetPassword = async (token, password) => {
  const result = await request.post(`auth/reset-password?${token}`, password);

  return result;
};

export const getCities = async () => {
  try {
    const response = await axios.get('https://web-staging.ghtklab.com/api/v1/public/address/list');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getDistricts = async (provinceId) => {
  try {
    const response = await axios.get(
      `https://web-staging.ghtklab.com/api/v1/public/address/list?parentId=${provinceId}&type=3`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProfile = async () => {
  const result = await request.get('users/profile');

  return result;
};

export const updateProfile = async (user) => {
  const result = await request.put('users/profile', user);

  return result;
};

export const getAddresses = async () => {
  const result = await request.get('users/addresses');

  return result;
};

export const updateAddress = async (address) => {
  const result = await request.put('users/addresses', address);

  return result;
};

export const updatePassword = async (password) => {
  const result = await request.patch('users/password', password);

  return result;
};

export const updateCheckoutInfo = async (info) => {
  const result = await request.put('users/checkoutInfo', info);

  return result;
};

export const getInvoices = async () => {
  const result = await request.get('users/invoices');

  return result;
};

export const getInvoiceReviews = async (orderId) => {
  const result = await request.get(`users/invoices/reviews?orderId=${orderId}`);

  return result;
};

export const createProductReview = async (reviewData) => {
  const result = await request.post('users/invoices/reviews', reviewData);

  return result;
};

export const updateProductReview = async (reviewData) => {
  const result = await request.put('users/invoices/reviews', reviewData);

  return result;
};
