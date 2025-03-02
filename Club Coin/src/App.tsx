import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./components/Admin.tsx";
import User from "./components/User.tsx";
import UserTransfer from "./components/UserTransfer.tsx";
import UserRedeem from "./components/UserRedeem.tsx";
import SuccessPage from "./components/UserRedeemSuccess.tsx";
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

				{/* User Route - User Dashboard */}
				<Route path="/user" element={<User />} />

				{/* User Transfer Route - Transfer Funds Form */}
				<Route
					path="/user/transfer"
					element={<UserTransfer onSubmit={handleTransferSubmit} />}
				/>

				{/* User Redeem Route - Allows use to redeem Club Coins */}
				<Route path="/user/redeem" element={<UserRedeem />} />

				{/* User Redeem Success Route - Success page for when a redemption transaction is successful */}
				<Route path="/user/redeem/success" element={<SuccessPage />} />

				{/* Admin route - admin panel */}
				<Route
					path="/admin"
					element={<Admin title="Admin Dashboard" />}
				/>

				{/* 404 route - when URL doesn't match */}
				<Route
					path="*"
					element={
						<div className="h-screen w-xl bg-gray-900 flex items-center justify-center">
							<div className="text-center">
								<h1 className="text-4xl font-bold text-white mb-4">
									404
								</h1>
								<p className="text-gray-400 mb-6">
									Page not found
								</p>
								<a
									href="/"
									className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
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
