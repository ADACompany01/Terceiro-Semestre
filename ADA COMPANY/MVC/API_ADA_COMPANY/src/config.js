require('dotenv').config(); // Certifique-se de carregar as variáveis de ambiente

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'ADACOMPANY', // Use uma chave segura
    // outras configurações...
};