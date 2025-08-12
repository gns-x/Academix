import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG, ENDPOINTS } from '../config/api';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    }

    return Promise.reject(error);
  }
);

export const auth = {
  login: async (data: { email: string; password: string }) => {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, data);
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return response.data;
  },

  verify: async () => {
    const response = await api.get(ENDPOINTS.AUTH.VERIFY);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const students = {
  getAll: async () => {
    const response = await api.get(ENDPOINTS.STUDENTS.ALL);
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get(ENDPOINTS.STUDENTS.STATS);
    return response.data;
  },
  
  getFinanceData: async (searchTerm?: string) => {
    const response = await api.get(ENDPOINTS.STUDENTS.FINANCE_DATA, {
      params: { search: searchTerm },
    });
    return response.data;
  },
  
  bulkUpload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(ENDPOINTS.STUDENTS.BULK_UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export const services = {
  getAll: async () => {
    const response = await api.get(ENDPOINTS.SERVICES.BASE);
    return response.data;
  },
  
  create: async (serviceData: any) => {
    const response = await api.post(ENDPOINTS.SERVICES.BASE, serviceData);
    return response.data;
  },
  
  update: async (id: string, serviceData: any) => {
    const response = await api.patch(`${ENDPOINTS.SERVICES.BASE}/${id}`, serviceData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`${ENDPOINTS.SERVICES.BASE}/${id}`);
    return response.data;
  },
};

export const payments = {
  record: async (paymentData: any) => {
    const response = await api.post(ENDPOINTS.PAYMENTS.RECORD, paymentData);
    return response.data;
  },
};

export const reports = {
  generateFinancial: async (data: any) => {
    const response = await api.post(ENDPOINTS.REPORTS.FINANCIAL, data, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export const fetchStudents = async (searchTerm?: string) => {
  return students.getFinanceData(searchTerm);
};

export default api;
