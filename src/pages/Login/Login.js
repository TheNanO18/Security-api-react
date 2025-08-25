import React from 'react';
import { Link } from 'react-router-dom';
import { TextField,
         Typography,
         Box,
         CssBaseline,
         Button,
         FormControlLabel,
         Checkbox, }   from '@mui/material';
import backgroundImage from '../../assets/background.jpg';
import { useLogin }    from '../../hooks/useLogin';

function Login() {
  const {
    id,
    password,
    rememberId,
    setId,
    setPassword,
    setRememberId,
    handleSubmit,
  } = useLogin();

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
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          p={4}
          boxSizing="border-box"
        >
          {/* 좌측 고정 로고 */}
          <Box
            position="fixed"
            left={0}
            top="50%"
            sx={{ transform: 'translateY(-50%)' }}
            height={1000}
            width={1000}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="transparent"
            p={2}
          >
            <img
              src="/bonobono.jpg"
              alt="Logo"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </Box>
          {/* 좌측 로고 */}
          <Box
            flexShrink={0}
            mr={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
            width="200px"
          >
            <img src="/gora.png" alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </Box>
          {/* 로그인 폼 */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            width="400px"
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
              Log In
            </Typography>
            <TextField
              label="ID"
              required
              fullWidth
              margin="normal"
              value={id}
              onChange={(e) => setId(e.target.value)} 
              sx={{
                '& .MuiInputBase-root': { backgroundColor: '#fff' },
                '& label': { color: '#1976d2' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#1976d2' },
                  '&:hover fieldset': { borderColor: '#1565c0' },
                  '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                  '& .MuiInputBase-root': { backgroundColor: '#fff' },
                  '& label': { color: '#1976d2' },
                  '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#1976d2' },
                  '&:hover fieldset': { borderColor: '#1565c0' },
                  '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
                },
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              mt={1}
            >
              {/* ◀️ "SIGN IN" 버튼을 "Sign Up"으로 변경하고 Link로 감싸기 */}
              <Button
                component={Link}
                to="/register" // 이동할 경로 지정
                sx={{
                  color: '#115293',
                  textTransform: 'none', // 대문자 변환 제거
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Sign Up
              </Button>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={rememberId}
                    onChange={(e) => setRememberId(e.target.checked)}
                  />
                }
                label="Remember ID"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Login;