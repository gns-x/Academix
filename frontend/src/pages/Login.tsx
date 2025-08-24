import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const schoolImages = [
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541339907198-eedd9c632b0b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
];

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<any>;
}

export function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onLogin(email, password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container h-screen flex overflow-hidden">
      {/* Left Panel - School Showcase */}
      <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80"
            alt="School showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/80 to-[#4F46E5]/80 mix-blend-multiply" />
        </div>
        <div className="relative z-10 p-12 text-white">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">
              Welcome Back
            </h1>
            <p className="text-xl mb-8">
              Sign in to access your school dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-[40%] relative bg-gradient-to-br from-gray-50 to-white overflow-y-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

        {/* Gradient Orbs */}
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-gradient-to-br from-[#2563EB]/10 to-[#4F46E5]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-20%] w-[400px] h-[400px] bg-gradient-to-br from-[#F59E0B]/10 to-[#2563EB]/10 rounded-full blur-3xl" />

        <div className="relative flex items-center justify-center min-h-screen p-8 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <div className="relative w-16 h-16">
                <img
                  src="/inspirex-nobg.png"
                  alt="School Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ml-3 logo-text">
                <h2 className="text-3xl font-bold logo-text-main tracking-wider">
                  Academix Portal
                </h2>
                <p className="text-sm logo-text-sub font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                  By Inspirex
                </p>
              </div>
            </div>

            {/* Login Form */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`appearance-none block w-full px-3 py-2 pl-10 border rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent
                        ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`appearance-none block w-full px-3 py-2 pl-10 border rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent
                        ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your password"
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg
                    text-sm font-medium text-white bg-gradient-to-r from-[#2563EB] to-[#4F46E5]
                    hover:from-[#2563EB]/90 hover:to-[#4F46E5]/90
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
