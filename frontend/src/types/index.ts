// Common Types
export type ViewMode = 'grid' | 'list';
export type ActionType = 'delete' | 'status' | 'export' | 'enroll' | 'services';
export type ReportType = 'enrollment' | 'academic' | 'services' | 'attendance' | 'financial' | 'activities' | 'behavioral' | 'communication';

export interface Student {
  id: string;
  name: string;
  cardId: string;
  email: string;
  grade: string;
  balance: number;
  externalCode: string;
  dateOfBirth?: string;
  gender?: string;
  Section?: string;
  photo?: string;
  parent?: {
    name: string;
    email: string;
    phone: string;
  };
  ServiceEnrollment?: Array<{
    id: string;
    service: {
      name: string;
      category: string;
    };
  }>;
  totalAmount?: number;
  paidAmount?: number;
  remainingAmount?: number;
}

export interface Filters {
  grade: string;
  status: string;
  year: string;
  externalCode?: string;
}

export interface SortConfig {
  key: keyof Student;
  direction: 'asc' | 'desc';
}

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type: 'warning' | 'danger' | 'info';
}

export interface ActionMenuProps {
    student: Student;
    onAction: (action: string, studentId: string) => void;
  }



export interface ReportCardProps {
  title: string;
  icon: any;
  description: string;
  onClick: () => void;
}

export enum ServiceCategory {
    TRANSPORTATION = 'TRANSPORTATION',
    CAFETERIA = 'CAFETERIA',
    EXTRACURRICULAR = 'EXTRACURRICULAR',
    TUTORING = 'TUTORING',
    UNIFORM = 'UNIFORM',
    BOOKS = 'BOOKS',
    EVENTS = 'EVENTS',
    OTHER = 'OTHER'
  }

  export enum BillingFrequency {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    QUARTERLY = 'QUARTERLY',
    ANNUALLY = 'ANNUALLY',
    ONE_TIME = 'ONE_TIME'
  }

  export enum BillingCycle {
    ADVANCE = 'ADVANCE',
    ARREARS = 'ARREARS'
  }
  export interface Service {
    id: string;
    name: string;
    description: string;
    category: ServiceCategory;
    baseCost: number;
    billingFrequency: BillingFrequency;
    isActive: boolean;
  }
