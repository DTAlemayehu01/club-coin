import Web3 from "web3";

let web3: Web3 | null = null;

const providerUrl = 'https://sepolia.infura.io/v3/9fbef355017845ea9f512477c8ec9629';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// Ensure `window.ethereum` is correctly typed
declare global {
	interface Window {
		ethereum?: any;
	}
}

if (typeof window !== "undefined" && window.ethereum) {
	web3 = new Web3(window.ethereum);
} else {
	console.error("MetaMask is not installed!");
}

export default web3;
