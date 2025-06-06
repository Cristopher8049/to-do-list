import express from 'express';
import categoryRoutes from './routes/categoryRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'OK', time: new Date().toISOString() });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});