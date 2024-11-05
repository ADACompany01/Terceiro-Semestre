const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');
const { verifyToken, verifyFuncionarioRole } = require('../middleware/authMiddleware');

// Rotas protegidas por token e papel de funcionário
router.get('/funcionario', verifyToken, verifyFuncionarioRole, funcionarioController.getFuncionarios);
router.put('/funcionario/:id', verifyToken, verifyFuncionarioRole, funcionarioController.updateFuncionario);
router.delete('/funcionario/:id', verifyToken, verifyFuncionarioRole, funcionarioController.deleteFuncionario);
router.get('/funcionario/:id', verifyToken, verifyFuncionarioRole, funcionarioController.getFuncionarioById);

module.exports = router;
