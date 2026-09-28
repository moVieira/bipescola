import app from './app.js';
import { getConnection } from './src/database/db.js';

const port = process.env.PORT || 3000;

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