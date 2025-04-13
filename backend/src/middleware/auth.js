import jwt from 'jsonwebtoken'
import database from '../config/database.js'

const authenticate = async (req, res, next) => {
    try {
        // obter o token do header da requisição
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({error: 'Token não fornecido'})
        }

        const token = authHeader.split(' ')[1]; 

        // verifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Verifica o se o usuario existe no banco
        const [users] = await database.query(
            "SELECT id, email FROM users WHERE id = ?",
            [decoded.id]
        );

        if (!users.length) {
            return res.status(401).json({error: "Usuario não encontrado"})
        }

        // adiciona dados do usuario a requisição
        req.user = {
            id: users[0].id,
            email: users[0].email
        };

        next();

    } catch (error) {
        console.error('Erro na autenticação: ', error)

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({error: 'Token Expirado'});
        }

        return res.status(401).json({error: 'Autenticação invalida'})
    }
};

export default authenticate