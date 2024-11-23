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
  height: '2000px',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUpFuncionario(props) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signin" />;
  }

  const [endereco, setEndereco] = React.useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    estado: '',
    ddd: ''
  });


  const buscarEndereco = async (cep) => {
    if (!cep) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }


      setEndereco({
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        localidade: data.localidade || '',
        uf: data.uf || '',
        estado: data.estado || '', 
        ddd: data.ddd || ''
      });
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      alert('Erro ao buscar o endereço.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const funcionarioData = {
      _id: Number(data.get('_id')),
      nomeFuncionario: data.get('nomeFuncionario'),
      endereco: {
        cep: data.get('cep'),
        logradouro: endereco.logradouro,
        complemento: data.get('complemento'),
        bairro: endereco.bairro,
        localidade: endereco.localidade,
        uf: endereco.uf,
        estado: endereco.estado,
        ddd: endereco.ddd
      },
      cargo: data.get('cargo'),
      usuario: {
        email: data.get('email'),
        senha: data.get('senha'),
        tipoUsuario: 'admin',
        telefone: data.get('telefone'),
        nomeCompleto: data.get('nomeCompleto')
      },
      chatBot: [
        {
          id_chatbot: 1, // Exemplo de valor fixo
          texto_chat: "Mensagem de teste", // Exemplo de valor fixo
          data: new Date().toISOString() // Data atual
        }
      ]
    };

    try {
      const response = await fetch('https://api-ada-company.vercel.app/api/auth/registerFuncionario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionarioData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Funcionário cadastrado com sucesso:', result);
        alert('Funcionário cadastrado com sucesso!');
      } else {
        console.error('Erro ao cadastrar funcionário:', response.statusText);
        alert('Erro ao cadastrar funcionário.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao cadastrar funcionário.');
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
            Cadastrar Funcionário
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="_id">ID</FormLabel>
              <TextField name="_id" required fullWidth id="_id" placeholder="ID" type="number" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nomeFuncionario">Nome do Funcionário</FormLabel>
              <TextField name="nomeFuncionario" required fullWidth id="nomeFuncionario" placeholder="Nome" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="cep">CEP</FormLabel>
              <TextField
                name="cep"
                required
                fullWidth
                id="cep"
                placeholder="CEP"
                onBlur={(e) => buscarEndereco(e.target.value)} // Ao sair do campo, chama a função para preencher o endereço
              />
            </FormControl>

            {/* Campos de Endereço preenchidos automaticamente */}
            <FormControl>
              <FormLabel htmlFor="logradouro">Logradouro</FormLabel>
              <TextField
                name="logradouro"
                required
                fullWidth
                id="logradouro"
                placeholder="Logradouro"
                value={endereco.logradouro}
                onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="complemento">Complemento</FormLabel>
              <TextField name="complemento" fullWidth id="complemento" placeholder="Complemento" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="bairro">Bairro</FormLabel>
              <TextField
                name="bairro"
                required
                fullWidth
                id="bairro"
                placeholder="Bairro"
                value={endereco.bairro}
                onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="localidade">Localidade</FormLabel>
              <TextField
                name="localidade"
                required
                fullWidth
                id="localidade"
                placeholder="Localidade"
                value={endereco.localidade}
                onChange={(e) => setEndereco({ ...endereco, localidade: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="uf">UF</FormLabel>
              <TextField
                name="uf"
                required
                fullWidth
                id="uf"
                placeholder="UF"
                value={endereco.uf}
                onChange={(e) => setEndereco({ ...endereco, uf: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="estado">Estado</FormLabel>
              <TextField
                name="estado"
                required
                fullWidth
                id="estado"
                placeholder="Estado"
                value={endereco.estado}
                onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="ddd">DDD</FormLabel>
              <TextField
                name="ddd"
                required
                fullWidth
                id="ddd"
                placeholder="DDD"
                value={endereco.ddd}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="cargo">Cargo</FormLabel>
              <TextField name="cargo" required fullWidth id="cargo" placeholder="Cargo" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField name="email" required fullWidth id="email" placeholder="Email" type="email" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="senha">Senha</FormLabel>
              <TextField name="senha" required fullWidth id="senha" placeholder="Senha" type="password" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="telefone">Telefone</FormLabel>
              <TextField name="telefone" required fullWidth id="telefone" placeholder="Telefone" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nomeCompleto">Nome Completo</FormLabel>
              <TextField name="nomeCompleto" required fullWidth id="nomeCompleto" placeholder="Nome Completo" />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Cadastrar Funcionário
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
