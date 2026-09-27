import express from 'express';

import userRoutes from './src/routes/userRoutes.js';
import parentRoutes from './src/routes/parentRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';

import { getConnection } from './src/database/db.js';

import cors from 'cors';




const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem-vindo" });
});


async function startServer() {
    try {
        const connection = await getConnection();
        try {
            await connection.ping();
            console.log('Conexão com o banco de dados estabelecida.');
        } finally {
            connection.release();
        }

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}.`)
        });
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error.message);
        process.exit(1);
    }
}

startServer();