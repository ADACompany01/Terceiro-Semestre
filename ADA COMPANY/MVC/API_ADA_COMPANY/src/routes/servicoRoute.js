const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');
const { verifyToken, verifyFuncionarioRole } = require('../middleware/authMiddleware');

// Rotas protegidas por token e papel de funcionário
router.get('/servico', verifyToken, verifyFuncionarioRole, servicoController.getServico);
router.post('/servico', verifyToken, verifyFuncionarioRole, servicoController.create);
router.put('/servico/:id', verifyToken, verifyFuncionarioRole, servicoController.updateServico);
router.delete('/servico/:id', verifyToken, verifyFuncionarioRole, servicoController.deleteServico);
router.get('/servico/:id', verifyToken, verifyFuncionarioRole, servicoController.details);

module.exports = router;
