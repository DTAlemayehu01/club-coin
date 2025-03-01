import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>User</h1>
			<br></br>
			<div className="card">
				<form action="" method="">
					<div class="grid grid-cols-4 md:grid-cols-4 gap-3">
						<div class="flex items-center">
							<label class="mr-2" for="withdraw_amt">
								Amount to Transfer:
							</label>
						</div>
						<div class="flex items-center col-span-3">
							<input
								class="border-1 border-white m-4 rounded-lg p-1"
								type="number"
								min="0"
								name="withdraw_amt"
								id="withdraw_amt"
							></input>
						</div>

						<div class="flex items-center">
							<label class="mr-2" for="wallet_address">
								Wallet Address:
							</label>
						</div>
						<div class="flex items-center col-span-3">
							<input
								class="border-1 border-white m-4 rounded-lg p-1"
								type="text"
								min="0"
								name="wallet_address"
								id="withdraw_amt"
							></input>
						</div>
					</div>
					<button>Send Amount</button>
				</form>
			</div>
		</>
	);
}

function AdminPanel() {
	return (
		<div>
			<h1>Admin Panel</h1>
			<div className="relative overflow-x-auto shadow-md rounded-lg">
				<table className="w-full text-sm text-left text-gray-400">
					<thead className="text-xs text-gray-400 uppercase bg-gray-700">
						<tr>
							<th scope="column" className="px-6 py-3">
								Account
							</th>
							<th scope="column" className="px-6 py-3">
								Balance
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-gray-800 border-gray-700 border-b">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap text-white"
							>
								Jeff Bezos
							</th>
							<td>999 club_coin</td>
						</tr>
						<tr className="bg-gray-800">
							<th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap text-white"
							>
								Little Bobby
							</th>
							<td>0.0001 club_coin</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
