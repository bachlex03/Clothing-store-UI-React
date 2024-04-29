import * as request from '~/utils/request';

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
