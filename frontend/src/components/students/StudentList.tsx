import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Users } from 'lucide-react';
import { ActionMenu } from '../menus/ActionMenu';
import { StudentProfile } from './StudentProfile';
import { Student } from '../../types';

interface StudentListProps {
  students: Student[];
  selectedStudents: string[];
  onSelectStudent: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onAction: (action: string, studentId: string) => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export const StudentList: React.FC<StudentListProps> = ({
  students,
  selectedStudents,
  onSelectStudent,
  onSelectAll,
  onAction,
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange
}) => {
  const [selectedProfile, setSelectedProfile] = React.useState<Student | null>(null);

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots: (string | number)[] = [];
    let l: number;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach(i => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Items per page selector */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="block rounded-lg border-gray-300 text-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
              >
                <option value={10}>10 per page</option>
                <option value={100}>100 per page</option>
                <option value={250}>250 per page</option>
                <option value={500}>500 per page</option>
              </select>
            </div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>{' '}
              to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span>{' '}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50/50">
                <th scope="col" className="pl-6 pr-3 py-4">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === students.length}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-[#1ABC9C] focus:ring-[#1ABC9C] focus:ring-offset-0"
                  />
                </th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Grade/Section
                </th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Academic Year
                </th>
                <th scope="col" className="px-3 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {students.map((student, index) => (
                <tr
                  key={student.externalCode || index}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="pl-6 pr-3 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.externalCode)}
                      onChange={() => onSelectStudent(student.externalCode)}
                      className="rounded border-gray-300 text-[#1ABC9C] focus:ring-[#1ABC9C] focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
                          src={student.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=1ABC9C&color=fff`}
                          alt={student.name}
                        />
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => setSelectedProfile(student)}
                          className="text-sm font-medium text-gray-900 hover:text-[#1ABC9C] transition-colors"
                        >
                          {student.name}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.externalCode}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                        Grade {student.grade}{student.Section ? `-${student.Section}` : ''}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    2023-2024
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <ActionMenu student={student} onAction={onAction} />
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="hidden md:flex space-x-2">
              {getVisiblePages().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && onPageChange(page)}
                  disabled={page === '...'}
                  className={`inline-flex items-center px-3 py-2 rounded-lg border text-sm font-medium
                    ${typeof page === 'number' && currentPage === page
                      ? 'z-10 bg-[#1ABC9C] border-[#1ABC9C] text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    } ${page === '...' ? 'cursor-default' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Student Profile Modal */}
      {selectedProfile && (
        <StudentProfile
          student={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </>
  );
};
