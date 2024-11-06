const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Adicionado bcrypt para hashing
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    _id: {type: Number, required: true},
    nomeCliente: { type: String, required: true, max: 100 },
    telefone: { type: String, required: true },
    endereco: {
        cep: { type: String, required: true },
        logradouro: { type: String, required: true },
        complemento: { type: String },
        bairro: { type: String, required: true },
        localidade: { type: String, required: true },
        uf: { type: String, required: true },
        estado: { type: String, required: true },
        ddd: { type: String, required: true }
    },
    localizacao: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    cnpj: { type: String, required: true },
    usuario: {
        email: { type: String, required: true, unique: true },
        senha: { type: String, required: true, minlength: 6 }, // Adicionado minlength
        tipoUsuario: { type: String, required: true, enum: ['cliente', 'admin'] },
        telefone: { type: String, required: true },
        nomeCompleto: { type: String, required: true }
    }
});

// Middleware para hash de senha
clienteSchema.pre('save', async function (next) {
    if (!this.isModified('usuario.senha')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.usuario.senha = await bcrypt.hash(this.usuario.senha, salt);
    next();
});

module.exports = mongoose.model('Cliente', clienteSchema);
