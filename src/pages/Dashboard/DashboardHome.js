import React, { useState } from 'react';
import { Box }             from '@mui/material';
import dayjs               from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs }         from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar }         from '@mui/x-date-pickers/DateCalendar';

function DashboardHome() {
  const [value, setValue] = useState(dayjs());

  return (
    <div>
      <Box 
        position="fixed"
        right={0}
        top="50%"
        sx={{ transform: 'translateY(-50%)' }}
        height={1000}
        width={1000}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="gray"
        p={2}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar 
            value={value} 
            onChange={(newValue) => setValue(newValue)} 
            sx={{
              transform: 'scale(1.5) translateY(-20%)',
              transformOrigin: 'top right',
            }}
          />
        </LocalizationProvider>
      </Box>
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
        bgcolor="green"
        p={2}
      >
        <h4>
          특정 기간 나타내주는 데이터
        </h4>
      </Box>
    </div>
  );
}

export default DashboardHome;