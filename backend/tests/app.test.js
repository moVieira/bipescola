import request from 'supertest';
import app from '../app.js';

describe('App', () => {
    it('deve retornar 200 e a mensagem de boas-vindas na rota raiz', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Bem-vindo');
    });
});
