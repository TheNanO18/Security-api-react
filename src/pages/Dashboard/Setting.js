import React, { useState, useContext } from 'react'; // ◀️ useContext 임포트
import { DbContext } from '../../context/DbContext';   // ◀️ DbContext 임포트
import {
  Box, Typography, Paper, Stack, TextField, Button, Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function Setting() {
  // DbContext에서 setDbConfig 함수를 가져옵니다.
  const { setDbConfig } = useContext(DbContext);

  // 로컬 state는 사용자가 입력하는 값을 임시로 관리합니다.
  const [dbHost, setDbHost] = useState('localhost:5432/postgres');
  const [dbUser, setDbUser] = useState('postgres');
  const [dbPassword, setDbPassword] = useState('');
  const [alertInfo, setAlertInfo] = useState({ show: false, severity: 'success', message: '' });

  const handleSave = () => {
    // 💥 서버 재시작 로직은 모두 제거합니다.
    // 1. 사용자가 입력한 값으로 새로운 DB 설정 객체를 만듭니다.
    const newDbConfig = {
      url: `jdbc:postgresql://${dbHost}`,
      user: dbUser,
      pass: dbPassword,
    };

    // 2. DbContext의 setDbConfig를 호출하여 전역 상태를 업데이트합니다.
    setDbConfig(newDbConfig);

    // 3. 사용자에게 저장이 완료되었음을 알립니다.
    setAlertInfo({ show: true, severity: 'success', message: 'DB 설정이 앱에 저장되었습니다. 이제 다른 페이지에서 이 설정을 사용합니다.' });
  };

  return (
    <Paper sx={{ /* ... 기존 스타일 ... */ }}>
      <Stack spacing={3}>
        <Typography variant="h5">데이터베이스 설정</Typography>

        <TextField
          label="데이터베이스 호스트/DB명"
          fullWidth
          value={dbHost}
          onChange={(e) => setDbHost(e.target.value)}
        />
        <TextField
          label="User"
          fullWidth
          value={dbUser}
          onChange={(e) => setDbUser(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={dbPassword}
          onChange={(e) => setDbPassword(e.target.value)}
        />

        {alertInfo.show && (
          <Alert severity={alertInfo.severity} onClose={() => setAlertInfo({ show: false })}>
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
