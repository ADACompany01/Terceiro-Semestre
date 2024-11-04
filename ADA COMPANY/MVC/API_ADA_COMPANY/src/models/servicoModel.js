const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let servicoSchema = new Schema({
    _id: {
        type: Number,
        required: [true, "ID é obrigatório e deve ser numérico"]
    },
    nome: {
        type: String,
        required: [true, "Nome é obrigatório"],
        maxlength: [100, "Nome não pode exceder 100 caracteres"]
    },
    valor: {
        type: Number,
        required: [true, "Valor é obrigatório e deve ser numérico"]
    },
    tipoServico: {
        type: String,
        required: [true, "Tipo de serviço é obrigatório"],
        enum: {
            values: ['Venda', 'Serviço'],
            message: "Tipo de serviço deve ser 'Venda' ou 'Serviço'"
        }
    }
});

module.exports = mongoose.model('Servico', servicoSchema);
