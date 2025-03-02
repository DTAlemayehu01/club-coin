import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./components/Admin.tsx";
import User from "./components/User.tsx";
import "./App.css";

const App: React.FC = () => {
	const handleTransferSubmit = (amount: number, address: string) => {
		console.log(`Transferring ${amount} to ${address}`);
		// Add your transfer logic here
	};

	return (
		<BrowserRouter>
			<Routes>
				{/* Home Route - Redirect to user page */}
				<Route path="/" element={<Navigate to="/user" replace />} />

				{/* User Route - Transfer Funds Form */}
				<Route
					path="/user"
					element={<User onSubmit={handleTransferSubmit} />}
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
