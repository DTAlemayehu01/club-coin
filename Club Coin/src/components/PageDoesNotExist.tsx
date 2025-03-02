import { useNavigate } from "react-router-dom";

const PageDoesNotExist = () => {
	const navigate = useNavigate();

	return (
		<div className="h-screen w-xl bg-gray-900 flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-white mb-4">404</h1>
				<p className="text-gray-400 mb-6">Page not found</p>
				<button
					onClick={() => navigate("/")}
					className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-4 rounded-xl transition-colors flex items-center justify-center"
				>
					Back
				</button>
			</div>
		</div>
	);
};

export default PageDoesNotExist;
