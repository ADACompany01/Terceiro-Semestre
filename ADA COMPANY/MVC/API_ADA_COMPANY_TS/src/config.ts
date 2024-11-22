import * as dotenv from 'dotenv';

// Carregar as variáveis de ambiente
dotenv.config();

interface Config {
  MONGODB_URI: string,
  JWT_SECRET: string;
  // Outras variáveis de configuração, se necessário
}

const config: Config = {
  MONGODB_URI: process.env.MONGODB_URI || '', //Garantir que as variáveis existam no .env
  JWT_SECRET: process.env.JWT_SECRET || '',  
};

if(!config.MONGODB_URI || !config.JWT_SECRET) {
  throw new Error('Faltam variáveis de ambiente essencias no arquivo .env');
}

export default config;
