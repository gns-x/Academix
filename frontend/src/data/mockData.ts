import { Student } from '../types';
// Mock data for the finance dashboard
export const mockFinancialData = {
    currentMonth: {
      revenue: 125000,
      outstanding: 15000,
      collectionRate: 89,
      trend: 12.5
    },
    currentQuarter: {
      revenue: 380000,
      outstanding: 42000,
      collectionRate: 91,
      trend: 8.3
    },
    currentYear: {
      revenue: 1250000,
      outstanding: 150000,
      collectionRate: 88,
      trend: 15.2
    },
    quickStats: {
      totalStudents: 2300,
      activePayments: 1850,
      pendingPayments: 450
    }
  };

  export const mockStudentRecords = [
    {
      id: 'STU001',
      personalInfo: {
        name: 'Emma Thompson',
        dateOfBirth: '2010-05-15',
        gender: 'Female',
        address: '123 School Street, Cityville, ST 12345',
        email: 'emma.t@school.com',
        phone: '+1 234-567-8901',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      academic: {
        grade: '10',
        section: 'A',
        rollNumber: '1001',
        admissionDate: '2020-09-01',
        currentYear: '2023-2024'
      },
      parents: {
        father: {
          name: 'Robert Thompson',
          occupation: 'Software Engineer',
          email: 'robert.t@email.com',
          phone: '+1 234-567-8902',
          address: '123 School Street, Cityville, ST 12345'
        },
        mother: {
          name: 'Sarah Thompson',
          occupation: 'Doctor',
          email: 'sarah.t@email.com',
          phone: '+1 234-567-8903',
          address: '123 School Street, Cityville, ST 12345'
        }
      },
      services: ['Tuition', 'Transportation', 'Cafeteria'],
      financial: {
        totalDue: 12500,
        amountPaid: 10000,
        balance: 2500,
        status: 'Partial',
        nextDueDate: '2024-04-15',
        paymentPlan: 'Monthly',
        scholarshipDetails: 'Merit Scholarship - 10%'
      },
      payments: [
        {
          id: 'PAY001',
          date: '2024-03-01',
          amount: 5000,
          method: 'Bank Transfer',
          status: 'Completed',
          details: {
            transactionId: 'TRX123456',
            bankName: 'Chase Bank',
            accountDetails: '****4567'
          }
        },
        {
          id: 'PAY002',
          date: '2024-02-01',
          amount: 5000,
          method: 'Cheque',
          status: 'Cleared',
          details: {
            chequeNumber: 'CHQ789012',
            bankName: 'Wells Fargo',
            issueDate: '2024-01-28'
          }
        }
      ]
    }
  ];

  export const mockStudents: Student[] = [
    {
      id: '1',
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80',
      firstName: 'John',
      lastName: 'Doe',
      studentId: 'STU001',
      grade: '10',
      section: 'A',
      enrollmentStatus: 'Active',
      academicYear: '2025-2026',
      email: 'john.doe@example.com',
      phone: '+1 234 567 890',
      services: {
        cafeteria: true,
        transportation: false,
        extracurricular: ['Basketball', 'Chess Club']
      },
      attendance: '95%',
      gpa: '3.8',
      lastUpdated: '2024-03-10'
    },
    {
      id: '2',
      photo: 'https://images.unsplash.com/photo-1602109318252-d4572e902365?auto=format&fit=crop&w=80&h=80&q=80',
      firstName: 'Sarah',
      lastName: 'Smith',
      studentId: 'STU002',
      grade: '11',
      section: 'B',
      enrollmentStatus: 'Active',
      academicYear: '2025-2026',
      email: 'sarah.smith@example.com',
      phone: '+44 7911 123456',
      services: {
        cafeteria: true,
        transportation: true,
        extracurricular: ['Debate Club', 'Football']
      },
      attendance: '90%',
      gpa: '3.5',
      lastUpdated: '2024-01-15'
    },
    {
      id: '3',
      photo: 'https://images.unsplash.com/photo-1611731504694-789a7c88c2e4?auto=format&fit=crop&w=80&h=80&q=80',
      firstName: 'Ali',
      lastName: 'Al-Farsi',
      studentId: 'STU003',
      grade: '9',
      section: 'C',
      enrollmentStatus: 'Active',
      academicYear: '2025-2026',
      email: 'ali.alfarsi@example.com',
      phone: '+971 50 123 4567',
      services: {
        cafeteria: false,
        transportation: true,
        extracurricular: ['Soccer', 'Music']
      },
      attendance: '98%',
      gpa: '3.9',
      lastUpdated: '2024-02-10'
    },
    {
      id: '4',
      photo: 'https://images.unsplash.com/photo-1567306222-e7b4a2566d40?auto=format&fit=crop&w=80&h=80&q=80',
      firstName: 'Layla',
      lastName: 'Zayed',
      studentId: 'STU004',
      grade: '10',
      section: 'A',
      enrollmentStatus: 'Active',
      academicYear: '2025-2026',
      email: 'layla.zayed@example.com',
      phone: '+971 55 678 9101',
      services: {
        cafeteria: true,
        transportation: true,
        extracurricular: ['Swimming', 'Art Club']
      },
      attendance: '92%',
      gpa: '3.7',
      lastUpdated: '2024-01-25'
    },
    {
      id: '5',
      photo: 'https://images.unsplash.com/photo-1587651788183-3426d5168b9d?auto=format&fit=crop&w=80&h=80&q=80',
      firstName: 'Omar',
      lastName: 'Khan',
      studentId: 'STU005',
      grade: '12',
      section: 'B',
      enrollmentStatus: 'Active',
      academicYear: '2025-2026',
      email: 'omar.khan@example.com',
      phone: '+44 7823 987654',
      services: {
        cafeteria: false,
        transportation: false,
        extracurricular: ['Basketball', 'Drama Club']
      },
      attendance: '94%',
      gpa: '4.0',
      lastUpdated: '2024-02-05'
    },
    {
      id: '6',
      photo: 'https://images.unsplash.com/photo-1556742208-6c9e0d6e17c2?auto=format&fit=crop&w=80&h=80&q=80',
      firstName: 'Maya',
      lastName: 'Hassan',
      studentId: 'STU006',
      grade: '11',
      section: 'C',
      enrollmentStatus: 'Active',
      academicYear: '2025-2026',
      email: 'maya.hassan@example.com',
      phone: '+44 7584 234567',
      services: {
        cafeteria: true,
        transportation: false,
        extracurricular: ['Volleyball', 'Dance']
      },
      attendance: '97%',
      gpa: '3.6',
      lastUpdated: '2024-03-12'
    },
  ];

// Mock services data
export const mockServices = [
  {
    id: '1',
    name: 'Tuition Fee',
    description: 'Standard academic tuition for the academic year',
    price: 12000,
    category: 'Academic',
    status: 'Active',
    duration: 'Academic Year',
    maxStudents: 1000,
    currentEnrollments: 850
  },
  {
    id: '2',
    name: 'Transportation',
    description: 'School bus transportation service',
    price: 2400,
    category: 'Transportation',
    status: 'Active',
    duration: 'Academic Year',
    maxStudents: 200,
    currentEnrollments: 180
  },
  {
    id: '3',
    name: 'Cafeteria',
    description: 'Daily lunch and snack service',
    price: 1800,
    category: 'Food',
    status: 'Active',
    duration: 'Academic Year',
    maxStudents: 500,
    currentEnrollments: 420
  },
  {
    id: '4',
    name: 'Extracurricular Activities',
    description: 'Sports, arts, and club activities',
    price: 600,
    category: 'Activities',
    status: 'Active',
    duration: 'Academic Year',
    maxStudents: 300,
    currentEnrollments: 250
  },
  {
    id: '5',
    name: 'Summer Camp',
    description: 'Educational summer program',
    price: 1500,
    category: 'Summer',
    status: 'Active',
    duration: 'Summer',
    maxStudents: 100,
    currentEnrollments: 75
  }
];

// Mock payments data
export const mockPayments = [
  {
    id: '1',
    studentId: 'STU001',
    studentName: 'John Doe',
    amount: 12000,
    type: 'Tuition Fee',
    method: 'Bank Transfer',
    status: 'Completed',
    date: '2024-03-01',
    reference: 'TRX123456'
  },
  {
    id: '2',
    studentId: 'STU002',
    studentName: 'Sarah Smith',
    amount: 2400,
    type: 'Transportation',
    method: 'Credit Card',
    status: 'Completed',
    date: '2024-03-02',
    reference: 'TRX123457'
  },
  {
    id: '3',
    studentId: 'STU003',
    studentName: 'Ali Al-Farsi',
    amount: 1800,
    type: 'Cafeteria',
    method: 'Cash',
    status: 'Pending',
    date: '2024-03-03',
    reference: 'TRX123458'
  }
];

// Mock stats data
export const mockStats = {
  totalStudents: 1250,
  activeStudents: 1180,
  newEnrollments: 45,
  totalRevenue: 1250000,
  outstandingPayments: 150000,
  collectionRate: 88,
  averageAttendance: 94,
  topPerformingGrade: 'Grade 11'
};


  