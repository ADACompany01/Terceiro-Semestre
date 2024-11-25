import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
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
  height: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUpOrcamento(props) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signin" />;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Coleta os dados do formulário
    const data = new FormData(event.currentTarget);
    const formData = {
      _id: parseInt(data.get('_id')),
      clienteId: parseInt(data.get('clienteId')),
      validadeOrcamento: data.get('validadeOrcamento'),
      dataCriacao: data.get('dataCriacao'),
      valorTotal: parseFloat(data.get('valorTotal')),
      tipoServico: data.get('tipoServico'), 
      statusOrcamento: data.get('statusOrcamento'),
      descricao: data.get('descricao'),
      emailVendedor: data.get('emailVendedor'),
    };

    try {
      const response = await fetch('https://api-ada-company.vercel.app/registerOrcamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

   
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao cadastrar orçamento: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Orçamento cadastrado com sucesso:', result);
      alert('Orçamento cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      alert(`Erro ao cadastrar orçamento: ${error.message}`);
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
            Cadastrar Orçamento
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="_id">ID</FormLabel>
              <TextField name="_id" required fullWidth id="_id" type="number" placeholder="123" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="clienteId">ID do Cliente</FormLabel>
              <TextField name="clienteId" required fullWidth id="clienteId" type="number" placeholder="456" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="validadeOrcamento">Validade do Orçamento</FormLabel>
              <TextField name="validadeOrcamento" required fullWidth id="validadeOrcamento" type="date" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dataCriacao">Data de Criação</FormLabel>
              <TextField name="dataCriacao" required fullWidth id="dataCriacao" type="date" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="valorTotal">Valor Total</FormLabel>
              <TextField name="valorTotal" required fullWidth id="valorTotal" type="number" placeholder="1000" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tipoServico">Tipo de Serviço</FormLabel>
              <Select name="tipoServico" required fullWidth id="tipoServico">
                <MenuItem value="Venda">Venda</MenuItem>
                <MenuItem value="Serviço">Serviço</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="statusOrcamento">Status do Orçamento</FormLabel>
              <TextField name="statusOrcamento" required fullWidth id="statusOrcamento" placeholder="Pendente" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="descricao">Descrição</FormLabel>
              <TextField name="descricao" required fullWidth id="descricao" placeholder="Descrição do serviço" multiline rows={4} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="emailVendedor">Email do Vendedor</FormLabel>
              <TextField name="emailVendedor" required fullWidth id="emailVendedor" placeholder="vendedor@email.com" />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Cadastrar Orçamento
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
