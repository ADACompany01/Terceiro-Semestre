const Cliente = require('../models/clienteModel');
const Funcionario = require('../models/funcionarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar Cliente
exports.registerCliente = async (req, res) => {
    const {
        _id, nomeCliente, telefone, endereco, cnpj, cep, logradouro, complemento, bairro, localidade,
        uf, estado, ddd, localizacao, usuario
    } = req.body;

    try {
        const cliente = new Cliente({
            _id,
            nomeCliente,
            telefone,
            cnpj,
            localizacao,
            usuario,
            endereco: {  // Agrupe os campos de endereço dentro do objeto "endereco"
                cep,
                logradouro,
                complemento,
                bairro,
                localidade,
                uf,
                estado,
                ddd
            },
            localizacao,  // Inclui { type: 'Point', coordinates: [...] }
            usuario
        });
        await cliente.save();
        res.status(201).json({ message: 'Cliente registrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Registrar Funcionário
exports.registerFuncionario = async (req, res) => {
    const {
        _id, nomeFuncionario, cep, logradouro, complemento, bairro, localidade,
        uf, estado, ddd, cargo, idUsuario, chatBot
    } = req.body;

    try {
        const funcionario = new Funcionario({
            _id,
            nomeFuncionario,
            cep,
            logradouro,
            complemento,
            bairro,
            localidade,
            uf,
            estado,
            ddd,
            cargo,
            idUsuario,
            chatBot
        });
        await funcionario.save();
        res.status(201).json({ message: 'Funcionario registrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login de usuário (Cliente ou Funcionário)
// Login de usuário (Cliente ou Funcionário)
exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        let user = await Cliente.findOne({ 'usuario.email': email });
        let tipoUsuario = 'cliente';

        // Log para verificar se o cliente foi encontrado
        console.log("Cliente encontrado:", user);

        if (!user) {
            user = await Funcionario.findOne({ idUsuario: email });
            tipoUsuario = 'funcionario';

            // Log para verificar se o funcionário foi encontrado
            console.log("Funcionário encontrado:", user);
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica a senha do cliente ou funcionário
        const isMatch = await bcrypt.compare(senha, user.usuario ? user.usuario.senha : '');

        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user._id, role: tipoUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error("Erro no login:", err); // Log do erro detalhado
        res.status(500).json({ error: err.message });
    }
};

