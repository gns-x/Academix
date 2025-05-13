import { useEffect, useState } from 'react';
import axios from 'axios';
import { FileSpreadsheet, UserPlus, ChevronLeft } from 'lucide-react';
import { ViewMode, ActionType, ReportType, Student, Filters, SortConfig } from '../types';
import { REPORTS } from '../utils/constants';
import { ConfirmationDialog } from '../components/dialogs/ConfirmationDialog';
import { StudentGrid } from '../components/students/StudentGrid';
import { StudentList } from '../components/students/StudentList';
import { SearchAndFilters } from '../components/students/SearchAndFilters';
import { BulkActions } from '../components/students/BulkActions';
import { ReportCard } from '../components/reports/ReportCard';
import { RegistrationWizard } from '../components/RegistrationWizard';
import { ServiceEnrollmentModal } from '../components/services/ServiceEnrollmentModal';

export function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    grade: '',
    externalCode: '',
    year: '',
    status: ''
  });
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showRegistration, setShowRegistration] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(viewMode === 'list' ? 10 : 12);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showServiceEnrollment, setShowServiceEnrollment] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    sortConfig: {},
    key: 'name',
    direction: 'asc'
  });
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'warning' | 'danger' | 'info';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: () => {}
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/students/all');
        setStudents(response.data);
      } catch (err) {
        console.error('Failed to fetch students:', err);
        setError('Failed to fetch students. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Reset current page when changing items per page
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Reset items per page when changing view mode
  useEffect(() => {
    setItemsPerPage(viewMode === 'list' ? 10 : 12);
  }, [viewMode]);

  // Filter and sort students
  const filteredStudents = students.filter(student => {
    const searchMatch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.externalCode.toLowerCase().includes(searchTerm.toLowerCase());

    const filterMatch =
      (!filters.grade || student.grade === filters.grade);

    return searchMatch && filterMatch;
  }).sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  // Get paginated students
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleBulkAction = (action: ActionType) => {
    switch (action) {
      case 'delete':
        setConfirmDialog({
          isOpen: true,
          title: 'Delete Selected Students',
          message: `Are you sure you want to delete ${selectedStudents.length} selected students? This action cannot be undone.`,
          type: 'danger',
          onConfirm: () => {
            setStudents(current =>
              current.filter(student => !selectedStudents.includes(student.externalCode))
            );
            setSelectedStudents([]);
          }
        });
        break;
      case 'export':
        console.log('Exporting selected students:', selectedStudents);
        break;
      case 'enroll':
        setConfirmDialog({
          isOpen: true,
          title: 'Batch Enrollment',
          message: `Proceed with batch enrollment for ${selectedStudents.length} students?`,
          type: 'info',
          onConfirm: () => {
            console.log('Batch enrolling students:', selectedStudents);
          }
        });
        break;
      case 'services':
        setShowServiceEnrollment(true);
        break;
    }
  };

  const handleStudentAction = (action: string, studentId: string) => {
    switch (action) {
      case 'delete':
        setConfirmDialog({
          isOpen: true,
          title: 'Delete Student Record',
          message: 'Are you sure you want to delete this student record? This action cannot be undone.',
          type: 'danger',
          onConfirm: () => {
            setStudents(current => current.filter(s => s.externalCode !== studentId));
          }
        });
        break;
      case 'view':
        console.log('Viewing student:', studentId);
        break;
      case 'edit':
        console.log('Editing student:', studentId);
        break;
      case 'print':
        console.log('Printing ID card for student:', studentId);
        break;
    }
  };

  const handleGenerateReport = (type: ReportType) => {
    console.log('Generating report:', type);
  };

  const handleSelectStudent = (id: string) => {
    setSelectedStudents(current =>
      current.includes(id)
        ? current.filter(studentId => studentId !== id)
        : [...current, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedStudents(selected ? paginatedStudents.map(s => s.externalCode) : []);
  };

  if (showRegistration) {
    return (
      <div className="h-full">
        <button
          onClick={() => setShowRegistration(false)}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Students List
        </button>
        <RegistrationWizard />
      </div>
    );
  }

  if (showReports) {
    return (
      <div className="h-full">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setShowReports(false)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Students List
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORTS.map((report) => (
            <ReportCard
              key={report.type}
              title={report.title}
              icon={report.icon}
              description={report.description}
              onClick={() => handleGenerateReport(report.type as ReportType)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6">
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
      />

      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowReports(true)}
              className="flex items-center px-4 py-2 text-[#1ABC9C] bg-[#1ABC9C]/10 rounded-lg hover:bg-[#1ABC9C]/20"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Reports
            </button>
            <button
              onClick={() => setShowRegistration(true)}
              className="flex items-center px-4 py-2 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#16a085] transition-colors"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add New Student
            </button>
          </div>
        </div>
      </div>

      <SearchAndFilters
        searchTerm={searchTerm}
        filters={filters}
        viewMode={viewMode}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilters}
        onViewModeChange={setViewMode}
        onReset={() => setFilters({ grade: '', externalCode: '', year: '', status: '' })}
      />

      {selectedStudents.length > 0 && (
        <BulkActions
          selectedCount={selectedStudents.length}
          onAction={handleBulkAction}
        />
      )}

      {viewMode === 'grid' ? (
        <StudentGrid
          students={paginatedStudents}
          selectedStudents={selectedStudents}
          onSelectStudent={handleSelectStudent}
          onAction={handleStudentAction}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          totalItems={filteredStudents.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      ) : (
        <StudentList
          students={paginatedStudents}
          selectedStudents={selectedStudents}
          onSelectStudent={handleSelectStudent}
          onSelectAll={handleSelectAll}
          onAction={handleStudentAction}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredStudents.length}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}

      {showServiceEnrollment && (
        <ServiceEnrollmentModal
          studentIds={selectedStudents}
          onClose={() => setShowServiceEnrollment(false)}
          onSuccess={() => {
            setShowServiceEnrollment(false);
            setSelectedStudents([]);
          }}
        />
      )}
    </div>
  );
}
