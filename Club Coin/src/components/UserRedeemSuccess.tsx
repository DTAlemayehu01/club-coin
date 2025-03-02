import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
	const navigate = useNavigate();

	return (
		<div className="container mx-auto py-16 px-4 text-center rounded-xl">
			<div className="bg-slate-800 p-8 rounded-lg max-w-md mx-auto">
				<div className="mb-6 text-green-400">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-24 w-24 mx-auto"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<h1 className="text-3xl font-bold text-blue-400 mb-4">
					Transaction Successful!
				</h1>
				<button
					onClick={() => navigate("/user")}
					className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-4 rounded-xl transition-colors items-center justify-center"
				>
					Back to Dashboard
				</button>
			</div>
		</div>
	);
};

export default SuccessPage;
