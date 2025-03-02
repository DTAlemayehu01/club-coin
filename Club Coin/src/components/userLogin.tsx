import React, { useEffect, useState } from 'react';
import { usePrivy, PrivyProvider } from '@privy-io/react-auth';

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
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome!</h2>
          {user.email && (
            <p className="text-gray-600 mt-2">{user.email.address}</p>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Info</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">User ID:</span> {user.id}
            </p>
            {user.wallet && (
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Wallet:</span> {user.wallet.address.substring(0, 6)}...{user.wallet.address.substring(user.wallet.address.length - 4)}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {!user.wallet && (
            <button
              onClick={handleCreateWallet}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:bg-indigo-300"
            >
              {loading ? 'Processing...' : 'Create Wallet'}
            </button>
          )}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:bg-gray-50 disabled:text-gray-400"
          >
            {loading ? 'Processing...' : 'Logout'}
          </button>
        </div>
      </div>
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
