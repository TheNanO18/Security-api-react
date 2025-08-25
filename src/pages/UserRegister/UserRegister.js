// src/pages/UserRegister/UserRegister.js

import React from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Typography,
  Box,
  CssBaseline,
  Button,
} from '@mui/material';
// ◀️ 현재 파일 위치를 기준으로 상대 경로를 다시 한번 확인하고 수정했습니다.
import backgroundImage from '../../assets/background.jpg'; 
import { useRegister } from '../../hooks/useRegister';

function UserRegister() {
  const {
    id,
    password,
    confirmPassword,
    setId,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  } = useRegister();

  // TextField에 재사용될 스타일 객체
  const textFieldStyles = {
    '& .MuiInputBase-root': { backgroundColor: '#fff' },
    '& label': { color: '#1972d2' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#1972d2' },
      '&:hover fieldset': { borderColor: '#1565c0' },
      '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
    },
  };

  return (
    <>
      <CssBaseline />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          width="400px"
          display="flex"
          flexDirection="column"
          alignItems="center" 
          p={4}
          borderRadius={2}
          bgcolor="rgba(255, 255, 255, 0.8)"
          boxShadow={3}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#1972d2', alignSelf: 'center' }}>
            Sign Up
          </Typography>
          <TextField
            label="ID"
            required
            fullWidth
            margin="normal"
            value={id}
            onChange={(e) => setId(e.target.value)}
            sx={textFieldStyles}
          />
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={textFieldStyles}
          />
          <TextField
            label="Confirm Password"
            type="password"
            required
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={textFieldStyles}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Create Account
          </Button>
          <Button
            component={Link}
            to="/login"
            fullWidth
            sx={{ color: '#115293' }}
          >
            Back to Log In
          </Button>
        </Box>
      </div>
    </>
  );
}

export default UserRegister;
