import * as taskService from '../services/taskService.js';

export async function getTasks(req, res) {
    try {
        const userId = req.user.id;
        const tasks = await taskService.getTasksByUser(userId);
        res.json(tasks);
    } catch (err) {
        const status = typeof err.status === 'number' ? err.status : 500;
        res.status(status).json({ message: err.message });
    }
}

export async function createTask(req, res) {
    try {
        const userId = req.user.id;
        const { title, description = null, category_id = null } = req.body;
        if (!title) return res.status(400).json({ message: 'Title is required.' });
        const newTask = await taskService.createTask({ userId, title, description, category_id });
        res.status(201).json(newTask);
    } catch (err) {
        const status = typeof err.status === 'number' ? err.status : 500;
        res.status(status).json({ message: err.message });
    }
}

export async function updateTask(req, res) {
    try {
        const userId = req.user.id;
        const taskId = req.params.id;
        const updates = req.body;
        const updated = await taskService.updateTask({ taskId, userId, updates });
        res.json(updated);
    } catch (err) {
        const status = typeof err.status === 'number' ? err.status : 500;
        res.status(status).json({ message: err.message });
    }
}

export async function deleteTask(req, res) {
    try {
        const userId = req.user.id;
        const taskId = req.params.id;
        await taskService.deleteTask({ taskId, userId });
        res.status(204).send();
    } catch (err) {
        const status = typeof err.status === 'number' ? err.status : 500;
        res.status(status).json({ message: err.message });
    }
}
