import axios from 'axios';
import { Navigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
  request => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  error => {
    console.error('Interceptor error:', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  async error => {
    console.log(error);
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.response?.data?.error === 'Access Token Expired') {
      try {
        const response = await api.get('/refresh/accesstoken', { withCredentials: true });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        if (refreshErr.response?.status === 403) {
          localStorage.removeItem('accessToken');
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  },
);

export { api };
