import React, { useState } from 'react';
import {
  Search,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Cake,
  Heart,
  MoreHorizontal,
  Edit2,
  Trash2,
  X,
  Users,
  Eye,
  Plus,
  Minus
} from 'lucide-react';

// Types
interface Relative {
  id: string;
  photo: string;
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;
  anniversary?: string;
  isEmergencyContact: boolean;
  notes?: string;
  familyBranch: string;
}

interface FamilyMember extends Relative {
  spouses?: FamilyMember[];
  children?: FamilyMember[];
  parents?: FamilyMember[];
  isExpanded?: boolean;
}

// Mock data
const mockRelatives: Relative[] = [
  {
    id: '1',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    firstName: 'Robert',
    lastName: 'Johnson',
    relationship: 'Father',
    phone: '+1 234-567-8901',
    email: 'robert.j@example.com',
    address: '123 Family Street, Hometown, ST 12345',
    birthDate: '1970-05-15',
    anniversary: '1995-06-20',
    isEmergencyContact: true,
    notes: 'Primary emergency contact',
    familyBranch: 'Paternal'
  },
  {
    id: '2',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&h=256&q=80',
    firstName: 'Mary',
    lastName: 'Johnson',
    relationship: 'Mother',
    phone: '+1 234-567-8902',
    email: 'mary.j@example.com',
    address: '123 Family Street, Hometown, ST 12345',
    birthDate: '1972-08-25',
    anniversary: '1995-06-20',
    isEmergencyContact: true,
    notes: 'Secondary emergency contact',
    familyBranch: 'Maternal'
  }
];

const mockFamilyTree: FamilyMember[] = [
  {
    ...mockRelatives[0],
    spouses: [{
      ...mockRelatives[1]
    }],
    children: [
      {
        id: '3',
        photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80',
        firstName: 'James',
        lastName: 'Johnson',
        relationship: 'Son',
        phone: '+1 234-567-8903',
        email: 'james.j@example.com',
        address: '123 Family Street, Hometown, ST 12345',
        birthDate: '1995-03-10',
        isEmergencyContact: false,
        familyBranch: 'Paternal'
      },
      {
        id: '4',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
        firstName: 'Emma',
        lastName: 'Johnson',
        relationship: 'Daughter',
        phone: '+1 234-567-8904',
        email: 'emma.j@example.com',
        address: '123 Family Street, Hometown, ST 12345',
        birthDate: '1998-07-22',
        isEmergencyContact: false,
        familyBranch: 'Paternal'
      }
    ]
  }
];

