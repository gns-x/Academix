import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { RegistrationWizard } from './components/RegistrationWizard';

export default function App() {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />

        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!isAuthenticated ? <Login onLogin={login} /> : <Navigate to="/dashboard" />}
        />

        <Route path="/registration" element={
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Student Registration Portal
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                  Complete your student registration in a few easy steps
                </p>
              </div>
              <div className="mt-12">
                <RegistrationWizard />
              </div>
            </div>
          </div>
        } />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}
