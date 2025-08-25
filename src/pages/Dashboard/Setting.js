import React from 'react';
import {
  Box, Typography, Paper, Stack, TextField, Button, Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSetting } from '../../hooks/useSetting'; 
function Setting() {
  // ✨ 2. useSetting 훅을 호출하여 필요한 모든 것을 한번에 가져옵니다.
  const {
    dbHost,
    dbUser,
    dbPassword,
    alertInfo,
    setDbHost,
    setDbUser,
    setDbPassword,
    setAlertInfo,
    handleSave,
  } = useSetting();

  // ✨ 3. JSX 부분은 거의 그대로 유지됩니다. 로직이 모두 사라져 깔끔해졌습니다.
  return (
    <Paper sx={{ backgroundColor: 'transparent', boxShadow: 'none', padding: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h5" sx={{ color: 'white' }}>
          데이터베이스 설정
        </Typography>

        <TextField
          label="데이터베이스 호스트/DB명"
          fullWidth
          value={dbHost}
          onChange={(e) => setDbHost(e.target.value)}
          sx={{
            '& label': { color: 'rgba(255, 255, 255, 0.9)' },
            '& .MuiInputBase-root': { backgroundColor: 'rgba(105, 94, 94, 0.9)' },
            '& label.Mui-focused': { color: 'rgba(0, 4, 255, 1)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.7)' },
              '&:hover fieldset': { borderColor: 'white' },
            },
          }}
        />
        <TextField
          label="User"
          fullWidth
          value={dbUser}
          onChange={(e) => setDbUser(e.target.value)}
          sx={{
            '& label': { color: 'rgba(255, 255, 255, 0.9)' },
            '& .MuiInputBase-root': { backgroundColor: 'rgba(105, 94, 94, 0.9)' },
            '& label.Mui-focused': { color: 'rgba(0, 4, 255, 1)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.7)' },
              '&:hover fieldset': { borderColor: 'white' },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={dbPassword}
          onChange={(e) => setDbPassword(e.target.value)}
          sx={{
            '& label': { color: 'rgba(255, 255, 255, 0.9)' },
            '& .MuiInputBase-root': { backgroundColor: 'rgba(105, 94, 94, 0.9)' },
            '& label.Mui-focused': { color: 'rgba(0, 4, 255, 1)' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.7)' },
              '&:hover fieldset': { borderColor: 'white' },
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
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Setting Save
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default Setting;