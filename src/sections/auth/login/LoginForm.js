import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import Axios from 'axios';

import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    Email: '',
    MotDePasse: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
      Axios.post("http://localhost:3001/auth/login", values)
      .then((response) => {
        console.log(response.status);
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("Successfully Logged in!!");
          navigate('/dashboard', { replace: true });
      }).catch((err) => {
        setTimeout(() => {
          alert(err.response.data.message);
        }, 1000);
      });

    };
    
    
    
    

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address"
          value={values.email}
          onChange={(e) => setValues({ ...values, Email: e.target.value })}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={(e) => setValues({ ...values, MotDePasse: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}/>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
