import React from "react";
import { Link } from "react-router-dom"; 
import styles from "./client.module.css";
import { getImageUrl } from "../../utils";
import { Navigate } from 'react-router-dom';
import AppTheme from '../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { jwtDecode } from 'jwt-decode';



const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export const AcessoCliente = () => {
  const token = localStorage.getItem('token');
  const [clienteData, setClienteData] = React.useState(null);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;// Assuming the user ID is stored as 'id' in the token
  localStorage.setItem('userRole', userRole);

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

  React.useEffect(() => {
    handleConsultaCliente();
  }, []); // Call handleConsultaCliente once on component mount


  return (
    <AppTheme>
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
                value={formatValue(clienteData.endereco?.cep)}
                disabled
              />
              <TextField
                label="Logradouro"
                fullWidth
                value={formatValue(clienteData.endereco?.logradouro)}
                disabled
              />
              <TextField
                label="Bairro"
                fullWidth
                value={formatValue(clienteData.endereco?.bairro)}
                disabled
              />
              <TextField
                label="UF"
                fullWidth
                value={formatValue(clienteData.endereco?.uf)}
                disabled
              />
              <TextField
                label="Estado"
                fullWidth
                value={formatValue(clienteData.endereco?.estado)}
                disabled
              />
              <TextField
                label="DDD"
                fullWidth
                value={formatValue(clienteData.endereco?.ddd)}
                disabled
              />
              <TextField
                label="Email"
                fullWidth
                value={formatValue(clienteData.usuario?.email)}
                disabled
              />
              <TextField
                label="Telefone do Usuário"
                fullWidth
                value={formatValue(clienteData.usuario?.telefone)}
                disabled
              />
              <TextField
                label="Nome Completo do Usuário"
                fullWidth
                value={formatValue(clienteData.usuario?.nomeCompleto)}
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