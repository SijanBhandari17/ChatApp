import axios from 'axios';
import { getFromLocalStorage, saveToLocalStroage } from './saveToLocalStorage';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
  request => {
    const accessToken = getFromLocalStorage('accessToken');
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
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response?.data?.error === 'Access Token Expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await api.get('/refresh/accesstoken', { withCredentials: true });
        const { accessToken } = response.data;
        saveToLocalStroage('accessToken', accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        if (refreshErr.response?.status === 403) {
          localStorage.removeItem('accessToken');
          console.log('refresh token expired logging user out');
          window.location.href('/');
          return Promise.reject(refreshErr);
        }
      }
    }
    return Promise.reject(error);
  },
);

export { api };
