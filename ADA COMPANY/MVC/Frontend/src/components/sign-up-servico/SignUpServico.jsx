import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Navigate } from 'react-router-dom';

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
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '1000px',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUpServico(props) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signin" />;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const servicoData = {
      _id: data.get('_id'),
      nome: data.get('nome'),
      valor: data.get('valor'),
      tipoServico: data.get('tipoServico'),
    };

    try {
      const response = await fetch('https://api-ada-company.vercel.app/servico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(servicoData),
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log('Serviço cadastrado com sucesso:', result);
        alert('Serviço cadastrado com sucesso!');
      } else {
        console.error('Erro ao cadastrar serviço:', response.statusText);
        alert('Erro ao cadastrar serviço.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao cadastrar serviço.');
    }
    
  }; 
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4">
            Cadastrar Serviço
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="_id">ID</FormLabel>
              <TextField name="_id" required fullWidth id="_id" placeholder="ID" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nome">Nome do Cliente</FormLabel>
              <TextField name="nome" required fullWidth id="nome" placeholder="Nome" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="valor">Valor</FormLabel>
              <TextField name="valor" required fullWidth id="valor" placeholder="R$" />
            </FormControl>
            <FormLabel htmlFor="tipoServico">Tipo de Serviço</FormLabel>
            <FormControl>
              <Select
                name="tipoServico"
                required
                fullWidth
                id="tipoServico"
                defaultValue=""
              >
                <MenuItem value="Venda">Venda</MenuItem>
                <MenuItem value="Servico">Serviço</MenuItem>
              </Select>
              </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Cadastrar
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>ou</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Login com Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
              Login com Facebook
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
