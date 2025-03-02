import { useNavigate } from "react-router-dom";
import { Product } from "./Product.tsx";

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const navigate = useNavigate();

	const handleRedeem = () => {
		// In a real app, you would make an API call here
		// to process the transaction
		navigate("success");
	};

	return (
		<div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
			<div className="w-full h-52">
				<img
					src={product.image}
					alt={product.title}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-5">
				<h2 className="text-xl font-semibold text-blue-300 mb-2">
					{product.title}
				</h2>
				<p className="text-slate-300 mb-4">{product.description}</p>
				<div className="flex justify-between items-center">
					<span className="text-2xl font-bold text-blue-400">
						{product.price.toFixed(2)} Coins
					</span>
					<button
						onClick={handleRedeem}
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
					>
						Redeem
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