const FamilyTreePreview: React.FC<{
  member: FamilyMember;
  onClose: () => void;
  onViewProfile: (id: string) => void;
}> = ({ member, onClose, onViewProfile }) => {
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set([member.id]));

  const toggleExpand = (id: string) => {
    setExpandedMembers(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const FamilyMemberCard: React.FC<{
    member: FamilyMember;
    level: number;
    isLast?: boolean;
  }> = ({ member, level }) => {
    const isExpanded = expandedMembers.has(member.id);
    const hasChildren = member.children && member.children.length > 0;
    const hasSpouses = member.spouses && member.spouses.length > 0;

    return (
      <div className={`relative ${level > 0 ? 'ml-8' : ''}`}>
        {level > 0 && (
          <div className="absolute -left-8 top-1/2 w-8 h-px" />
        )}
        <div className="relative">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={member.photo}
                alt={`${member.firstName} ${member.lastName}`}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {member.firstName} {member.lastName}
                  </h3>
                  <button
                    onClick={() => onViewProfile(member.id)}
                    className="text-[#1ABC9C] hover:text-[#1ABC9C]/80"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  {member.relationship} • {calculateAge(member.birthDate)} years old
                </p>
              </div>
            </div>
            {(hasChildren || hasSpouses) && (
              <button
                onClick={() => toggleExpand(member.id)}
                className="absolute -right-3 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700"
              >
                {isExpanded ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          {isExpanded && (
            <div className="space-y-4">
              {hasSpouses && (
                <div className="ml-8">
                  {member.spouses?.map((spouse, index) => (
                    <FamilyMemberCard
                      key={spouse.id}
                      member={spouse}
                      level={level + 1}
                      isLast={index === (member.spouses?.length || 0) - 1}
                    />
                  ))}
                </div>
              )}
              {hasChildren && (
                <div className="ml-8">
                  {member.children?.map((child, index) => (
                    <FamilyMemberCard
                      key={child.id}
                      member={child}
                      level={level + 1}
                      isLast={index === (member.children?.length || 0) - 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Family Tree</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          <FamilyMemberCard member={member} level={0} />
        </div>
      </div>
    </div>
  );
};

const RelativeCard: React.FC<{
  relative: Relative;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewTree: (id: string) => void;
}> = ({ relative, onEdit, onDelete, onViewTree }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <img
              src={relative.photo}
              alt={`${relative.firstName} ${relative.lastName}`}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {relative.firstName} {relative.lastName}
              </h3>
              <p className="text-sm text-gray-500">{relative.relationship}</p>
              {relative.isEmergencyContact && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                  Emergency Contact
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </button>
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
                <button
                  onClick={() => {
                    onViewTree(relative.id);
                    setShowActions(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  <Users className="h-4 w-4 mr-3 text-gray-400" />
                  View Family Tree
                </button>
                <button
                  onClick={() => {
                    onEdit(relative.id);
                    setShowActions(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  <Edit2 className="h-4 w-4 mr-3 text-gray-400" />
                  Edit Details
                </button>
                <button
                  onClick={() => {
                    onDelete(relative.id);
                    setShowActions(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <Trash2 className="h-4 w-4 mr-3 text-red-400" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            {relative.phone}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            {relative.email}
          </div>
          <div className="flex items-start text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-400" />
            {relative.address}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Cake className="h-4 w-4 mr-2 text-gray-400" />
            Birthday: {new Date(relative.birthDate).toLocaleDateString()}
          </div>
          {relative.anniversary && (
            <div className="flex items-center text-sm text-gray-500">
              <Heart className="h-4 w-4 mr-2 text-gray-400" />
              Anniversary: {new Date(relative.anniversary).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Keep the existing RelativeForm and ConfirmDialog components...
const RelativeForm: React.FC<{
  onClose: () => void;
  onSave: (relative: Partial<Relative>) => void;
  relative?: Relative;
}> = ({ onClose, onSave, relative }) => {
  const [formData, setFormData] = useState<Partial<Relative>>(
    relative || {
      firstName: '',
      lastName: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      birthDate: '',
      anniversary: '',
      isEmergencyContact: false,
      familyBranch: '',
      notes: ''
    }
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {relative ? 'Edit Relative' : 'Add New Relative'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relationship
                </label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                >
                  <option value="">Select Relationship</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Grandparent">Grandparent</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Family Branch
                </label>
                <select
                  value={formData.familyBranch}
                  onChange={(e) => setFormData({ ...formData, familyBranch: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                >
                  <option value="">Select Branch</option>
                  <option value="Paternal">Paternal</option>
                  <option value="Maternal">Maternal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Birth Date
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Anniversary Date
                </label>
                <input
                  type="date"
                  value={formData.anniversary}
                  onChange={(e) => setFormData({ ...formData, anniversary: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isEmergencyContact}
                onChange={(e) => setFormData({ ...formData, isEmergencyContact: e.target.checked })}
                className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Emergency Contact
              </label>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#1ABC9C]/90 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-2 text-sm text-gray-500">{message}</p>
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export function Relatives() {
    const [relatives, setRelatives] = useState<Relative[]>(mockRelatives);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [showForm, setShowForm] = useState(false);
    const [editingRelative, setEditingRelative] = useState<Relative | undefined>();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showFamilyTree, setShowFamilyTree] = useState(false);
    const [selectedFamilyMember, setSelectedFamilyMember] = useState<FamilyMember | null>(null);

    // Add missing handlers
    const handleEdit = (id: string) => {
      const relative = relatives.find(r => r.id === id);
      setEditingRelative(relative);
      setShowForm(true);
    };

    const handleDelete = (id: string) => {
      setDeletingId(id);
      setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
      if (deletingId) {
        setRelatives(relatives.filter(r => r.id !== deletingId));
        setDeletingId(null);
      }
      setShowDeleteConfirm(false);
    };

    const handleSave = (relativeData: Partial<Relative>) => {
      if (editingRelative) {
        setRelatives(relatives.map(r =>
          r.id === editingRelative.id ? { ...r, ...relativeData } : r
        ));
      } else {
        const newRelative = {
          ...relativeData,
          id: Math.random().toString(36).substr(2, 9),
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80'
        } as Relative;
        setRelatives([...relatives, newRelative]);
      }
      setShowForm(false);
      setEditingRelative(undefined);
    };

    const handleViewTree = (id: string) => {
      const member = mockFamilyTree.find(m => m.id === id);
      if (member) {
        setSelectedFamilyMember(member);
        setShowFamilyTree(true);
      }
    };

    // Filter and sort relatives
    const filteredRelatives = relatives
      .filter(relative => {
        const searchMatch =
          relative.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          relative.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          relative.relationship.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterBy === 'all') return searchMatch;
        if (filterBy === 'emergency') return searchMatch && relative.isEmergencyContact;
        return searchMatch && relative.familyBranch === filterBy;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          case 'relationship':
            return a.relationship.localeCompare(b.relationship);
          case 'birthday':
            return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
          default:
            return 0;
        }
      });

    return (
      <div className="min-h-full p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Family & Relatives</h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#1ABC9C]/90"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Relative
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search relatives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
              />
            </div>
            <div>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full rounded-lg border border-gray-300 focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
              >
                <option value="all">All Relatives</option>
                <option value="Paternal">Paternal Family</option>
                <option value="Maternal">Maternal Family</option>
                <option value="emergency">Emergency Contacts</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-gray-300 focus:ring-[#1ABC9C] focus:border-[#1ABC9C]"
              >
                <option value="name">Sort by Name</option>
                <option value="relationship">Sort by Relationship</option>
                <option value="birthday">Sort by Birthday</option>
              </select>
            </div>
          </div>
        </div>

        {/* Relatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRelatives.map(relative => (
            <RelativeCard
              key={relative.id}
              relative={relative}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewTree={handleViewTree}
            />
          ))}
        </div>

        {/* Forms and Dialogs */}
        {showForm && (
          <RelativeForm
            onClose={() => {
              setShowForm(false);
              setEditingRelative(undefined);
            }}
            onSave={handleSave}
            relative={editingRelative}
          />
        )}

        {showDeleteConfirm && (
          <ConfirmDialog
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={confirmDelete}
            title="Delete Relative"
            message="Are you sure you want to delete this relative? This action cannot be undone."
          />
        )}

        {showFamilyTree && selectedFamilyMember && (
          <FamilyTreePreview
            member={selectedFamilyMember}
            onClose={() => setShowFamilyTree(false)}
            onViewProfile={(id) => {
              setShowFamilyTree(false);
              handleEdit(id);
            }}
          />
        )}
      </div>
    );
  }
