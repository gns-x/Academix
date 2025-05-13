import { z } from 'zod';
import { differenceInYears, parse } from 'date-fns';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .regex(/^[a-zA-Z\s-]+$/, 'Name can only contain letters, spaces, and hyphens');

export const phoneSchema = z
  .string()
  .regex(/^\+?1?\d{10,14}$/, 'Invalid phone number format');

export const imageSchema = z.object({
  file: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    ),
});

export const studentSchema = z.object({
    first_name: nameSchema,
    last_name: nameSchema,
    date_of_birth: z.string().refine((date) => {
      try {
        const parsed = parse(date, 'yyyy-MM-dd', new Date());
        const age = differenceInYears(new Date(), parsed);
        return age >= 4 && age <= 18;
      } catch {
        return false;
      }
    }, 'Student must be between 4 and 18 years old'),
    grade_level: z.number().min(1).max(12),
    gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
    photo: imageSchema.optional(),
    academic_focus: z.array(z.string()).min(1, 'Select at least one academic focus'),

    // Make medical_conditions optional at this stage
    medical_conditions: z.array(z.string()).optional(),

    allergies: z.array(z.object({
      allergen: z.string(),
      severity: z.enum(['mild', 'moderate', 'severe']),
    })).optional(),
    accommodations: z.string().optional(),
    emergency_protocol: z.string().optional(),
  });


export const guardianSchema = z.object({
  first_name: nameSchema,
  last_name: nameSchema,
  email: z.string().email('Invalid email address'),
  phone: phoneSchema,
  address: z.string().min(5, 'Address is required'),
  relationship: z.string().min(2, 'Relationship is required'),
  emergency_priority: z.number().min(1).max(5),
  communication_preferences: z.array(z.enum(['email', 'phone', 'sms'])),
  legal_authority: z.boolean(),
  documents: z.array(z.any()).optional(),
});
