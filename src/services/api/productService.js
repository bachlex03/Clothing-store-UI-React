import * as request from '~/utils/request';

export const getAllProducts = async (options = {}) => {
  // const result = await request.get('products', options);

  const result = await request.get('products', options);

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
