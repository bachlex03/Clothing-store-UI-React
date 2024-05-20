import * as request from '~/utils/request';

export const getRoles = async (user) => {
  const result = await request.get('rbac/roles/categories');

  return result;
};
