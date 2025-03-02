import React, { useState } from "react";
import {
	usePrivy,
	PrivyProvider,
	useSolanaWallets,
} from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
import logo from "./../images/Totally professional logo.png";
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
	const [balance, setBalance] = useState<string>("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	//const {wallets} = useSolanaWallets();

	// const handleSubmit = (e: React.FormEvent) => {
	//   e.preventDefault();
	//   setIsLoading(true);

	//   // Simulate API call
	//   setTimeout(() => {
	//     onSubmit(parseFloat(amount), address);
	//     setIsLoading(false);
	//   }, 1000);
	// };

	// const handleBalance = async (address: string) => {
	//   setIsLoading(true);
	//   setError(null);
	//   try {
	//     const result = await getBalance(address);
	//     if (result) {
	//       setBalance(result);
	//     } else {
	//       setError("Balance Check failed");
	//     }
	//   } catch(err) {
	//     setError('Error processing transaction: ' + (err instanceof Error ? err.message : String(err)));
	//   } finally {
	//     setIsLoading(false);
	//   }
	// }

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

		navigate("/user", { state: { user } });
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
				loginMethods: ["wallet"],
				appearance: {
					theme: "light",
					accentColor: "#4F46E5",
					logo: logo,
				},
			}}
		>
			<AuthComponent />
		</PrivyProvider>
	);
};

export default UserLogin;
