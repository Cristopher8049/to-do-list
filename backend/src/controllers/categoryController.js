import * as categoryService from '../services/categoryService.js';

export async function getCategories(req, res) {
    try {
        const userId = req.user.id;
        const categories = await categoryService.getCategoriesByUser(userId);
        res.json(categories);
    } catch (err) {
        const status = typeof err.status === 'number' ? err.status : 500;
        res.status(status).json({ message: err.message });
    }
}

export async function createCategory(req, res) {
    try {
        const userId = req.user.id;
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Name is required.' });
        const newCategory = await categoryService.createCategory({ userId, name });
        res.status(201).json(newCategory);
    } catch (err) {
        const status = typeof err.status === 'number' ? err.status : 500;
        res.status(status).json({ message: err.message });
    }
}

export async function updateCategory(req, res) {
    try {
        const userId = req.user.id;
        const categoryId = req.params.id;
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Name is required.' });
        const updated = await categoryService.updateCategory({ categoryId, userId, name });
        res.json(updated);
    } catch (err) {
        const status = typeof err.status === 'number' ? err.status : 500;
        res.status(status).json({ message: err.message });
    }
}

export async function deleteCategory(req, res) {
    try {
        const userId = req.user.id;
        const categoryId = req.params.id;
        await categoryService.deleteCategory({ categoryId, userId });
        res.status(204).send();
    } catch (err) {
        const status = typeof err.status === 'number' ? err.status : 500;
        res.status(status).json({ message: err.message });
    }
}
