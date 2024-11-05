const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { verifyToken, verifyFuncionarioRole } = require('../middleware/authMiddleware');

// Rotas protegidas por token e papel de funcionário
router.get('/cliente', verifyToken, verifyFuncionarioRole, clienteController.getClientes);
router.put('/cliente/:id', verifyToken, verifyFuncionarioRole, clienteController.updateCliente);
router.delete('/cliente/:id', verifyToken, verifyFuncionarioRole, clienteController.deleteCliente);
router.get('/cliente/:id', verifyToken, verifyFuncionarioRole, clienteController.details);

module.exports = router;
