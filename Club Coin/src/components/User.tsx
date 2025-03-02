import { useState } from "react";

interface TransferFormProps {
	onSubmit: (amount: number, address: string) => void;
}

const UserPage: React.FC<TransferFormProps> = ({ onSubmit }) => {
	const [amount, setAmount] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			onSubmit(parseFloat(amount), address);
			setIsLoading(false);
		}, 1000);
	};

	return (
		<div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-xl overflow-hidden">
			<div className="p-8">
				<h2 className="text-3xl font-bold text-white mb-6">
					Transfer Funds
				</h2>

				<form onSubmit={handleSubmit}>
					<div className="space-y-6">
						{/* Amount Input */}
						<div>
							<label
								htmlFor="amount"
								className="block text-sm font-medium text-gray-300 mb-2"
							>
								Amount to Transfer
							</label>
							<div className="relative">
								<input
									id="amount"
									type="number"
									step="0.0001"
									min="0"
									required
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									className="block w-full pl-4 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="0.00"
								/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none">
									<span className="text-white">
										club_coin
									</span>
								</div>
							</div>
						</div>

						{/* Wallet Address Input */}
						<div>
							<label
								htmlFor="wallet"
								className="block text-sm font-medium text-gray-300 mb-2"
							>
								Email Address
							</label>
							<input
								id="wallet"
								type="email"
								required
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter email address"
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading || !amount || !address}
							className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium transition-colors ${
								isLoading || !amount || !address
									? "bg-gray-600 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700"
							}`}
						>
							{isLoading ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
									Processing...
								</>
							) : (
								"Send Amount"
							)}
						</button>
					</div>
				</form>
				<button
					type="redirect"
					disabled={isLoading || !amount || !address}
					className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium transition-colors ${
						isLoading || !amount || !address
							? "bg-gray-600 cursor-not-allowed"
							: "bg-blue-600 hover:bg-blue-700"
					}`}
				>
					{isLoading ? (
						<>
							<svg
								className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
							Processing...
						</>
					) : (
						"Send Amount"
					)}
				</button>
			</div>
		</div>
	);
};

export default UserPage;
