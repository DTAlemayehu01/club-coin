import React, { useEffect, useState } from 'react';
import { usePrivy, PrivyProvider } from '@privy-io/react-auth';
//import { Navigate } from "react-router-dom";
import UserPage from User.tsx;

// AuthComponent handles login/signup with Privy
const AuthComponent: React.FC = () => {
  const {
    ready,
    authenticated,
    user,
    login,
    createWallet,
    linkWallet,
    logout
  } = usePrivy();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle login
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login();
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle wallet creation for new users
  const handleCreateWallet = async () => {
    setLoading(true);
    setError(null);
    try {
      await createWallet();
    } catch (err) {
      setError('Failed to create wallet. Please try again.');
      console.error('Wallet creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // If Privy is not yet initialized
  if (!ready) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading authentication...</div>
      </div>
    );
  }

  // User is authenticated
  if (authenticated && user) {
    return (
      <UserPage />
    );
  }

  // User is not authenticated
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome</h2>
        <p className="text-gray-600 mt-2">Sign in or create an account</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:bg-indigo-300"
      >
        {loading ? 'Processing...' : 'Login / Sign Up'}
      </button>

      <div className="mt-4 text-center text-sm text-gray-500">
        Powered by Privy authentication
      </div>
    </div>
  );
};

// Main component that wraps the auth component with PrivyProvider
const UserLogin: React.FC = () => {
  // Replace with your actual Privy App ID
  const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID || "your-privy-app-id";

  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#4F46E5',
          logo: 'https://your-logo-url.com/logo.png',
        },
      }}
    >
      <AuthComponent />
    </PrivyProvider>
  );
};

export default UserLogin;
