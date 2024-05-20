import * as request from '~/utils/request';

export const addAccount = async (user) => {
  const result = await request.post('users/business-account', user);

  return result;
};

export const getMember = async (user) => {
  const result = await request.get('users/business/member');

  return result;
};
