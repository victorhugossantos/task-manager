import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import database from '../config/database.js'

const saltRounds = 10;

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verifica se o usuario já existe
        const [existingUser] = await database.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (existingUser.length > 0 ) {
            return res.status(409).json({error: 'Email já cadastrado'})
        }

        // criptografa a senha do usuario
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Cadastra um novo usuario
        const [result] = await database.query(
            'INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({
            id: result.insertId,
            name,
            email,
        });

    } catch (error){
        console.error('Erro no registro: ', error);
        res.status(500).json({error: 'Erro ao lado servidor'})
    };
    
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificação basica
        if (!email || !password) {
            return res.status(400).json({error: 'Email e senha são obrigatorios'})
        }

        // busca o usuario no banco
        const [users] = await database.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0 ) {
            return res.status(401).json({error: 'Credenciais inválidas'});
        }

        const user = users[0];

        // verificar a senha 

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({error: 'Crendenciais invalidas'});
        }

        // Gerar token JWT
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.error('erro no login: ', error);
        return res.status(500).json({error: 'Erro ao lado do servidor'})

    }
}