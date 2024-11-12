import express, { Request, Response, Router } from 'express';
import { registerCliente, registerFuncionario, loginUser } from '../controllers/authController';

const router: Router = express.Router();

// Rota para registro de Clientes
router.post('/registerCliente', async (req: Request, res: Response) => {
  try {
    const result = await registerCliente(req, res);  // Espera um objeto { status, message }
    res.status(result.status).json(result);  // Responde com status e a mensagem
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido' });
    }
  }
});

// Rota para registro de Funcionários
router.post('/registerFuncionario', async (req: Request, res: Response) => {
  try {
    const result = await registerFuncionario(req, res);  // Espera um objeto { status, message }
    res.status(result.status).json(result);  // Responde com status e a mensagem
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido' });
    }
  }
});

// Rota para login (tanto de Clientes quanto Funcionários)
router.post('/login', async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req);  // Agora passa apenas `req`
    res.status(result.status).json(result);  // Responde com status e a mensagem
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido' });
    }
  }
});

export default router;
