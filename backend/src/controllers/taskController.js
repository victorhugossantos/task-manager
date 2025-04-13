// Controle de tarefas
import database from '../config/database.js'

export const createTask = async(req, res) => {
    try {
        const { title, description, status } = req.body;

        if(!title) {
            return res.status(400).json({error: 'Titulo é obritório'})
        }

        const [result] = await database.query(
            'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ? ,?, ?)',
            [title, description, status, req.user.id]
        );

        res.status(201).json({id: result.insertId, title, description});
    } catch (error) {
        res.status(500).json({erro: 'Erro ao criar tarefa'})
    }
}

export const getTasks = async (req, res) => {
    try {
        const [tasks] = await database.query(
            "SELECT * FROM tasks WHERE user_id = ?",
            [req.user.id]
        );

        res.json(tasks);

    } catch (error) {
        console.error('Erro ao buscar tarefas: ', error);
        res.status(500).json({error: 'Erro interno ao buscar tarefas'})
    }
}