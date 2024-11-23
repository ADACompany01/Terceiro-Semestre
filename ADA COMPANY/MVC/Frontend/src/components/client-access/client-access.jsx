import React from "react";
import { Link } from "react-router-dom"; // Importe o Link do react-router-dom
import styles from "./client.module.css";
import skills from "../../data/client.json";
import { getImageUrl } from "../../utils";
import { Navigate } from 'react-router-dom';
export const AcessoCliente = () => {
  const token1 = result.token;
  localStorage.setItem('token', token);
  localStorage.setItem('token', result.token);
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  localStorage.setItem('userRole', userRole);
  const token = localStorage.getItem('token');
  const [clienteData, setClienteData] = React.useState(null);
  const [clientId, setClientId] = React.useState("");
  if (!token1) {
    return <Navigate to="/signin" />;
  }
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value || '';
  };

  const handleConsultaCliente = async () => {
    try {
      const response = await fetch(`https://api-ada-company.vercel.app/cliente/${userRole}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao buscar cliente');
      }
      const data = await response.json();
      setClienteData(data);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      setClienteData(null);
    }
  };

  return (
    <AppTheme {...props}>
    <CssBaseline enableColorScheme />
    <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
    <SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <SitemarkIcon />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleConsultaCliente}>
            Meus dados
          </Button>
        </Box>
        {clienteData && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Dados do Cliente:</Typography>
            <TextField 
              label="Telefone" 
              fullWidth 
              value={formatValue(clienteData.telefone)} 
              disabled 
            />
            <TextField 
              label="CEP" 
              fullWidth 
              value={formatValue(clienteData.endereco?.[0]?.cep)} 
              disabled 
            />
            <TextField 
              label="Logradouro" 
              fullWidth 
              value={formatValue(clienteData.endereco?.[0]?.logradouro)} 
              disabled 
            />
            <TextField 
              label="Bairro" 
              fullWidth 
              value={formatValue(clienteData.endereco?.[0]?.bairro)} 
              disabled 
            />
            <TextField 
              label="UF" 
              fullWidth 
              value={formatValue(clienteData.endereco?.[0]?.uf)} 
              disabled 
            />
            <TextField 
              label="Estado" 
              fullWidth 
              value={formatValue(clienteData.endereco?.[0]?.estado)} 
              disabled 
            />
            <TextField 
              label="DDD" 
              fullWidth 
              value={formatValue(clienteData.endereco?.[0]?.ddd)} 
              disabled 
            />
            <TextField 
              label="Email" 
              fullWidth 
              value={formatValue(clienteData.usuario?.[0]?.email)} 
              disabled 
            />
            <TextField 
              label="Telefone do Usuário" 
              fullWidth 
              value={formatValue(clienteData.usuario?.[0]?.telefone)} 
              disabled 
            />
            <TextField 
              label="Nome Completo do Usuário" 
              fullWidth 
              value={formatValue(clienteData.usuario?.[0]?.nomeCompleto)} 
              disabled 
            />
          </Box>
        )}
      </Card>
      <Divider>
        <Typography sx={{ color: 'text.secondary' }}>ou</Typography>
      </Divider>
    </SignUpContainer>
  </AppTheme>
  );
};
