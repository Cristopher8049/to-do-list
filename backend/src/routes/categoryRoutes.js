import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;