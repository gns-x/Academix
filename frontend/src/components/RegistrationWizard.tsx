import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema, guardianSchema } from '../lib/validation';
import { StudentForm } from './StudentForm';
import { GuardianForm } from './GuardianForm';
import { HealthForm } from './HealthForm';
import {
  CheckCircle2,
  UserPlus,
  Heart,
  Users,
  ChevronLeft,
  ChevronRight,
  Save
} from 'lucide-react';
import toast from 'react-hot-toast';

const AUTOSAVE_INTERVAL = 100000000; // 30 seconds

const steps = [
  { id: 'student', title: 'Student Information', icon: UserPlus },
  { id: 'health', title: 'Health Information', icon: Heart },
  { id: 'guardian', title: 'Guardian Information', icon: Users },
];

export function RegistrationWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('registration_form');
    return saved ? JSON.parse(saved) : {};
  });

  const studentMethods = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: formData.student || {},
  });

  const guardianMethods = useForm({
    resolver: zodResolver(guardianSchema),
    defaultValues: formData.guardian || {},
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const data = {
        student: studentMethods.getValues(),
        guardian: guardianMethods.getValues(),
      };
      localStorage.setItem('registration_form', JSON.stringify(data));
      toast.success('Progress auto-saved');
    }, AUTOSAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [studentMethods, guardianMethods]);

  const handleNext = async () => {
    let isValid = true;

    if (activeStep === 0) {
      // Validate student form fields
      isValid = await studentMethods.trigger();
      console.log(studentMethods.formState.errors);  // Check errors for the student form
    } else if (activeStep === 1) {
      // Only validate HealthForm fields when you're on the health step
      isValid = await studentMethods.trigger();  // Validate student fields before moving to the next step
    } else if (activeStep === 2) {
      // Validate guardian form fields when on the guardian step
      isValid = await guardianMethods.trigger();
      console.log(guardianMethods.formState.errors);  // Check errors for the guardian form
    }

    if (!isValid) {
      toast.error("Please fix the errors before proceeding");
      return;
    }

    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };



  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    const studentValid = await studentMethods.trigger();
    const guardianValid = await guardianMethods.trigger();

    if (!studentValid || !guardianValid) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    const studentData = studentMethods.getValues();
    const guardianData = guardianMethods.getValues();

    try {
      // Submit data to your backend here
      toast.success('Registration submitted successfully!');
      localStorage.removeItem('registration_form');
    } catch (error) {
      toast.error('Error submitting registration');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      index <= activeStep
                        ? 'bg-[#1ABC9C] text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      index <= activeStep ? 'text-[#2A3F54]' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      index < activeStep ? 'bg-[#1ABC9C]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white shadow rounded-lg p-6">
          {activeStep === 0 && (
            <FormProvider {...studentMethods}>
              <StudentForm />
            </FormProvider>
          )}
          {activeStep === 1 && (
            <FormProvider {...studentMethods}>
              <HealthForm />
            </FormProvider>
          )}
          {activeStep === 2 && (
            <FormProvider {...guardianMethods}>
              <GuardianForm />
            </FormProvider>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={activeStep === 0}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-[#2A3F54] border border-[#2A3F54] hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  const data = {
                    student: studentMethods.getValues(),
                    guardian: guardianMethods.getValues(),
                  };
                  localStorage.setItem('registration_form', JSON.stringify(data));
                  toast.success('Progress saved');
                }}
                className="flex items-center px-4 py-2 text-sm font-medium text-[#3498DB] border border-[#3498DB] rounded-md hover:bg-blue-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </button>
              {activeStep === steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-[#1ABC9C] rounded-md hover:bg-[#16a085]"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Submit Registration
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-[#2A3F54] rounded-md hover:bg-[#1e2b3a]"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
