/*
  # Student Management System Schema

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `student_code` (text, unique, auto-generated)
      - `first_name` (text)
      - `last_name` (text)
      - `date_of_birth` (date)
      - `grade_level` (integer)
      - `created_at` (timestamp)
    
    - `guardians`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `address` (text)
      - `created_at` (timestamp)
    
    - `student_guardians`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `guardian_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Functions
    - `generate_student_code`: Generates unique student codes in format 'LAC-A-[number]'

  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to generate student codes
CREATE OR REPLACE FUNCTION generate_student_code()
RETURNS TEXT AS $$
DECLARE
  next_num INTEGER;
  new_code TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(student_code FROM 'LAC-A-(\d+)') AS INTEGER)), 0) + 1
  INTO next_num
  FROM students;
  
  new_code := 'LAC-A-' || LPAD(next_num::TEXT, 4, '0');
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_code TEXT UNIQUE NOT NULL DEFAULT generate_student_code(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  grade_level INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_grade_level CHECK (grade_level BETWEEN 1 AND 12)
);

-- Create guardians table
CREATE TABLE IF NOT EXISTS guardians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for student-guardian relationships
CREATE TABLE IF NOT EXISTS student_guardians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  guardian_id UUID REFERENCES guardians(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, guardian_id)
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_guardians ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users"
  ON students FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON students FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON guardians FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON guardians FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON student_guardians FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON student_guardians FOR INSERT TO authenticated WITH CHECK (true);