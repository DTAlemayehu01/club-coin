import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	usePrivy,
	PrivyProvider,
	useSolanaWallets,
} from "@privy-io/react-auth";
import { transferTokens } from "../contractFunctions.tsx";

interface TransferFormProps {
	onSubmit: (amount: number, address: string) => void;
}

const UserTransfer: React.FC<TransferFormProps> = ({ onSubmit }) => {
	const [amount, setAmount] = useState<number>(0);
	const [toAddress, setToAddress] = useState<string>("");
	const [fromAddress, setFromAddress] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	//const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null);
	const { user } = usePrivy();

	const navigate = useNavigate();

	// Transfer function
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Reset states
		setIsLoading(true);
		setError(null);
		//setTransactionResult(null);

		try {
			// Call the async function
			const result = await transferTokens(toAddress, amount, fromAddress);

			if (result && user && user.wallet) {
				//setTransactionResult(result);
				setToAddress(toAddress);
				setFromAddress(user.wallet.address);
				setAmount(amount);
			} else {
				setError("Transaction failed");
			}
		} catch (err) {
			setError(
				"Error processing transaction: " +
					(err instanceof Error ? err.message : String(err))
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-w-lg max-w-xl bg-gray-900 rounded-xl shadow-xl overflow-hidden">
			<div className="p-8">
				<button
					onClick={() => navigate("/login")}
					className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-4 rounded-xl transition-colors flex items-center justify-center"
				>
					Back
				</button>
				<h1 className="text-3xl font-bold text-white mb-6">
					Transfer Funds
				</h1>

				<div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden p-4">
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
										step="1"
										min="0"
										required
										value={amount}
										onChange={(e) =>
											setAmount(Number(e.target.value))
										}
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
									Recipent Account Number
								</label>
								<input
									id="wallet"
									type="text"
									required
									value={toAddress}
									onChange={(e) =>
										setToAddress(e.target.value)
									}
									className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Enter account number"
								/>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={isLoading || !amount || !toAddress}
								className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium transition-colors ${
									isLoading || !amount || !toAddress
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
				</div>
			</div>
		</div>
	);
};

export default UserTransfer;
