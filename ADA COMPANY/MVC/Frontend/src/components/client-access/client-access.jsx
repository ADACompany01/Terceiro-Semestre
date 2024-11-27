import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import { SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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

export default function ClientAccess(props) {
  const [clienteData, setClienteData] = React.useState(null);
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [open, setOpen] = React.useState(false);
  const [orcamentoData, setOrcamentoData] = React.useState({
    publicoAlvo: '',
    servicos: [],
    prazo: '',
    contato: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setOrcamentoData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://api-ada-company.vercel.app/orcamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orcamentoData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar orçamento');
      }
      handleClickOpen();
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error);
    }
  };

  React.useEffect(() => {
    if (!token) {
      return;
    }

    const fetchClientData = async () => {
      try {
        const decodedToken = decodeToken(token);
        const id = decodedToken?.id; 
        if (!id) {
          throw new Error('Token inválido ou id ausente');
        }

        const response = await fetch(`https://api-ada-company.vercel.app/cliente/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar cliente');
        }
        const data = await response.json();
        setClienteData(data);
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
      }
    };

    fetchClientData();
  }, [token]);

  if (!token) {
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

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4">
            Cliente
          </Typography>
          {clienteData && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Informações:</Typography>
              <TextField label="_id" fullWidth value={formatValue(clienteData._id)} disabled />
              <TextField label="Nome Cliente" fullWidth value={formatValue(clienteData.nomeCliente)} disabled />
              <TextField label="Telefone" fullWidth value={formatValue(clienteData.telefone)} disabled />
              <TextField label="CEP" fullWidth value={formatValue(clienteData.endereco?.[0]?.cep)} disabled />
              <TextField label="Logradouro" fullWidth value={formatValue(clienteData.endereco?.[0]?.logradouro)} disabled />
              <TextField label="Complemento" fullWidth value={formatValue(clienteData.endereco?.[0]?.complemento)} disabled />
              <TextField label="Bairro" fullWidth value={formatValue(clienteData.endereco?.[0]?.bairro)} disabled />
              <TextField label="Localidade" fullWidth value={formatValue(clienteData.endereco?.[0]?.localidade)} disabled />
              <TextField label="UF" fullWidth value={formatValue(clienteData.endereco?.[0]?.uf)} disabled />
              <TextField label="Estado" fullWidth value={formatValue(clienteData.endereco?.[0]?.estado)} disabled />
              <TextField label="DDD" fullWidth value={formatValue(clienteData.endereco?.[0]?.ddd)} disabled />
              <TextField label="CNPJ" fullWidth value={formatValue(clienteData.cnpj)} disabled />
              <TextField label="E-mail do Usuário" fullWidth value={formatValue(clienteData.usuario?.[0]?.email)} disabled />
              <TextField label="Telefone do Usuário" fullWidth value={formatValue(clienteData.usuario?.[0]?.telefone)} disabled />
              <TextField label="Nome Completo do Usuário" fullWidth value={formatValue(clienteData.usuario?.[0]?.nomeCompleto)} disabled />
            </Box>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="publicoAlvo"
              label="Público Alvo"
              name="publicoAlvo"
              autoComplete="publicoAlvo"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Corporativo"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="contato"
              label="Contato"
              name="contato"
              autoComplete="contato"
              onChange={handleChange}
            />
            <Typography variant="h6">Serviços:</Typography>
            <Box>
              <div>
                <input
                  type="checkbox"
                  id="criacaoSite"
                  name="servicos"
                  value="Criação de Site"
                  onChange={handleChange}
                />
                <label htmlFor="criacaoSite">Criação de Site</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="adaptacaoSite"
                  name="servicos"
                  value="Adaptação de Site"
                  onChange={handleChange}
                />
                <label htmlFor="adaptacaoSite">Adaptação de Site</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="consultoria"
                  name="servicos"
                  value="Consultoria"
                  onChange={handleChange}
                />
                <label htmlFor="consultoria">Consultoria</label>
              </div>
            </Box>
            <Button type="submit" fullWidth variant="contained">Enviar Orçamento</Button>
          </Box>
        </Card>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Orçamento Enviado</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Obrigado pelo envio do orçamento, entraremos em contato em breve.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </SignUpContainer>
    </AppTheme>
  );
}

function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}
