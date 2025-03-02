import ProductCard from "./ProductCard.tsx";
import { Product } from "./Product.tsx";
import { useNavigate } from "react-router-dom";

export const products: Product[] = [
	{
		id: 1,
		title: "Premium T-Shirt",
		description: "Comfortable cotton t-shirt with a modern fit",
		price: 10.0,
		image: "https://placehold.co/300x300/1e293b/white?text=T-Shirt",
	},
	{
		id: 2,
		title: "Denim Jacket",
		description: "Classic denim jacket with adjustable waist tabs",
		price: 15.0,
		image: "https://placehold.co/300x300/1e293b/white?text=Jacket",
	},
	{
		id: 3,
		title: "Sports Cap",
		description: "Breathable sports cap with adjustable strap",
		price: 6.0,
		image: "https://placehold.co/300x300/1e293b/white?text=Cap",
	},
	{
		id: 4,
		title: "Casual Hoodie",
		description: "Warm hoodie perfect for everyday wear",
		price: 20.0,
		image: "https://placehold.co/300x300/1e293b/white?text=Hoodie",
	},
];

const UserRedeem = () => {
	const navigate = useNavigate();

	return (
		<div className="container mx-auto py-8 px-8 bg-gray-900 rounded-xl shadow-xl">
			<button
				onClick={() => navigate("/user")}
				className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-4 rounded-xl transition-colors flex items-center justify-center"
			>
				Back
			</button>
			<h1 className="text-3xl font-bold mb-8 text-center text-white">
				Available Products
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default UserRedeem;
