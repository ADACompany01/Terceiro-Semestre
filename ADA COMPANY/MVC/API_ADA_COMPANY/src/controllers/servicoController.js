var Servico = require('../models/servicoModel');

// Método para listar todos os serviços
exports.getServico = async function (req, res) {
    try {
        const result = await Servico.find().limit(10);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Método para criar um serviço
exports.create = function (req, res) {
    // Valida se todos os campos obrigatórios estão presentes
    const { _id, nome, valor, tipoServico } = req.body;

    if (!_id || !nome || valor === undefined || !tipoServico) {
        return res.status(400).send({ message: "Dados insuficientes para cadastrar o serviço." });
    }

    let servico = new Servico({
        _id,
        nome,
        valor,
        tipoServico
    });

    servico.save()
        .then(() => {
            res.status(201).send(servico.toJSON());  // Envia a resposta após salvar o serviço
        })
        .catch((err) => {
            console.error("Erro ao salvar o serviço:", err);  // Log do erro no console
            if (err.name === 'ValidationError') {
                // Erro de validação
                res.status(400).send({ message: "Erro de validação: " + err.message });
            } else if (err.name === 'MongoNetworkError') {
                // Erro de rede com o MongoDB
                res.status(503).send({ message: "Erro de conexão com o banco de dados." });
            } else {
                // Outros erros
                res.status(500).send({ message: `${err.message} - falha ao cadastrar serviço.` });
            }
        });
};


// Método para atualizar um serviço
exports.updateServico = async function (req, res) {
    try {
        const { id } = req.params; 
        const { nome, valor, tipoServico } = req.body; 

        // Verifica se todos os campos obrigatórios foram fornecidos
        if (!nome || !valor || !tipoServico) {
            return res.status(400).send({ message: 'Os campos "nome", "valor" e "tipoServico" são obrigatórios para atualização.' });
        }

        // Atualiza o serviço e retorna os dados atualizados
        const updatedServico = await Servico.findByIdAndUpdate(id, { nome, valor, tipoServico }, { new: true });

        if (!updatedServico) {
            return res.status(404).send({ message: 'Serviço não encontrado.' });
        }

        return res.status(200).json(updatedServico); 
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao atualizar o serviço.` });
    }
};

// Método para deletar um serviço
exports.deleteServico = async function (req, res) {
    try {
        const { id } = req.params; 

        // Deleta o serviço com o ID fornecido
        const deletedServico = await Servico.findByIdAndDelete(id);

        if (!deletedServico) {
            return res.status(404).send({ message: 'Serviço não encontrado.' });
        }

        return res.status(200).send({ message: 'Serviço deletado com sucesso.' });
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao deletar o serviço.` });
    }
};

// Método para obter detalhes de um serviço pelo ID
exports.details = async function (req, res) {
    try {
        const result = await Servico.findById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};
