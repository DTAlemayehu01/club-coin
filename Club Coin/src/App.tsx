import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import Admin from "./components/Admin.tsx";
//import UserPage from "./components/User.tsx";
import AdminLogin from "./components/adminLogin.tsx";
import UserLogin from "./components/userLogin.tsx";
import UserTransfer from "./components/UserTransfer.tsx";
import UserRedeem from "./components/UserRedeem.tsx";
import SuccessPage from "./components/UserRedeemSuccess.tsx";
// import MessageModal from "./components/Message.tsx";
import PageDoesNotExist from "./components/PageDoesNotExist.tsx";
import "./App.css";

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
	element,
}) => {
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
	// const {
	// 	ready,
	// 	authenticated,
	// 	user,
	// 	logout,
	// 	login,
	// } = usePrivy();

	return (
		<BrowserRouter>
			<Routes>
				{/* Home Route - Redirect to user page */}
				<Route path="/" element={<Navigate to="/login" replace />} />

				<Route path="/login" element={<UserLogin />} />

				{/* User Transfer Route - Transfer Funds Form */}
				{/*
				<Route
					path="/user"
					element={<ProtectedRoute element=<UserLogin onSubmit={handleTransferSubmit} />/>}
				/>*/}

				<Route
					path="/admin-login"
					element={<AdminLogin redirectPath="/admin" />}
				/>

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
