export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.example.com', // Updated for production
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  USE_MOCK_DATA: true, // Enable mock data for Netlify deployment
} as const;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    VERIFY: '/auth/verify',
    LOGOUT: '/auth/logout',
  },
  STUDENTS: {
    ALL: '/students/all',
    STATS: '/students/stats',
    BULK_UPLOAD: '/students/bulk-upload',
    FINANCE_DATA: '/students/finance-data',
  },
  SERVICES: {
    BASE: '/services',
    ENROLLMENTS: '/service-enrollments',
  },
  PAYMENTS: {
    BASE: '/payments',
    RECORD: '/payments',
  },
  REPORTS: {
    FINANCIAL: '/reports/financial',
  },
} as const;