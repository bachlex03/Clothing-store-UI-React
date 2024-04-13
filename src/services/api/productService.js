import request from '~/utils/request';

export const getAllProducts = async () => {
  const result = await request.get('products');

  return result.data;
};

export const createProduct = async (product) => {
  const result = await request.post('products', product);

  return result;
};
