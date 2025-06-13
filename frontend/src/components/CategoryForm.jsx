import { FiPlus } from 'react-icons/fi';

export default function CategoryForm({ value, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="flex space-x-2">
            <input
                type="text"
                placeholder="Create new category"
                value={value}
                onChange={e => onChange(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300"
            />
            <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg flex items-center justify-center"
            >
                <FiPlus />
            </button>
        </form>
    );
}
