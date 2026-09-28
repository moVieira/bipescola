import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import parentRoutes from './src/routes/parentRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem-vindo" });
});

export default app;