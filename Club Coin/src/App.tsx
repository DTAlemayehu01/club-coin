import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<AdminPanel />
			{/* <div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p> */}
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
