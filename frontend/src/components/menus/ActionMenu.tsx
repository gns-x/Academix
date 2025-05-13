import React, { useState, useEffect, useRef } from 'react';
import { Eye, Edit2, BookOpen, Coffee, Printer, Trash2, MoreHorizontal } from 'lucide-react';
import { StudentProfile } from '../students/StudentProfile';
import { ActionMenuProps } from '../../types';

export const ActionMenu: React.FC<ActionMenuProps> = ({ student, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && dropdownRef.current && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const topSpace = buttonRect.top;
      const bottomSpace = viewportHeight - buttonRect.bottom;

      const shouldOpenUpward = bottomSpace < dropdownHeight && topSpace > dropdownHeight;
      const positionTop = shouldOpenUpward
        ? buttonRect.top - dropdownHeight
        : buttonRect.bottom;

      setDropdownStyle({
        position: 'fixed',
        top: `${positionTop}px`,
        left: `${buttonRect.right - dropdownRef.current.offsetWidth}px`,
        zIndex: 1000,
      });
    }
  }, [isOpen]);

  const handleAction = (actionType: string) => {
    if (actionType === 'view') {
      setIsProfileOpen(true);
    } else {
      onAction(actionType, student.id);
    }
    setIsOpen(false);
  };

  const actions = [
    { label: 'View Profile', icon: Eye, action: 'view' },
    { label: 'Edit Details', icon: Edit2, action: 'edit' },
    { label: 'Enroll in Class', icon: BookOpen, action: 'enroll' },
    { label: 'Register Services', icon: Coffee, action: 'services' },
    { label: 'Print ID Card', icon: Printer, action: 'print' },
    { label: 'Delete Record', icon: Trash2, action: 'delete', danger: true },
  ];

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="bg-white rounded-lg shadow-lg py-1 border border-gray-100 w-48 max-h-64 overflow-auto"
          >
            {actions.map((action) => (
              <button
                key={action.action}
                onClick={() => handleAction(action.action)}
                className={`w-full px-4 py-2 text-sm text-left flex items-center space-x-2
                  ${action.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <action.icon className="w-4 h-4" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {isProfileOpen && (
        <StudentProfile
          student={student}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
};
