import * as request from '~/utils/request';

export const getAllProducts = async (options = {}) => {
    // const result = await request.get('products', options);

    const result = await request.get('products', options);

    return result.data;
};

export const createProduct = async (product) => {
    console.log('createProduct', product);
    const result = await request.post('products', product);

    return result;
};

export const removeProduct = async (id) => {
    const result = await request.remove('products/' + id);

    return result;
};

export const getImages = async (slug) => {
    const result = await request.get(`products/${slug}/images`);

    return result.data;
};

export const getDetails = async (param) => {
    const result = await request.get(`products/${param}`);

    return result.data;
};

export const search = async (param) => {
    const result = await request.get(`products/search`, param);

    return result.data;
};

export const getProductReviews = async (slug, options = {}) => {
    const result = await request.get(`products/${slug}/reviews`, options);

    return result.data;
};

export const getDetailProduct = async (slug) => {
    const result = await request.get(`products/${slug}`);
    return result.data;
};

export const getNewArrivals = async () => {
    const response = await request.get('products/new-arrivals');
    return response.data;
};

export const getOnSaleProducts = async () => {
    const response = await request.get('products/on-sale');
    return response.data;
};

export const getBestSellers = async () => {
    const response = await request.get('products/best-sellers');
    return response.data;
};
