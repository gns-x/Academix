// Mock Financial Data
export const mockFinancialData = {
    overview: {
      currentMonth: {
        revenue: 125000,
        expenses: 95000,
        profit: 30000,
        growth: 12.5
      },
      currentQuarter: {
        revenue: 375000,
        expenses: 285000,
        profit: 90000,
        growth: 15.2
      },
      currentYear: {
        revenue: 1450000,
        expenses: 1087500,
        profit: 362500,
        growth: 18.7
      }
    },
    payments: {
      total: 1250,
      active: 980,
      pending: 270,
      overdue: 85,
      collection_rate: 92.5
    },
    revenue_streams: [
      { source: 'Tuition Fees', amount: 850000, percentage: 58.6 },
      { source: 'Transportation', amount: 225000, percentage: 15.5 },
      { source: 'Cafeteria', amount: 175000, percentage: 12.1 },
      { source: 'Extra Activities', amount: 125000, percentage: 8.6 },
      { source: 'Books & Supplies', amount: 75000, percentage: 5.2 }
    ],
    payment_methods: [
      { method: 'Bank Transfer', count: 520, amount: 625000, percentage: 43.1 },
      { method: 'Credit Card', count: 380, amount: 456000, percentage: 31.4 },
      { method: 'Cash', count: 210, amount: 252000, percentage: 17.4 },
      { method: 'Cheque', count: 140, amount: 117000, percentage: 8.1 }
    ],
    monthly_trends: [
      { month: 'Jan', revenue: 115000, expenses: 86250, collection_rate: 91.5 },
      { month: 'Feb', revenue: 118000, expenses: 88500, collection_rate: 92.0 },
      { month: 'Mar', revenue: 125000, expenses: 93750, collection_rate: 92.5 },
      { month: 'Apr', revenue: 122000, expenses: 91500, collection_rate: 93.0 },
      { month: 'May', revenue: 128000, expenses: 96000, collection_rate: 92.8 },
      { month: 'Jun', revenue: 132000, expenses: 99000, collection_rate: 93.2 },
      { month: 'Jul', revenue: 127000, expenses: 95250, collection_rate: 92.7 },
      { month: 'Aug', revenue: 135000, expenses: 101250, collection_rate: 93.5 },
      { month: 'Sep', revenue: 130000, expenses: 97500, collection_rate: 93.0 },
      { month: 'Oct', revenue: 138000, expenses: 103500, collection_rate: 93.8 },
      { month: 'Nov', revenue: 142000, expenses: 106500, collection_rate: 94.0 },
      { month: 'Dec', revenue: 145000, expenses: 108750, collection_rate: 94.2 }
    ],
    outstanding_balances: {
      total: 362500,
      by_category: [
        { category: '0-30 days', amount: 145000, count: 120 },
        { category: '31-60 days', amount: 108750, count: 85 },
        { category: '61-90 days', amount: 72500, count: 45 },
        { category: '90+ days', amount: 36250, count: 20 }
      ]
    },
    fee_structures: [
      {
        grade: 'Grade 1-5',
        tuition: 8500,
        transportation: 1200,
        cafeteria: 800,
        activities: 500
      },
      {
        grade: 'Grade 6-8',
        tuition: 9500,
        transportation: 1200,
        cafeteria: 800,
        activities: 600
      },
      {
        grade: 'Grade 9-10',
        tuition: 10500,
        transportation: 1200,
        cafeteria: 800,
        activities: 700
      },
      {
        grade: 'Grade 11-12',
        tuition: 12500,
        transportation: 1200,
        cafeteria: 800,
        activities: 800
      }
    ],
    scholarships: [
      {
        type: 'Merit Based',
        recipients: 85,
        total_amount: 127500,
        average_amount: 1500
      },
      {
        type: 'Need Based',
        recipients: 45,
        total_amount: 90000,
        average_amount: 2000
      },
      {
        type: 'Sports',
        recipients: 25,
        total_amount: 37500,
        average_amount: 1500
      }
    ],
    recent_transactions: [
      {
        id: 'TRX001',
        student_id: 'STU125',
        student_name: 'Emma Thompson',
        date: '2024-03-10',
        amount: 2500,
        type: 'Tuition Fee',
        payment_method: 'Bank Transfer',
        status: 'Completed'
      },
      {
        id: 'TRX002',
        student_id: 'STU126',
        student_name: 'James Wilson',
        date: '2024-03-10',
        amount: 1200,
        type: 'Transportation',
        payment_method: 'Credit Card',
        status: 'Completed'
      },
      {
        id: 'TRX003',
        student_id: 'STU127',
        student_name: 'Sophia Chen',
        date: '2024-03-09',
        amount: 3500,
        type: 'Tuition Fee',
        payment_method: 'Cheque',
        status: 'Pending'
      },
      {
        id: 'TRX004',
        student_id: 'STU128',
        student_name: 'Lucas Brown',
        date: '2024-03-09',
        amount: 800,
        type: 'Cafeteria',
        payment_method: 'Cash',
        status: 'Completed'
      },
      {
        id: 'TRX005',
        student_id: 'STU129',
        student_name: 'Olivia Davis',
        date: '2024-03-08',
        amount: 2800,
        type: 'Tuition Fee',
        payment_method: 'Bank Transfer',
        status: 'Completed'
      }
    ]
  };
