import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api/user";

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Add interceptor → attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access"); // your JWT access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const registerUser = (data) => api.post(`/register/`, data);
export const loginUser = (data) => api.post(`/login/`, data);
export const getProfile = () => api.get(`/profile/`);
export const sendResetEmail = (email) =>
  api.post(`/reset-email-password/`, { email });
export const resetPassword = (uid, token, passwords) =>
  api.post(`/reset-password/${uid}/${token}/`, passwords);

// Customer APIs
export const getCustomers = () => api.get(`/customers/`);

export const getCustomerDetail = (id) => api.get(`/customers/${id}/`);
export const addCustomer = (data) => api.post(`/customers/`, data);
export const updateCustomer = (id, data) => api.put(`/customers/${id}/`, data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}/`);


// Transactions
export const getTransactions = (customerId) =>
  api.get(`/customers/${customerId}/transactions/`);
export const addTransaction = (customerId, data) =>
  api.post(`/customers/${customerId}/transactions/`, data);

export const updateTransaction = (id, data) =>
  api.put(`/customers/transactions/${id}/`, data);

export const deleteTransaction = (id) =>
  api.delete(`/customers/transactions/${id}/`);


export const searchYouTube = (data) => api.post(`/youtube-search/`, data);
