import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { FiTrash2, FiPlus } from 'react-icons/fi';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            api.get('/categories'),
            api.get('/tasks')
        ])
            .then(([catsRes, tasksRes]) => {
                setCategories(catsRes.data);
                setTasks(tasksRes.data);
            })
            .catch(() => setError('Error fetching data'))
            .finally(() => setLoading(false));
    };

    useEffect(fetchData, []);

    const addCategory = async e => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        try {
            await api.post('/categories', { name: newCategory.trim() });
            setNewCategory('');
            fetchData();
        } catch {
            setError('Error creating category');
        }
    };

    const deleteCategory = async id => {
        try {
            await api.delete(`/categories/${id}`);
            fetchData();
        } catch {
            setError('Error deleting category');
        }
    };

    const addTask = async e => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        try {
            await api.post('/tasks', {
                title: newTaskTitle.trim(),
                description: null,
                category_id: null
            });
            setNewTaskTitle('');
            fetchData();
        } catch {
            setError('Error creating task');
        }
    };

    const toggleDone = async task => {
        try {
            await api.put(`/tasks/${task.id}`, {
                is_completed: !task.is_completed
            });
            fetchData();
        } catch {
            setError('Error updating task');
        }
    };

    const changeCategory = async (task, catId) => {
        try {
            await api.put(`/tasks/${task.id}`, {
                category_id: catId || null
            });
            fetchData();
        } catch {
            setError('Error updating task category');
        }
    };

    const deleteTask = async id => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchData();
        } catch {
            setError('Error deleting task');
        }
    };

    const clearAll = async () => {
        try {
            await Promise.all(tasks.map(t => api.delete(`/tasks/${t.id}`)));
            fetchData();
        } catch {
            setError('Error clearing tasks');
        }
    };

    const pendingCount = tasks.filter(t => !t.is_completed).length;

    if (loading) return <p className="text-white">Loading...</p>;
    if (error) return <p className="text-red-300">{error}</p>;

    return (
        <div className="w-full max-w-md rounded-2xl  p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Todo App</h1>
                <button
                    onClick={logout}
                    className="text-sm text-red-500 hover:text-red-700"
                >
                    Logout
                </button>
            </div>

            <form onSubmit={addCategory} className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Create new category"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-300"
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg flex items-center justify-center"
                >
                    <FiPlus />
                </button>
            </form>

            <ul className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <li
                        key={cat.id}
                        className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                        <span>{cat.name}</span>
                        <button
                            onClick={() => deleteCategory(cat.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>

            <form onSubmit={addTask} className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Add new task"
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg flex items-center justify-center"
                >
                    <FiPlus />
                </button>
            </form>

            <div className="grid grid-cols-1 gap-4 max-h-64 overflow-y-auto">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className={`bg-gray-100 p-4 rounded-xl shadow flex flex-col`}
                    >
                        <div className="flex justify-between items-start">
                            <h3
                                className={`font-medium ${task.is_completed ? 'line-through text-gray-500' : ''
                                    }`}
                            >
                                {task.title}
                            </h3>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FiTrash2 />
                            </button>
                        </div>

                        <select
                            value={task.category_id || ''}
                            onChange={e => changeCategory(task, e.target.value)}
                            className="mt-2 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                        >
                            <option value=""> No Category</option>
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
                                onChange={() => toggleDone(task)}
                                className="form-checkbox h-5 w-5 text-green-500"
                            />
                            <span className="text-sm text-gray-700">
                                {task.is_completed ? 'Completed' : 'Pending'}
                            </span>
                        </label>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-gray-600 text-sm">
                    You have {pendingCount} pending tasks
                </span>
                <button
                    onClick={clearAll}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-1 rounded-lg transition"
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}
