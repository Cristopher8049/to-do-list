import * as categoryService from '../services/categoryService.js';

export async function getCategories(req, res) {
    try {
        const userId = "32e0b6ac-5c9f-4296-aea4-ce79a7c15d4f";
        const categories = await categoryService.getCategoriesByUser(userId);
        res.json(categories);
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
}

export async function createCategory(req, res) {
    try {
        const userId = "32e0b6ac-5c9f-4296-aea4-ce79a7c15d4f";
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required.' });
        }
        const newCategory = await categoryService.createCategory({ userId, name });
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function updateCategory(req, res) {
    try {
        const userId = "32e0b6ac-5c9f-4296-aea4-ce79a7c15d4f";
        const categoryId = req.params.id;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required.' });
        }
        const updated = await categoryService.updateCategory({ categoryId, userId, name });
        res.json(updated);
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
}

export async function deleteCategory(req, res) {
    try {
        const userId = "32e0b6ac-5c9f-4296-aea4-ce79a7c15d4f";
        const categoryId = req.params.id;
        await categoryService.deleteCategory({ categoryId, userId });
        res.status(204).send();
    } catch (err) {
        res.status(err.code || 500).json({ message: err.message });
    }
}