import React from 'react';
import { Mail, Users } from 'lucide-react';
import { ActionMenu } from '../menus/ActionMenu';
import { Student } from '../../types';

interface StudentGridProps {
  students: Student[];
  selectedStudents: string[];
  onSelectStudent: (id: string) => void;
  onAction: (action: string, studentId: string) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const StudentGrid: React.FC<StudentGridProps> = ({
  students,
  selectedStudents,
  onSelectStudent,
  onAction,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  currentPage,
  onPageChange
}) => {
  const formatGrade = (grade: string) => {
    const lowerGrade = grade.toLowerCase();
    if (['pre-nursery', 'nursery', 'reception'].includes(lowerGrade)) {
      return grade.charAt(0).toUpperCase() + grade.slice(1);
    }
    return `Grade ${grade}`;
  };

  return (
    <div className="space-y-6">
      {/* Items per page selector */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border border-gray-200/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-400" />
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="block w-full rounded-lg border-gray-300 text-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
            >
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={36}>36 per page</option>
              <option value={48}>48 per page</option>
            </select>
          </div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
            <span className="font-medium">{totalItems}</span> students
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {students.map((student) => (
          <div
            key={student.externalCode}
            className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-200/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#1ABC9C]/20"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedStudents.includes(student.externalCode)}
                onChange={() => onSelectStudent(student.externalCode)}
                className="absolute top-4 left-4 rounded border-gray-300 text-[#1ABC9C] focus:ring-[#1ABC9C] focus:ring-offset-0 z-10 transition-all duration-200"
              />
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <img
                  src={student.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=1ABC9C&color=fff`}
                  alt={student.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 truncate group-hover:text-[#1ABC9C] transition-colors">
                  {student.name}
                </h3>
                <ActionMenu student={student} onAction={onAction} />
              </div>
              <p className="text-sm text-gray-500 mb-3">ID: {student.externalCode}</p>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-600 font-medium">{formatGrade(student.grade)}</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 transition-all duration-200 group-hover:bg-green-200">
                  Active
                </span>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-[#1ABC9C]">2023-2024</div>
                  <button className="text-gray-400 hover:text-[#1ABC9C] transition-colors">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
