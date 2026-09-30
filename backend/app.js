import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import parentRoutes from './src/routes/parentRoutes.js';
import admRoutes from './src/routes/admRoutes.js';
import professorRoutes from './src/routes/professorRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import attendanceRoutes from './src/routes/attendanceRoutes.js';
import postRoutes from './src/routes/postRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/adms', admRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem-vindo" });
});

export default app;
