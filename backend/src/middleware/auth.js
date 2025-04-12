// middleware para autenticar afim de proteger as rotas que exigem a autenticação do usario

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split('')[1];

    if (!token) {
        return res.status(401).json({error: 'Acesso não autorizado'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // adiciona os dados do usuario a requisição
        next();
    } catch (error){

        return res.status(401).json({error: 'Token invalido'});

    }
}