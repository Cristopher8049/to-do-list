import { FiTrash2 } from 'react-icons/fi';

export default function TaskCard({
    task,
    categories,
    onToggle,
    onDelete,
    onCategoryChange
}) {
    return (
        <div
            className={`bg-gray-100 p-4 rounded-xl shadow flex flex-col ${task.is_completed ? 'opacity-50' : ''
                }`}
        >
            <div className="flex justify-between items-start">
                <h3
                    className={`font-medium ${task.is_completed ? 'line-through text-gray-500' : ''
                        }`}
                >
                    {task.title}
                </h3>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <FiTrash2 />
                </button>
            </div>

            <select
                value={task.category_id || ''}
                onChange={e => onCategoryChange(task, e.target.value)}
                className="mt-2 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-indigo-300"
            >
                <option value="">No Category</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <label className="mt-3 inline-flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => onToggle(task)}
                    className="form-checkbox h-5 w-5 text-green-500"
                />
                <span className="text-sm text-gray-700">
                    {task.is_completed ? 'Completed' : 'Pending'}
                </span>
            </label>
        </div>
    );
}
