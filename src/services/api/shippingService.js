import axios from 'axios';
import * as request from '~/utils/request';

export const getAllCity = async (options = {}) => {
  // const result = await request.get('products', options);

  const result = await axios.get('https://web-staging.ghtklab.com/api/v1/public/address/list');

  return result.data;
};

export const getAllDistrictByCity = async (idCity, options = {}) => {
  // const result = await request.get('products', options);

  const result = await axios.get(
    `https://web-staging.ghtklab.com/api/v1/public/address/list?parentId=${idCity}&type=3`,
  );

  return result.data;
};

export const getAllStreetByDistrict = async (idDistrict, options = {}) => {
    // const result = await request.get('products', options);
  
    const result = await axios.get(
      `https://web-staging.ghtklab.com/api/v1/public/address/list?parentId=${idDistrict}&type=3`,
    );
  
    return result.data;
  };
  