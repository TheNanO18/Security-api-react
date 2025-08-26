import React from 'react';
import { Link } from 'react-router-dom';
import { TextField,
         Typography,
         Box,
         CssBaseline,
         Button,
         FormControlLabel,
         Checkbox, Alert,
        Stack }   from '@mui/material';
import backgroundImage from '../../assets/background.jpg';
import ezis_logo_white from '../../assets/ezis_logo_white.svg';
import { useSetting }  from '../../hooks/useSetting';
import { useLogin }    from '../../hooks/useLogin';

import SaveIcon                from '@mui/icons-material/Save';



function Login() {
  const {
    dbHost, dbUser, dbPassword, alertInfo,
    setDbHost, setDbUser, setDbPassword, setAlertInfo,
    handleSave,
  } = useSetting();

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
          backgroundImage   : `url(${backgroundImage})`,
          backgroundSize    : 'cover',
          backgroundPosition: 'center',
          height            : '100vh',
          width             : '100vw',
          display           : 'flex',
          alignItems        : 'center',
          justifyContent    : 'space-between',
        }}
      >
        <Box 
          sx={{ 
            // flex: 1 대신 명시적인 너비 지정
            width          : '450px', 
            maxWidth       : '500px',
            padding        : '2rem',
            borderRadius   : '8px', // 모서리 둥글게
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h5" sx={{ color: 'white' }}>
              Database Setting
            </Typography>
            <TextField
              label="Database Host / DB Name"
              fullWidth
              value={dbHost}
              onChange={(e) => setDbHost(e.target.value)}

              sx={{
                '& label'                 : { color: 'rgba(255, 255, 255, 0.9)' },
                '& .MuiInputBase-root'    : { color: 'white', backgroundColor: 'rgba(105, 94, 94, 0.9)' },
                '& label.Mui-focused'     : { color: 'rgba(138, 180, 248, 1)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset'            : { borderColor: 'rgba(255, 255, 255, 0.7)' },
                  '&:hover fieldset'      : { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'rgba(138, 180, 248, 1)' },
                },
              }}
            />
            <TextField
              label="User"
              fullWidth
              value={dbUser}
              onChange={(e) => setDbUser(e.target.value)}

              sx={{
                '& label'                 : { color: 'rgba(255, 255, 255, 0.9)' },
                '& .MuiInputBase-root'    : { color: 'white', backgroundColor: 'rgba(105, 94, 94, 0.9)' },
                '& label.Mui-focused'     : { color: 'rgba(138, 180, 248, 1)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset'            : { borderColor: 'rgba(255, 255, 255, 0.7)' },
                  '&:hover fieldset'      : { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'rgba(138, 180, 248, 1)' },
                },
              }}
            />
            <TextField
              label="Password"
              type ="password"
              fullWidth
              value={dbPassword}
              onChange={(e) => setDbPassword(e.target.value)}

              sx={{
                '& label'                 : { color: 'rgba(255, 255, 255, 0.9)' },
                '& .MuiInputBase-root'    : { color: 'white', backgroundColor: 'rgba(105, 94, 94, 0.9)' },
                '& label.Mui-focused'     : { color: 'rgba(138, 180, 248, 1)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset'            : { borderColor: 'rgba(255, 255, 255, 0.7)' },
                  '&:hover fieldset'      : { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'rgba(138, 180, 248, 1)' },
                },
              }}
            />
            {alertInfo.show && (
              <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ ...alertInfo, show: false })}>
                {alertInfo.message}
              </Alert>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant  ="contained"
                startIcon={<SaveIcon />}
                onClick  ={handleSave}

                sx={{ textTransform: 'none' }}
              >
                Setting Save
              </Button>
            </Box>
          </Stack>
        </Box>

        <Box
          display       ="flex"
          flexDirection ="row"
          alignItems    ="center"
          justifyContent="flex-end"
          p             ={4}
          boxSizing     ="border-box"
        >
          {/* 좌측 로고 */}
          <Box
            flexShrink    ={0}
            mr            ={4}
            display       ="flex"
            justifyContent="center"
            alignItems    ="center"
            height        ="200px"
            width         ="200px"
          >
            <img src={ezis_logo_white} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </Box>
          {/* 로그인 폼 */}
          <Box
            component    ="form"
            onSubmit     ={handleSubmit}
            width        ="400px"
            display      ="flex"
            flexDirection="column"
            alignItems   ="flex-end"
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
                '& .MuiInputBase-root'    : { backgroundColor: '#fff' },
                '& label'                 : { color: '#1976d2' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset'            : { borderColor: '#1976d2' },
                  '&:hover fieldset'      : { borderColor: '#1565c0' },
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
                '& .MuiInputBase-root'     : { backgroundColor: '#fff' },
                '& label'                  : { color: '#1976d2' },
                '& .MuiOutlinedInput-root' : {
                  '& fieldset'             : { borderColor: '#1976d2' },
                  '&:hover fieldset'       : { borderColor: '#1565c0' },
                  '&.Mui-focused fieldset' : { borderColor: '#0d47a1' },
                },
              }}
            />
            <Box
              display       ="flex"
              justifyContent="space-between"
              alignItems    ="center"
              width         ="100%"
              mt            ={1}
            >
              {/* ◀️ "SIGN IN" 버튼을 "Sign Up"으로 변경하고 Link로 감싸기 */}
              <Button
                component={Link}
                to="/register" // 이동할 경로 지정
                sx={{
                  color            : '#115293',
                  textTransform    : 'none', // 대문자 변환 제거
                  '&:hover'        : {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Sign Up
              </Button>
              <FormControlLabel
                control={
                  <Checkbox
                    value   ="remember"
                    color   ="primary"
                    checked ={rememberId}
                    onChange={(e) => setRememberId(e.target.checked)}
                  />
                }
                label="Remember ID"
                sx={{color: 'white'}}
              />
            </Box>
            <Button
              type   ="submit"
              variant="contained"
              color  ="primary"
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