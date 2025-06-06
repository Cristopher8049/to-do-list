import express from 'express';
// import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

// router.use(authMiddleware);

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;