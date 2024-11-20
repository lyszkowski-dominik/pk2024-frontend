import axios from 'axios';
import { GetToken } from '../features/auth/GetToken';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = GetToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
