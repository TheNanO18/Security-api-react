import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';

// ❌ 내부에서 옵션을 직접 정의하는 대신, props로 받습니다.
// const distinctOptions = [ ... ];

// ✅ props에 'options' 추가
export default function DistinctSelect({ options, value, onChange, label }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth size="small">
        <InputLabel id="distinct-select-label" sx={{ color: 'white' }}>{label}</InputLabel>
        <Select
          labelId="distinct-select-label"
          value={value}
          label={label}
          onChange={handleChange}
          sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiSvgIcon-root': { color: 'white' } }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {/* ✅ props로 받은 options 배열을 사용해 메뉴 아이템을 생성 */}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}