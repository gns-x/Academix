import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Plus, Minus } from 'lucide-react';

const medicalConditions = [
  'Asthma',
  'Diabetes',
  'Epilepsy',
  'Heart Condition',
  'ADHD',
  'Anxiety',
  'Depression',
  'Other',
];

export function HealthForm() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const [allergies, setAllergies] = React.useState([{ id: 1 }]);

  const addAllergy = () => {
    const newId = allergies.length + 1;
    setAllergies([...allergies, { id: newId }]);
  };

  const removeAllergy = (id: number) => {
    if (allergies.length > 1) {
      setAllergies(allergies.filter((allergy) => allergy.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Medical Conditions
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {medicalConditions.map((condition) => (
            <label
              key={condition}
              className="relative flex items-center px-3 py-2 border rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                {...register('medical_conditions')}
                value={condition}
                className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Allergies
        </label>
        <div className="space-y-4">
          {allergies.map((allergy) => (
            <div key={allergy.id} className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  {...register(`allergies.${allergy.id - 1}.allergen`)}
                  placeholder="Allergen"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                />
              </div>
              <div className="flex-1">
                <select
                  {...register(`allergies.${allergy.id - 1}.severity`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeAllergy(allergy.id)}
                className="mt-1 p-2 text-gray-400 hover:text-red-600"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAllergy}
            className="flex items-center px-4 py-2 text-sm font-medium text-[#1ABC9C] border border-[#1ABC9C] rounded-md hover:bg-green-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Allergy
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Accommodation Requirements
        </label>
        <textarea
          {...register('accommodations')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
          placeholder="Describe any special accommodations needed..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Emergency Protocol
        </label>
        <textarea
          {...register('emergency_protocol')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
          placeholder="Specify any emergency procedures or protocols..."
        />
      </div>
    </div>
  );
}