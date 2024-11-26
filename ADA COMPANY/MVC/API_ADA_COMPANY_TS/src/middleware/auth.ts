import jwt from 'jsonwebtoken';

export const gerarTokenValido = (): string => {
    const payload = { id: '123', role: 'admin' }; // Altere conforme necessário
    const secret = process.env.JWT_SECRET || ''; // Garanta que o secret seja o mesmo do usado pela API
    return jwt.sign(payload, secret, { expiresIn: '1h' });
};