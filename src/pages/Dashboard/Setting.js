import React from 'react';
import {
  Box, Typography, 
  Paper, Stack, 
  TextField, Button, 
  Alert,
} from '@mui/material';
import SaveIcon                from '@mui/icons-material/Save';
import PlayArrowIcon           from '@mui/icons-material/PlayArrow';
import StopIcon                from '@mui/icons-material/Stop';
import CheckCircleOutlineIcon  from '@mui/icons-material/CheckCircleOutline';
import { useSetting }          from '../../hooks/useSetting';
import { useServerManagement } from '../../hooks/useServerManagement';

function Setting() {
  // DB 설정 관련 로직
  const {
    dbHost, dbUser, dbPassword, alertInfo,
    setDbHost, setDbUser, setDbPassword, setAlertInfo,
    handleSave,
  } = useSetting();

  // 서버 관리 관련 로직
  const {
    handleServerStart,
    handleServerStop,
    handleServerStatus,
  } = useServerManagement();

  return (
    <Paper sx={{ backgroundColor: 'transparent', boxShadow: 'none', padding: 3 }}>
      <Box sx={{ display: 'flex', gap: 4 }}>

        {/* 왼쪽 영역 (DB 설정) */}
        <Box sx={{ flex: 1 }}>
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

        {/* 오른쪽 영역 (서버 관리) */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            <Typography variant="h5" sx={{ color: 'white' }}>
              Server Management
            </Typography>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Button
                variant  ="contained"
                color    ="success"
                startIcon={<PlayArrowIcon />}
                onClick  ={handleServerStart}

                sx       ={{ textTransform: 'none' }}
              >
                Server Start
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<StopIcon />}
                onClick={handleServerStop}

                sx={{ textTransform: 'none' }}
              >
                Server Stop
              </Button>
              <Button
                variant="outlined"
                startIcon={<CheckCircleOutlineIcon />}
                onClick={handleServerStatus}
                
                sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.7)', '&:hover': { borderColor: 'white' }, textTransform: 'none' }}
              >
                Server Status
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}

export default Setting;