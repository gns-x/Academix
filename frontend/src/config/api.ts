export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
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