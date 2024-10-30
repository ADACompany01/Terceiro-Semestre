import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../shared-theme/ColorModeSelect';

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
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function ListClient(props) {
  const [userData, setUserData] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  // Fetch JSON data and populate TextFields
  React.useEffect(() => {
    // Simulação de chamada à API
    const fetchUserData = async () => {
      const response = await fetch('https://api-ada-company.vercel.app/cliente'); // Substitua pelo caminho real da sua API
      const data = await response.json();
      setUserData({
        name: data.name,
        email: data.email,
        password: data.password
      });
    };

    fetchUserData();
  }, []);


  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
        <div>
      {userData && (
        <>
          {/* Dados do endereço */}
          <TextField label="CEP" value={userData.endereco.cep} />
          <TextField label="Logradouro" value={userData.endereco.logradouro} />
          {/* ... outros campos do endereço ... */}

          {/* Dados do usuário */}
          <TextField label="Nome Completo" value={userData.usuario.nomeCompleto} />
          <TextField label="Email" value={userData.usuario.email} />
          {/* ... outros campos do usuário ... */}

          {/* Outros dados */}
          <TextField label="Nome do Cliente" value={userData.nomeCliente} />
          <TextField label="CNPJ" value={userData.cnpj} />
        </>
      )}
    </div>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
