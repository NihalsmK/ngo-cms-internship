import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const registerUser = (data) => api.post('auth/register/', data);
export const loginUser = (data) => api.post('auth/login/', data);
export const me = (token) =>
  api.get('auth/me/', { headers: { Authorization: `Bearer ${token}` } });

export default api;
