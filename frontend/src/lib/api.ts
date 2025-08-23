import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG, ENDPOINTS } from '../config/api';
import toast from 'react-hot-toast';
import { mockStudents, mockServices, mockPayments, mockStats } from '../data/mockData';

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

// Mock data functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const auth = {
  login: async (data: { email: string; password: string }) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(1000);
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      return { access_token: mockToken, user: { email: data.email, role: 'admin' } };
    }
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, data);
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return response.data;
  },

  verify: async () => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(500);
      return { user: { email: 'admin@example.com', role: 'admin' } };
    }
    const response = await api.get(ENDPOINTS.AUTH.VERIFY);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const students = {
  getAll: async () => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(800);
      return mockStudents;
    }
    const response = await api.get(ENDPOINTS.STUDENTS.ALL);
    return response.data;
  },
  
  getStats: async () => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(600);
      return mockStats;
    }
    const response = await api.get(ENDPOINTS.STUDENTS.STATS);
    return response.data;
  },
  
  getFinanceData: async (searchTerm?: string) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(700);
      let filteredStudents = mockStudents;
      if (searchTerm) {
        filteredStudents = mockStudents.filter(student => 
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return filteredStudents;
    }
    const response = await api.get(ENDPOINTS.STUDENTS.FINANCE_DATA, {
      params: { search: searchTerm },
    });
    return response.data;
  },
  
  bulkUpload: async (file: File) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(2000);
      return { message: 'Mock bulk upload successful', count: 5 };
    }
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
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(600);
      return mockServices;
    }
    const response = await api.get(ENDPOINTS.SERVICES.BASE);
    return response.data;
  },
  
  create: async (serviceData: any) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(800);
      const newService = { id: Date.now().toString(), ...serviceData };
      return newService;
    }
    const response = await api.post(ENDPOINTS.SERVICES.BASE, serviceData);
    return response.data;
  },
  
  update: async (id: string, serviceData: any) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(600);
      return { id, ...serviceData };
    }
    const response = await api.patch(`${ENDPOINTS.SERVICES.BASE}/${id}`, serviceData);
    return response.data;
  },
  
  delete: async (id: string) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(500);
      return { message: 'Service deleted successfully' };
    }
    const response = await api.delete(`${ENDPOINTS.SERVICES.BASE}/${id}`);
    return response.data;
  },
};

export const payments = {
  record: async (paymentData: any) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(1000);
      return { ...paymentData, id: Date.now().toString(), status: 'completed' };
    }
    const response = await api.post(ENDPOINTS.PAYMENTS.RECORD, paymentData);
    return response.data;
  },
};

export const reports = {
  generateFinancial: async (data: any) => {
    if (API_CONFIG.USE_MOCK_DATA) {
      await delay(1500);
      // Return a mock blob for PDF download
      const mockPdfContent = 'Mock PDF content';
      return new Blob([mockPdfContent], { type: 'application/pdf' });
    }
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
