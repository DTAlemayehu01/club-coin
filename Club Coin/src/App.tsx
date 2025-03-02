import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import Admin from "./components/Admin.tsx";
//import UserPage from "./components/User.tsx";
import AdminLogin from "./components/adminLogin.tsx";
import UserLogin from "./components/userLogin.tsx";
import "./App.css";

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { authenticated, ready } = usePrivy();

  // Show loading while Privy initializes
  if (!ready) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{element}</>;
};

const App: React.FC = () => {
	const handleTransferSubmit = (amount: number, address: string) => {
		console.log(`Transferring ${amount} to ${address}`);
		// Add your transfer logic here
	};
	const {
		ready,
		authenticated,
		user,
		logout,
		login,
	} = usePrivy();

	return (
		<BrowserRouter>
			<Routes>
				{/* Home Route - Redirect to user page */}
				<Route path="/" element={<Navigate to="/login" replace />} />

				<Route
					path="/login"
					element={<UserLogin />}
				/>

				{/* User Route - Transfer Funds Form */}
				<Route
					path="/user"
					element={<ProtectedRoute element=<UserLogin onSubmit={handleTransferSubmit} />/>}
				/>

				<Route
					path="/admin-login"
					element={<AdminLogin redirectPath="/admin" />}
				/>

				{/* Admin route - admin panel */}
				<Route
					path="/admin"
					element={<Admin title="Admin Dashboard" />}
				/>

				{/* 404 route - when URL doesn't match */}
				<Route
					path="*"
					element={
						<div className="min-h-screen bg-gray-900 flex items-center justify-center">
							<div className="text-center">
								<h1 className="text-4xl font-bold text-white mb-4">
									404
								</h1>
								<p className="text-gray-400 mb-6">
									Page not found
								</p>
								<a
									href="/"
									className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
								>
									Go to Home
								</a>
							</div>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
