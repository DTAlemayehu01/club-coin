import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./components/Admin.tsx";
import User from "./components/User.tsx";
import UserTransfer from "./components/UserTransfer.tsx";
import UserRedeem from "./components/UserRedeem.tsx";
import SuccessPage from "./components/UserRedeemSuccess.tsx";
import PageDoesNotExist from "./components/PageDoesNotExist.tsx";
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
				<Route path="*" element={<PageDoesNotExist />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
