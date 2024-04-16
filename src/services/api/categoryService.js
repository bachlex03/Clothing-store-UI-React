import * as request from '~/utils/request';

export const getChildren = async () => {
  const result = await request.get(`categories/children`);

  return result.data;
};
