import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#282c34',
  color: 'white',
  border: '2px solid #FFF',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

// open, onClose, columns, onSave 함수를 props로 받음
export default function AddDataModal({ open, onClose, columns, onSave }) {
  const [formData, setFormData] = useState({});

  // 모달이 열릴 때마다 formData를 초기화
  useEffect(() => {
    if (open) {
      setFormData({});
    }
  }, [open]);

  // 입력 필드 값이 변경될 때마다 formData 상태 업데이트
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    onSave(formData); // 부모 컴포넌트의 onSave 함수에 formData 전달
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6">새 데이터 추가</Typography>
        
        {/* 'uuid'를 제외한 모든 컬럼에 대해 입력 필드를 동적으로 생성 */}
        {columns.filter(col => col !== 'uuid').map(column => (
          <TextField
            key={column}
            name={column}
            label={column}
            variant="outlined"
            onChange={handleChange}
            fullWidth
            sx={{ '& .MuiInputBase-root': { backgroundColor: 'white' } }}
          />
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', mt: 2 }}>
          <Button onClick={onClose}>취소</Button>
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            저장
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}