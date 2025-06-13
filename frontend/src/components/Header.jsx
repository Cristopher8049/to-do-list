import { FiLogOut } from 'react-icons/fi';

export default function Header({ onLogout }) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Todo App</h1>
            <button
                onClick={onLogout}
                className="flex items-center text-sm text-red-500 hover:text-red-700"
            >
                <FiLogOut className="mr-1" /> Logout
            </button>
        </div>
    );
}
