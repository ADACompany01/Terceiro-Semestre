// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware para verificar se o token é válido
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
        console.log('Token recebido:', token);
        console.log('Token decodificado:', decoded);
    } catch (err) {
        res.status(401).json({ message: 'Token inválido.' });
    }
};

// Middleware para garantir que o usuário seja um funcionário
const verifyFuncionarioRole = (req, res, next) => {
    if (req.user.role !== 'funcionario') {
        return res.status(403).json({ message: 'Acesso restrito a funcionários.' });
    }
    next();
};



module.exports = { verifyToken, verifyFuncionarioRole };
