import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getBalance } from "../contractFunctions.tsx";

interface UserAccount {
    types: string;
    address: string;
    verified_at: number;
}

interface Wallet {
    types: string;
    address: string;
    chain_type: string;
    verified_at: number;
}

interface LinkedAccount {
    wallet?: Wallet;
    account?: UserAccount;
}

interface UserData {
    id: string;
    created_at: number;
    linked_accounts: LinkedAccount[];
}

interface PrivyUsersResponse {
    data: UserData[];
    next_cursor: string;
}

interface AdminPanelProps {
    title?: string;
}

interface FinalUser {
    email: string;
    walletAddress: string;
    balance: number;
}

const Admin: React.FC<AdminPanelProps> = ({ title = "Admin Dashboard" }) => {
    const [listAccounts, setUsers] = useState<UserData[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortBy, setSortBy] = useState<keyof FinalUser>("email");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [accounts, setAccounts] = useState<FinalUser[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                let users_data: UserData[] = [];
                let cursor = "";
                
                do {
                    const response = await axios.get<PrivyUsersResponse>(
                        `https://auth.privy.io:5173/api/v1/users${cursor ? `?cursor=${cursor}` : ''}`,
                        {
                            headers: {
                                'Authorization': `Basic ${btoa(`${import.meta.env.VITE_PRIVY_APP_ID}:${import.meta.env.VITE_PRIVY_API_KEY}`)}`,
                                'privy-app-id': import.meta.env.VITE_PRIVY_APP_ID,
                            }
                        }
                    );
                    
                    users_data = users_data.concat(response.data.data);
                    cursor = response.data.next_cursor;
                } while (cursor !== "");
                
                setUsers(users_data);
                setError(null);
            } catch (err) {
                console.error('Error fetching Privy users:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const parseUsers = async () => {
            if (listAccounts.length === 0) return;
            
            try {
                let final_list: FinalUser[] = [];
                
                for (let i = 0; i < listAccounts.length; i++) {
                    const user = listAccounts[i];
                    
                    // Check if linked_accounts exists and has necessary data
                    if (!user.linked_accounts || user.linked_accounts.length === 0) {
                        console.warn(`User ${user.id} has no linked accounts`);
                        continue;
                    }
                    
                    const accountData = user.linked_accounts.find(la => la.account)?.account;
                    const walletData = user.linked_accounts.find(la => la.wallet)?.wallet;
                    
                    if (!accountData || !walletData) {
                        console.warn(`User ${user.id} has incomplete account or wallet data`);
                        continue;
                    }
                    
                    try {
                        const aBalance = await getBalance(walletData.address);
                        
                        const new_user: FinalUser = {
                            email: accountData.address,
                            walletAddress: walletData.address,
                            balance: Number(aBalance),
                        };
                        
                        final_list.push(new_user);
                    } catch (balanceError) {
                        console.error(`Error getting balance for ${walletData.address}:`, balanceError);
                    }
                }
                
                setAccounts(final_list);
            } catch (err) {
                console.error("Error parsing users:", err);
                setError(err instanceof Error ? err.message : 'An error occurred while processing user data');
            }
        };

        if (!isLoading && listAccounts.length > 0) {
            parseUsers();
        }
    }, [listAccounts, isLoading]);

    const handleSort = (column: keyof FinalUser) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortDirection("asc");
        }
    };

    const filteredAccounts = accounts.filter(
        (account) =>
            account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.walletAddress
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const sortedAccounts = [...filteredAccounts].sort((a, b) => {
        if (sortBy === "balance") {
            return sortDirection === "asc"
                ? a.balance - b.balance
                : b.balance - a.balance;
        }
        return sortDirection === "asc"
            ? a[sortBy].toString().localeCompare(b[sortBy].toString())
            : b[sortBy].toString().localeCompare(a[sortBy].toString());
    });

    const formatWalletAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(
            address.length - 4
        )}`;
    };

    return (
        <div className="bg-gray-900 min-h-xl rounded-xl shadow-xl">
            <button
                onClick={() => navigate("/")}
                className="min-w-19/20 my-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:bg-gray-50 disabled:text-gray-400"
            >
                Go to User
            </button>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by email or wallet..."
                            className="bg-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full pl-8 pr-4 py-2 rounded-md text-white placeholder-gray-400 border-gray-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <svg
                                    className="animate-spin h-10 w-10 text-blue-500"
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
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSort("email")}
                                        >
                                            <div className="flex items-center">
                                                <span>Email</span>
                                                {sortBy === "email" && (
                                                    <svg
                                                        className={`ml-1 h-4 w-4 ${
                                                            sortDirection ===
                                                            "asc"
                                                                ? "transform rotate-180"
                                                                : ""
                                                        }`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                                            onClick={() =>
                                                handleSort("walletAddress")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <span>Wallet Address</span>
                                                {sortBy === "walletAddress" && (
                                                    <svg
                                                        className={`ml-1 h-4 w-4 ${
                                                            sortDirection ===
                                                            "asc"
                                                                ? "transform rotate-180"
                                                                : ""
                                                        }`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                                            onClick={() =>
                                                handleSort("balance")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <span>Balance (club_coin)</span>
                                                {sortBy === "balance" && (
                                                    <svg
                                                        className={`ml-1 h-4 w-4 ${
                                                            sortDirection ===
                                                            "asc"
                                                                ? "transform rotate-180"
                                                                : ""
                                                        }`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {sortedAccounts.length > 0 ? (
                                        sortedAccounts.map((account, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-700"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-white">
                                                        {account.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-300">
                                                        <span className="font-mono">
                                                            {formatWalletAddress(
                                                                account.walletAddress
                                                            )}
                                                        </span>
                                                        <button
                                                            className="ml-2 text-blue-400 hover:text-blue-300"
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(
                                                                    account.walletAddress
                                                                )
                                                            }
                                                            title="Copy full address"
                                                        >
                                                            <svg
                                                                className="h-4 w-4"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div
                                                        className="text-sm font-medium text-gray-300"
                                                    >
                                                        {account.balance}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-400 hover:text-blue-300 mr-3">
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-10 text-center text-sm text-gray-400"
                                            >
                                                No accounts found matching your
                                                search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="bg-gray-700 px-4 py-3 flex items-center justify-between border-t border-gray-600 sm:px-6">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-400">
                                    Showing{" "}
                                    <span className="font-medium">
                                        {sortedAccounts.length}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium">
                                        {accounts.length}
                                    </span>{" "}
                                    accounts
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    aria-label="Pagination"
                                >
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
                                    >
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        aria-current="page"
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-600 bg-gray-700 text-sm font-medium text-white"
                                    >
                                        1
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
