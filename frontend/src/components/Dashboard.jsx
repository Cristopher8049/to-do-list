import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

import Header from './Header';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import Footer from './Footer';

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
        Promise.all([api.get('/categories'), api.get('/tasks')])
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
        await api.post('/categories', { name: newCategory.trim() });
        setNewCategory('');
        fetchData();
    };

    const deleteCategory = async id => {
        await api.delete(`/categories/${id}`);
        fetchData();
    };

    const addTask = async e => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        await api.post('/tasks', {
            title: newTaskTitle.trim(),
            description: null,
            category_id: null
        });
        setNewTaskTitle('');
        fetchData();
    };

    const toggleDone = async task => {
        await api.put(`/tasks/${task.id}`, {
            is_completed: !task.is_completed
        });
        fetchData();
    };

    const changeCategory = async (task, catId) => {
        await api.put(`/tasks/${task.id}`, {
            category_id: catId || null
        });
        fetchData();
    };

    const deleteTask = async id => {
        await api.delete(`/tasks/${id}`);
        fetchData();
    };

    const clearAll = async () => {
        await Promise.all(tasks.map(t => api.delete(`/tasks/${t.id}`)));
        fetchData();
    };

    const pendingCount = tasks.filter(t => !t.is_completed).length;

    if (loading) return <p className="text-white">Loading…</p>;
    if (error) return <p className="text-red-300">{error}</p>;

    return (
        <div className="w-full max-w-md rounded-2xl  p-6 space-y-6">
            <Header pendingCount={pendingCount} onLogout={logout} />

            <CategoryForm
                value={newCategory}
                onChange={setNewCategory}
                onSubmit={addCategory}
            />
            <CategoryList
                categories={categories}
                onDelete={deleteCategory}
            />

            <TaskForm
                value={newTaskTitle}
                onChange={setNewTaskTitle}
                onSubmit={addTask}
            />

            <div className="grid grid-cols-1 gap-4 max-h-64 overflow-y-auto">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        categories={categories}
                        onToggle={toggleDone}
                        onDelete={deleteTask}
                        onCategoryChange={changeCategory}
                    />
                ))}
            </div>

            <Footer pendingCount={pendingCount} onClearAll={clearAll} />
        </div>
    );
}
