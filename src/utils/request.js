import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

request.defaults.withCredentials = true;

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

export const get = async (path, options = {}) => {
  const response = await request.get('api/v1/' + path, options);

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

export default request;
