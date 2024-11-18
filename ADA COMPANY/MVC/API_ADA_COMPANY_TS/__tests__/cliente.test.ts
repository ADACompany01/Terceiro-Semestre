import request from 'supertest';
import app from '../index';
import Cliente from '../src/models/clienteModel';
import mongoose from 'mongoose';
import { gerarTokenValido } from '../src/middleware/auth';
import dotenv from 'dotenv';

dotenv.config();

describe('Testes do endpoint /cliente', () => {
  let token: string;

  beforeAll(async () => {
    try {
      const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb';
      await mongoose.connect(dbUri);
      token = gerarTokenValido();
      console.log('Conexão com o banco de dados estabelecida');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
    }
  });

  afterAll(async () => {
    try {
      await Cliente.deleteMany({});
      await mongoose.disconnect();
      console.log('Conexão com o banco de dados encerrada');
    } catch (error) {
      console.error('Erro ao desconectar do banco de dados:', error);
    }
  });

  beforeEach(async () => {
    try {
      await Cliente.deleteMany({});
      await Cliente.create({
        _id: 900,
        nomeCliente: 'Cliente Teste 1',
        telefone: '123456789',
        endereco: {
          cep: '12345-678',
          logradouro: 'Rua Teste',
          complemento: 'Apto 1',
          bairro: 'Bairro Teste',
          localidade: 'Cidade Teste',
          uf: 'SP',
          estado: 'São Paulo',
          ddd: '11',
        },
        localizacao: {
          type: 'Point',
          coordinates: [-46.633309, -23.55052],
        },
        cnpj: '12.345.678/0001-99',
        usuario: {
          email: 'cliente1@example.com',
          senha: 'senha123',
          tipoUsuario: 'cliente',
          telefone: '987654321',
          nomeCompleto: 'Cliente Teste 1',
        },
      });
      console.log('Cliente de teste criado');
    } catch (error) {
      console.error('Erro ao criar cliente de teste:', error);
    }
  });

  it('Deve retornar todos os clientes', async () => {
    const res = await request(app)
      .get('/cliente')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].nomeCliente).toBe('Cliente Teste 1');
  });

  it('Deve atualizar um cliente existente', async () => {
    const cliente = await Cliente.findOne({ nomeCliente: 'Cliente Teste 1' });

    if (!cliente) {
      throw new Error('Cliente não encontrado. Certifique-se de que o cliente foi criado antes de executar este teste.');
    }

    const res = await request(app)
      .put(`/cliente/${cliente._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nomeCliente: 'Cliente Atualizado' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Cliente atualizado com sucesso!');
  });

  it('Deve retornar 404 se o cliente não for encontrado', async () => {
    const res = await request(app)
      .put('/cliente/000000000000000000000000') // ID inexistente
      .set('Authorization', `Bearer ${token}`)
      .send({ nomeCliente: 'Cliente Inexistente' });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Cliente não encontrado');
  });

  it('Deve excluir um cliente', async () => {
    const cliente = await Cliente.findOne({ nomeCliente: 'Cliente Teste 1' });

    if (!cliente) {
      throw new Error('Cliente não encontrado. Certifique-se de que o cliente foi criado antes de executar este teste.');
    }

    const res = await request(app)
      .delete(`/cliente/${cliente._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Cliente excluído com sucesso');
  });

  it('Deve retornar 404 ao tentar excluir um cliente inexistente', async () => {
    const res = await request(app)
      .delete('/cliente/000000000000000000000000') // ID inexistente
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Cliente não encontrado');
  });
});
