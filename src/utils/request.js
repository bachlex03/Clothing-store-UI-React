import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

request.defaults.withCredentials = true;

request.interceptors.request.use(function (config) {
  // Lấy token mới từ local storage và cập nhật header Authorization
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  },
);

// Helper function to handle query params in a consistent way:
export const buildQueryParams = (options) => {
  if (!options) {
    return '';
  }
  const params = new URLSearchParams();

  for (const key in options) {
    params.append(key, options[key]);
  }
  const queryString = params.toString();

  return queryString ? `?${queryString}` : ''; // Add ? only if params exist
};

export const get = async (path, options) => {
  const queryString = buildQueryParams(options);

  const response = await request.get('api/v1/' + path + queryString);

  return response.data;
};

export const post = async (path, options = {}) => {
  const response = await request.post('api/v1/' + path, options);

  return response.data;
};

export const put = async (path, options = {}) => {
  const response = await request.put('api/v1/' + path, options);

  return response;
};

export const patch = async (path, options = {}) => {
  const response = await request.patch('api/v1/' + path, options);

  return response;
};

export const remove = async (path, options = {}) => {
  console.log('path', path);
  const response = await request.delete('api/v1/' + path, options);

  return response;
};

export default request;
