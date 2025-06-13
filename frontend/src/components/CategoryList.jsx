export default function CategoryList({ categories, onDelete }) {
    return (
        <ul className="flex flex-wrap gap-2">
            {categories.map(cat => (
                <li
                    key={cat.id}
                    className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                    <span>{cat.name}</span>
                    <button
                        onClick={() => onDelete(cat.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        ×
                    </button>
                </li>
            ))}
        </ul>
    );
}
