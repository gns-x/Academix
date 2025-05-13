import { FileText, BarChart2, Clock, DollarSign, Activity, AlertTriangle, Coffee, MessageSquare } from 'lucide-react';

export const ITEMS_PER_PAGE = 10;

export const REPORTS = [
  {
    type: 'enrollment',
    title: 'Enrollment Status',
    icon: FileText,
    description: 'Current enrollment statistics and trends'
  },
  {
    type: 'academic',
    title: 'Academic Performance',
    icon: BarChart2,
    description: 'Grade distribution and performance metrics'
  },
  {
    type: 'attendance',
    title: 'Attendance Records',
    icon: Clock,
    description: 'Daily attendance and absence patterns'
  },
  {
    type: 'financial',
    title: 'Financial Statement',
    icon: DollarSign,
    description: 'Fees, payments, and outstanding balances'
  },
  {
    type: 'activities',
    title: 'Activity Participation',
    icon: Activity,
    description: 'Extracurricular and event participation'
  },
  {
    type: 'behavioral',
    title: 'Behavioral Reports',
    icon: AlertTriangle,
    description: 'Conduct records and incident reports'
  },
  {
    type: 'services',
    title: 'Service Usage',
    icon: Coffee,
    description: 'Cafeteria, transportation, and facility usage'
  },
  {
    type: 'communication',
    title: 'Parent Communication',
    icon: MessageSquare,
    description: 'Parent-teacher meeting and communication logs'
  }
];
