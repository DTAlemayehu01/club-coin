import { useState, useEffect } from "react";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { Link, useNavigate } from "react-router-dom";

interface UserDashboardProps {
	title?: string;
}

const User: React.FC<UserDashboardProps> = ({ title = "User Dashboard" }) => {
	// const { userEmail, userWallet } = useSession();
	const userEmail = "a@example.com";
	const userWallet = "0x1234567890abcdef";
	const [balance, setBalance] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		// Simulate fetching the user's balance
		const fetchBalance = async () => {
			setIsLoading(true);
			try {
				// Replace with your actual API call to get the user's balance
				// Example: const response = await api.getUserBalance(userWallet);

				// Mock data for demonstration
				setTimeout(() => {
					setBalance(5280.42);
					setIsLoading(false);
				}, 800);
			} catch (error) {
				console.error("Error fetching balance:", error);
				setIsLoading(false);
			}
		};

		if (userWallet) {
			fetchBalance();
		} else {
			setIsLoading(false);
		}
	}, [userWallet]);

	return (
		<div className="bg-gray-900 min-h-lg min-w-lg rounded-xl shadow-xl">
			<div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<h1 className="text-2xl font-bold text-white mb-8">{title}</h1>

				{/* User Info Card */}
				<div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden mb-6">
					<div className="p-6">
						<h2 className="text-xl font-semibold text-white mb-4">
							Account Information
						</h2>
						<div className="space-y-4">
							<div className="flex items-center border-b border-gray-700 pb-4">
								<div className="w-1/3">
									<span className="text-gray-400">Email</span>
								</div>
								<div className="w-2/3">
									<span className="text-white">
										{userEmail || "—"}
									</span>
								</div>
							</div>
							<div className="flex items-center border-b border-gray-700 pb-4">
								<div className="w-1/3">
									<span className="text-gray-400">
										Wallet Address
									</span>
								</div>
								<div className="w-2/3">
									<span className="text-white font-mono">
										{userWallet}
									</span>
									{userWallet && (
										<button
											className="ml-2 text-blue-400 hover:text-blue-300"
											onClick={() =>
												navigator.clipboard.writeText(
													userWallet
												)
											}
											title="Copy full address"
										>
											<svg
												className="h-4 w-4 inline"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
												<path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
											</svg>
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

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
						onClick={() => navigate("/redeem")}
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

				{/* Recent Transactions - Optional */}
				<div className="mt-8 bg-gray-800 rounded-xl shadow-xl overflow-hidden">
					<div className="p-6">
						<h2 className="text-xl font-semibold text-white mb-4">
							Recent Transactions
						</h2>
						<div className="text-center py-8 text-gray-400">
							<p>Your recent transactions will appear here.</p>
						</div>
					</div>
				</div>

				{/* Log Out Button (Still Needs Implementation) */}
				<button
					className="text-red-400 hover:text-red-300 text-sm mt-6 min-w-md"
					onClick={() => window.location.reload()}
				>
					Log Out
				</button>
			</div>
		</div>
	);
};

export default User;
