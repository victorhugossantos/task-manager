import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { register, login } from './controllers/authController.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.post('/auth/register', register);
app.post('/auth/login', login);

// middlware de erro

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro Interno'});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})