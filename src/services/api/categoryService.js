import * as request from '~/utils/request';

export const getCategories = async () => {
  const result = await request.get(`categories`);

  return result.data;
};
