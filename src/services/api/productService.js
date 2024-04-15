import * as request from '~/utils/request';

export const getAllProducts = async () => {
  const result = await request.get('products');

  return result.data;
};

export const createProduct = async (product) => {
  const result = await request.post('products', product);

  return result;
};

export const getImages = async (slug) => {
  const result = await request.get(`products/${slug}/images`);

  return result.data;
};
