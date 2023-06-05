import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
      <Box sx={{ mx: 2.5, my: 3, display: 'inline-flex' }}>
        GMAO
      </Box>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              S'authentifier
            </Typography>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}/>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
