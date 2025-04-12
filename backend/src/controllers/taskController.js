// Controle de tarefas

import database from '../config/database'

export const createTask = async(req, res) => {
    try {
        const { title, description } = req.body;

        if(!title) {
            return res.status(400).json({error: 'Titulo é obritório'})
        }

        const [result] = await database.query(
            'INSERT INTO task (title, description, user_id) VALUES (?, ? ,?)',
            [title, description, req.user.id]
        );

        res.status(201).json({id: result.insertId, title, description});
    } catch (error) {
        res.status(500).json({erro: 'Erro ao criar tarefa'})
    }
}