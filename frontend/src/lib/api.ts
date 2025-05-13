import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/auth/refresh', {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const auth = {
  register: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export interface Student {
    id: string;
    name: string;
    cardId: string;
    email: string;
    grade: string;
    balance: number;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    photo?: string;
    externalCode?: string;
    parent?: {
      name: string;
      phone: string;
      email: string;
    };
    ServiceEnrollment?: Array<{
      service: {
        name: string;
        category: string;
      };
    }>;
  }

  export const fetchStudents = async (searchTerm?: string): Promise<Student[]> => {
    try {
      const { data } = await api.get<Student[]>('/students/fins', {
        params: { search: searchTerm },
      });
      return data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw new Error('Failed to fetch students');
    }
  };

export default api;
