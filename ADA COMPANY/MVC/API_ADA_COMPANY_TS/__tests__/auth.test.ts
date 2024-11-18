import request from 'supertest';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from '../src/routes/authRoutes'; // Ajuste o caminho conforme necessário
import config from '../src/config';

const app: Application = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    // Conectar ao banco de dados de teste
    const dbUri = 'mongodb://localhost:27017/test-db';
    await mongoose.connect(dbUri);
  });

  afterAll(async () => {
    // Limpar o banco de dados após os testes
    if (mongoose.connection && mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
      }
    await mongoose.disconnect();
  });

  describe('POST /auth/registerCliente', () => {
    it('Deve registrar um cliente com sucesso', async () => {
      const response = await request(app)
        .post('/auth/registerCliente')
        .send({
          _id: 1, // Deve ser um número, conforme o modelo
          nomeCliente: 'Teste Cliente',
          telefone: '123456789',
          endereco: {
            cep: '12345-678',
            logradouro: 'Rua Teste',
            complemento: '',
            bairro: 'Bairro Teste',
            localidade: 'Cidade Teste',
            uf: 'SP',
            estado: 'São Paulo',
            ddd: '11',
          },
          localizacao: {
            type: 'Point', 
            coordinates: [-46.6333, -23.5505], 
          },
          cnpj: '12.345.678/0001-99',
          usuario: {
            email: 'cliente@teste.com',
            senha: 'senha123',
            tipoUsuario: 'cliente',
            telefone: '987654321',
            nomeCompleto: 'Nome Completo Cliente',
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Cliente registrado com sucesso!');
    });
  });

  describe('POST /auth/registerFuncionario', () => {
    it('Deve registrar um funcionário com sucesso', async () => {
      const response = await request(app)
        .post('/auth/registerFuncionario')
        .send({
          _id: 2, // Deve ser um número, conforme o modelo
          nomeFuncionario: 'Teste Funcionario',
          endereco: {
            cep: '12345-678',
            logradouro: 'Rua Funcionario',
            complemento: '',
            bairro: 'Bairro Funcionario',
            localidade: 'Cidade Funcionario',
            uf: 'SP',
            estado: 'São Paulo',
            ddd: '11',
          },
          cargo: 'Desenvolvedor',
          usuario: {
            email: 'funcionario@teste.com',
            senha: 'senha123',
            tipoUsuario: 'funcionario',
            telefone: '987654321',
            nomeCompleto: 'Nome Completo Funcionario',
          },
          chatBot: [], // De acordo com o modelo de dados, o chatBot é um array
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Funcionário registrado com sucesso!');
    });
  });

  describe('POST /auth/login', () => {
    it('Deve fazer login de um cliente com sucesso', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'cliente@teste.com',
          senha: 'senha123',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBeDefined(); // Verifica se o token foi gerado
    });

    it('Deve fazer login de um funcionário com sucesso', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'funcionario@teste.com',
          senha: 'senha123',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBeDefined(); // Verifica se o token foi gerado
    });
  });
});
