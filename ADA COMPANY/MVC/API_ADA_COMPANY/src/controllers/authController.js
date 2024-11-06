const Cliente = require('../models/clienteModel');
const Funcionario = require('../models/funcionarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const config = require('../config')

// Carrega as variáveis de ambiente
dotenv.config();

// Registrar Cliente
exports.registerCliente = async (req, res) => {
    const {
        _id, nomeCliente, telefone,
        endereco: { cep, logradouro, complemento, bairro, localidade, uf, estado, ddd },localizacao,
        cnpj,
        usuario: { email, senha, tipoUsuario, telefone: telefoneUsuario, nomeCompleto }
    } = req.body;

    try {
        const cliente = new Cliente({
            _id,
            nomeCliente,
            telefone,
            endereco: {
                cep,
                logradouro,
                complemento,
                bairro,
                localidade,
                uf,
                estado,
                ddd,
            },
            localizacao,
            cnpj,
            usuario: {
                email,
                senha,
                tipoUsuario,
                telefone: telefoneUsuario,
                nomeCompleto
            }
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
        _id, nomeFuncionario,
        endereco: { cep, logradouro, complemento, bairro, localidade, uf, estado, ddd },
        cargo,
        usuario: { email, senha, tipoUsuario, telefone: telefoneUsuario, nomeCompleto },
        chatBot
    } = req.body;

    try {
        const funcionario = new Funcionario({
            _id,
            nomeFuncionario,
            endereco: {
                cep,
                logradouro,
                complemento,
                bairro,
                localidade,
                uf,
                estado,
                ddd
            },
            cargo,
            usuario: {
                email,
                senha,
                tipoUsuario,
                telefone: telefoneUsuario,
                nomeCompleto
            },
            chatBot
        });

        await funcionario.save();
        res.status(201).json({ message: 'Funcionário registrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Login de usuário (Cliente ou Funcionário)
exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        let user = await Cliente.findOne({ 'usuario.email': email });
        let tipoUsuario = 'cliente';

        if (!user) {
            user = await Funcionario.findOne({ 'usuario.email': email });
            tipoUsuario = 'funcionario';
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica se o campo de senha existe e é uma string
        if (!user.usuario || !user.usuario.senha) {
            return res.status(500).json({ message: 'Senha não encontrada para este usuário' });
        }

        // Verifica a senha do cliente ou funcionário
        const isMatch = await bcrypt.compare(senha, user.usuario.senha);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Gera o token JWT com o papel do usuário
        const token = jwt.sign({ id: user._id, role: tipoUsuario }, config.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).json({ error: err.message });
    }
};