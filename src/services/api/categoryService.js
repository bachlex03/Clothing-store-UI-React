import * as request from '~/utils/request';

export const getCategories = async () => {
  const result = await request.get(`categories`);

  return result.data;
};

export const getProductsByCategory = async (slug) => {
  const result = await request.get(`categories/${slug}/products`);
  return result.data;
};
