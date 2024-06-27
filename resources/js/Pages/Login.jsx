import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react'
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import { useForm } from '@inertiajs/react'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'© '}
      <Link color="inherit" href="https://ilovebrides.pt/">
        I Love Brides
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  // const { errors } = usePage().props;

  const handleSubmit = (event) => {
    // setLoading(true)
    event.preventDefault();

    // const data = new FormData(event.currentTarget);

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    post('/login')
    // setLoading(false)
    // console.log(sla)
  };

  // function handleChange(e) {
  //   const key = e.target.id;
  //   const value = e.target.value
  //   setData(values => ({
  //       ...values,
  //       [key]: value,
  //   }))
  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src='./main-logo.svg' height={100} />

          <Typography component="h1" variant="h5" sx={{my: 1}}>
            Paínel Administrativo
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              value={data.email}
              autoFocus
              onChange={e => setData('email', e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar-me"
            />
            {
              processing ? 
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled
                startIcon={<CircularProgress color="inherit" size={20} />}
              >
                Login
              </Button>
              :
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            }

            {
              errors.email &&
              <Alert severity="warning">
              {errors.email}
              </Alert>
            }

          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}