import React, { useState } from 'react';
import { Search } from 'lucide-react';

const mockSearchResults = {
  students: [
    { id: 1, name: 'Emma Thompson', type: 'student', grade: '10th', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9' },
    { id: 2, name: 'James Wilson', type: 'student', grade: '11th', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6' },
  ],
  teachers: [
    { id: 1, name: 'Dr. Sarah Parker', type: 'teacher', subject: 'Mathematics', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { id: 2, name: 'Prof. Michael Chen', type: 'teacher', subject: 'Physics', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
  ],
  employees: [
    { id: 1, name: 'Robert Brown', type: 'employee', role: 'Administrator', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
  ],
  relatives: [
    { id: 1, name: 'Patricia Wilson', type: 'parent', student: 'James Wilson', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
  ],
};

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search students, teachers..."
        className="w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors bg-white/50 backdrop-blur-sm"
        value={searchQuery}
        onChange={handleSearch}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
      />
      <div className="absolute left-3 top-2.5 text-gray-400">
        <Search className="w-5 h-5" />
      </div>

      {showSearchResults && searchFocused && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-10">
          <div className="max-h-96 overflow-y-auto">
            {Object.entries(mockSearchResults).map(([category, results]) => (
              <div key={category}>
                <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-600 capitalize">
                  {category}
                </div>
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="px-4 py-2 hover:bg-blue-50 flex items-center space-x-3 cursor-pointer"
                  >
                    <img
                      src={`${result.image}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{result.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
