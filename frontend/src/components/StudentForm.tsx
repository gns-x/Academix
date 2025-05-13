import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload } from 'lucide-react';
import Webcam from 'react-webcam';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const academicFocusOptions = [
  'Mathematics',
  'Science',
  'Literature',
  'History',
  'Arts',
  'Music',
  'Physical Education',
  'Computer Science',
  'Foreign Languages',
];

export function StudentForm() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const [showWebcam, setShowWebcam] = React.useState(false);
  const [photoPreview, setPhotoPreview] = React.useState('');
  const [showCropper, setShowCropper] = React.useState(false);

  const onDrop = React.useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const webcamRef = React.useRef(null);
  const cropperRef = React.useRef(null);

  const capturePhoto = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhotoPreview(imageSrc);
      setShowWebcam(false);
      setShowCropper(true);
    }
  }, [webcamRef]);

  const handleCrop = () => {
    if (cropperRef.current?.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL();
      setPhotoPreview(croppedImage);
      setShowCropper(false);

      // Convert base64 to blob and set as file
      fetch(croppedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
          setValue('photo', { file });
        });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            {...register('first_name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.first_name.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            {...register('last_name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.last_name.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            {...register('date_of_birth')}
            max={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
          />
          {errors.date_of_birth && (
            <p className="mt-1 text-sm text-red-600">
              {errors.date_of_birth.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grade Level
          </label>
          <select
            {...register('grade_level', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
              <option key={grade} value={grade}>
                Grade {grade}
              </option>
            ))}
          </select>
          {errors.grade_level && (
            <p className="mt-1 text-sm text-red-600">
              {errors.grade_level.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            {...register('gender')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1ABC9C] focus:ring-[#1ABC9C]"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Zamel</option>
            <option value="prefer_not_to_say">Mat9ouba</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">
              {errors.gender.message?.toString()}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Student Photo
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          {showWebcam ? (
            <div className="space-y-4">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-64 h-48 rounded"
              />
              <button
                type="button"
                onClick={capturePhoto}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16a085]"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture Photo
              </button>
            </div>
          ) : showCropper && photoPreview ? (
            <div className="space-y-4">
              <Cropper
                ref={cropperRef}
                src={photoPreview}
                style={{ height: 200, width: '100%' }}
                aspectRatio={1}
                guides={false}
              />
              <button
                type="button"
                onClick={handleCrop}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1ABC9C] hover:bg-[#16a085]"
              >
                Crop Photo
              </button>
            </div>
          ) : photoPreview ? (
            <div className="space-y-4">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full"
              />
              <button
                type="button"
                onClick={() => setPhotoPreview('')}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Remove Photo
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <div {...getRootProps()} className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#1ABC9C] hover:text-[#16a085]">
                    <input {...getInputProps()} />
                    <span>Upload a file</span>
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowWebcam(true)}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#3498DB] hover:bg-[#2980b9]"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Academic Focus Areas
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {academicFocusOptions.map((focus) => (
            <label
              key={focus}
              className="relative flex items-center px-3 py-2 border rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                {...register('academic_focus')}
                value={focus}
                className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{focus}</span>
            </label>
          ))}
        </div>
        {errors.academic_focus && (
          <p className="mt-1 text-sm text-red-600">
            {errors.academic_focus.message?.toString()}
          </p>
        )}
      </div>
    </div>
  );
}
