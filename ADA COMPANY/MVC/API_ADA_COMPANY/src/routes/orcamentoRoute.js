const express = require('express');
const router = express.Router();
const orcamentoController = require('../controllers/orcamentoController');
const { verifyToken, verifyFuncionarioRole } = require('../middleware/authMiddleware');

// Rotas protegidas por token e papel de funcionário
router.get('/orcamento', verifyToken, verifyFuncionarioRole, orcamentoController.getOrcamento);
router.post('/orcamento', verifyToken, verifyFuncionarioRole, orcamentoController.create);
router.put('/orcamento/:id', verifyToken, verifyFuncionarioRole, orcamentoController.updateOrcamento);
router.delete('/orcamento/:id', verifyToken, verifyFuncionarioRole, orcamentoController.deleteOrcamento);
router.get('/orcamento/:id', verifyToken, verifyFuncionarioRole, orcamentoController.details);

module.exports = router;
