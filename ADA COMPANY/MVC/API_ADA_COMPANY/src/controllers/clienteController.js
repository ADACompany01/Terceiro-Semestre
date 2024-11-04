const Cliente = require('../models/clienteModel');

exports.getClientes = async function (req, res) {
    try {
        const result = await Cliente.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: `${err.message} - Falha ao buscar clientes.` });
    }
};

exports.updateCliente = async function (req, res) {
    try {
        const { id } = req.params;

        const updatedCliente = await Cliente.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedCliente) {
            return res.status(404).send({ message: 'Cliente não encontrado.' });
        }

        return res.status(200).json(updatedCliente);
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao atualizar o cliente.` });
    }
};

exports.deleteCliente = async function (req, res) {
    try {
        const { id } = req.params;

        const deletedCliente = await Cliente.findByIdAndDelete(id);

        if (!deletedCliente) {
            return res.status(404).send({ message: 'Cliente não encontrado.' });
        }

        return res.status(200).send({ message: 'Cliente deletado com sucesso.' });
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao deletar o cliente.` });
    }
};

exports.details = async function (req, res) {
    try {
        const result = await Cliente.findById(req.params.id);
        if (!result) {
            return res.status(404).send({ message: 'Cliente não encontrado.' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: `${err.message} - Falha ao buscar detalhes do cliente.` });
    }
};