import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the props interface
interface LoginFormProps {
  onLoginSuccess?: () => void;
  onLoginFailure?: (error: string) => void;
  redirectPath?: string;
}

const AdminForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onLoginFailure,
  redirectPath = '/dashboard'
}) => {
  // State for form inputs and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // For navigation/redirect
  const navigate = useNavigate();

  // For Vite, environment variables are prefixed with VITE_ instead of REACT_APP_
  const ENV_USERNAME = import.meta.env.VITE_ADMIN_USER;
  const ENV_PASSWORD = import.meta.env.VITE_ADMIN_PASS;

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Client-side authentication check
      if (username === ENV_USERNAME && password === ENV_PASSWORD) {
        // Set authentication state
        localStorage.setItem('isAuthenticated', 'true');

        // Call success callback if provided
        if (onLoginSuccess) {
          onLoginSuccess();
        }

        // Redirect to the specified path
        navigate(redirectPath);
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      if (onLoginFailure) {
        onLoginFailure(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
