import React, { useEffect, useState } from "react";
import {
	usePrivy,
	PrivyProvider,
	// useSolanaWallets,
} from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
// import UserPage from User.tsx;

// AuthComponent handles login/signup with Privy
const AuthComponent: React.FC = () => {
	const {
		ready,
		authenticated,
		user,
		login,
		createWallet,
		linkWallet,
		logout,
	} = usePrivy();

	const navigate = useNavigate();

	const [amount, setAmount] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [balance, setBalance] = useState<number>(0);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	//const {wallets} = useSolanaWallets();

	// const handleSubmit = (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	setIsLoading(true);

	// 	// Simulate API call
	// 	setTimeout(() => {
	// 		onSubmit(parseFloat(amount), address);
	// 		setIsLoading(false);
	// 	}, 1000);
	// };

	// Handle login
	const handleLogin = async () => {
		setLoading(true);
		setError(null);
		try {
			await login();
		} catch (err) {
			setError("Failed to login. Please try again.");
			console.error("Login error:", err);
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
			console.error("Logout error:", err);
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
			setError("Failed to create wallet. Please try again.");
			console.error("Wallet creation error:", err);
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
		if (!user.wallet) {
			handleCreateWallet();
		}

		return (
			<>
				<div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-xl overflow-hidden">
					<div className="text-center mb-6">
						<h2 className="p-4 text-2xl font-bold text-white-800">
							Welcome!
						</h2>
					</div>
					<button
						onClick={() => navigate("/admin-login")}
						disabled={loading}
						className="min-w-19/20 my-4 bg-gray-100 hover:bg-gray-200 text-white-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:bg-gray-50 disabled:text-gray-400"
					>
						{loading ? "Processing..." : "Go To Admin"}
					</button>

					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2">
							Your Info
						</h3>
						<div className="bg-gray-600 p-4 rounded-md m-4">
							<p className="text-sm text-white-400 mb-1">
								<span className="font-medium">User ID:</span>{" "}
								{user.id}
							</p>
							{user.email && (
								<p className="text-sm text-white-400 mb-1">
									<span className="font-medium">Email:</span>{" "}
									{user.email.address}
								</p>
							)}
							{user.wallet && (
								<p className="text-sm text-white-400 mb-1">
									<span className="font-medium">Wallet:</span>{" "}
									{user.wallet.address.substring(0, 6)}...
									{user.wallet.address.substring(
										user.wallet.address.length - 4
									)}
								</p>
							)}
						</div>
					</div>

					<div className="p-2">
						{/* Balance Card */}
						<div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden mb-8">
							<div className="p-6">
								<div className="flex justify-between items-center mb-2">
									<h2 className="text-xl font-semibold text-white">
										Your Balance
									</h2>
									<button
										className="text-blue-400 hover:text-blue-300 text-sm"
										onClick={() => window.location.reload()}
									>
										Refresh
									</button>
								</div>
								{isLoading ? (
									<div className="flex justify-center items-center h-24">
										<svg
											className="animate-spin h-8 w-8 text-blue-500"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
									</div>
								) : (
									<div className="mt-2">
										<span className="text-3xl font-bold text-green-400">
											{balance}
										</span>
									</div>
								)}
							</div>
						</div>

						{/* Action Buttons */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<button
								onClick={() => navigate("/user/transfer")}
								className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-4 rounded-xl transition-colors flex items-center justify-center"
							>
								<svg
									className="h-5 w-5 mr-2"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
								</svg>
								Transfer Funds
							</button>

							<button
								onClick={() => navigate("/user/redeem")}
								className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-4 rounded-xl transition-colors flex items-center justify-center"
							>
								<svg
									className="h-5 w-5 mr-2"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z"
										clipRule="evenodd"
									/>
								</svg>
								Redeem Points
							</button>
						</div>

						<div className="py-4 space-y-3">
							{/* {!user.wallet && (
              <button
                onClick={handleCreateWallet}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:bg-indigo-300"
              >
                {loading ? 'Processing...' : 'Create Wallet'}
              </button>
            )} */}
							<button
								onClick={handleLogout}
								disabled={loading}
								className="w-full bg-gray-100 hover:bg-gray-200 text-white-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:bg-gray-50 disabled:text-gray-400"
							>
								{loading ? "Processing..." : "Logout"}
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}

	// User is not authenticated
	return (
		<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
			<div className="text-center mb-6">
				<h2 className="text-2xl font-bold text-gray-800">Welcome</h2>
				<p className="text-gray-600 mt-2">
					Sign in or create an account
				</p>
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
				{loading ? "Processing..." : "Login / Sign Up"}
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
	const PRIVY_APP_ID =
		import.meta.env.VITE_PRIVY_APP_ID || "your-privy-app-id";

	return (
		<PrivyProvider
			appId={import.meta.env.VITE_PRIVY_APP_ID}
			config={{
				loginMethods: ["email", "wallet"],
				appearance: {
					theme: "light",
					accentColor: "#4F46E5",
					logo: "https://your-logo-url.com/logo.png",
				},
			}}
		>
			<AuthComponent />
		</PrivyProvider>
	);
};

export default UserLogin;
