import * as dotenv from 'dotenv';

// Carregar as variáveis de ambiente
dotenv.config();

interface Config {
  JWT_SECRET: string;
  // Outras variáveis de configuração, se necessário
}

const config: Config = {
  JWT_SECRET: process.env.JWT_SECRET || 'ADACOMPANY', // Use uma chave segura
  // Outras variáveis de configuração...
};

export default config;
