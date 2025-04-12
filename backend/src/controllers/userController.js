// Rota de perfl do usuario
import database from "../config/database"

export const getProfile = async (req, res) => {
    try {
        const [users] = await database.query(
            'SELECT id, name, email FROM users WHERE id = ? '
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({error: 'Usuario não encontrado'});
        }

        res.json(users[0])
    } catch (error) {
        res.status(500).json({error: 'Erro ao lado servidor'});
    }
};
