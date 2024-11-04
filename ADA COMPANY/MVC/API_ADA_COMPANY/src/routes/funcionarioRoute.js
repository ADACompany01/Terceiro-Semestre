const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');


router.get('/funcionario',  funcionarioController.getFuncionarios); 
router.put('/funcionario/:id', funcionarioController.updateFuncionario);
router.delete('/funcionario/:id', funcionarioController.deleteFuncionario);
router.get('/funcionario/:id', funcionarioController.getFuncionarioById);

module.exports = router;
