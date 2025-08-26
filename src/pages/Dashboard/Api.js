import React, { useState, useMemo } from 'react';
import { useTableData } from '../../hooks/useTableData';
import ColumnTransferList from '../../components/ColumnTransferList';
import DistinctSelect from '../../components/DistinctSelect';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

// 드롭다운 메뉴에서 사용할 옵션 목록
const algorithmOptions = [
  { value: 'en', label: 'Encryption' },
  { value: 'de', label: 'Decryption' },
];

const modeOptions = [
  { value: 'new', label: '기존 정보' },
  { value: 'old', label: '새로운 정보' },
];

// 모달창 스타일
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#282c34', // 어두운 배경색
  color: 'white',
  border: '2px solid #FFF',
  boxShadow: 24,
  p: 4,
};

// 모달 안에 들어갈 Select의 옵션
const algoInModalOptions = [
    { value: 'SHA-256', label: 'SHA-256 해싱' },
    { value: 'Bcrypt', label: 'Bcrypt 해싱' },
];

function Api() {
  const [tableName, setTableName] = useState('');
  const { tableData, headers, isLoading, error, getTable } = useTableData();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [selectedMode, setSelectedMode] = useState('');

  // 모달의 열림/닫힘 상태를 관리할 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  // 모달 안의 Select 값을 관리할 state
  const [algoInModal, setAlgoInModal] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    getTable(tableName);
  };

  // '모드 선택' 값이 바뀔 때 호출될 핸들러
  const handleModeChange = (newValue) => {
    setSelectedMode(newValue);
    if (newValue === 'old') {
      handleOpenModal();
    }
  };

  const columns = useMemo(() => {
    if (headers.length === 0) return [];
    return headers.map((header) => ({
      field: header,
      headerName: header.charAt(0).toUpperCase() + header.slice(1),
      width: header === 'uuid' ? 300 : 150,
      flex: 1,
    }));
  }, [headers]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      color: 'white',
      backgroundColor: 'transparent',
      padding: '10px',
      gap: '10px',
    }}>

      {/* 1. 왼쪽 영역 (80%) */}
      <Box sx={{ flex: '0 0 80%', border: '1px solid white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: 0 }}>
        <h2>DB 테이블 (Api)</h2>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: '10px' }}>
          <TextField
            label="조회할 테이블 명을 입력하세요"
            variant="outlined"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            fullWidth
            disabled={isLoading}
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { backgroundColor: 'white' } }}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            disabled={isLoading}
            sx={{ minWidth: '100px' }}
          >
            {isLoading ? '로딩 중...' : 'Send'}
          </Button>
        </Box>
        
        {isLoading && <p>데이터를 불러오는 중입니다...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {tableData.length > 0 && (
          <Paper sx={{ flexGrow: 1, minHeight: 0, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <DataGrid
              rows={tableData}
              columns={columns}
              getRowId={(row) => row.uuid}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              checkboxSelection
              sx={{ 
                color: 'white', 
                border: 0, 
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders': { borderColor: 'rgba(255, 255, 255, 0.3)'}, 
                '& .MuiSvgIcon-root': { color: 'white' } 
              }}
            />
          </Paper>
        )}
      </Box>

      {/* 2. 오른쪽 영역 (20%) */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 0 }}>
        
        {/* 2-1. 오른쪽 상단 (컬럼 선택) */}
        <Box sx={{ flex: 1, border: '1px solid white', padding: '20px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <h3>암/복호화 대상 컬럼 선택</h3>
          {tableData.length > 0 ? (
            <ColumnTransferList columns={headers} />
          ) : (
            <p>테이블을 먼저 조회해주세요.</p>
          )}
        </Box>
        
        {/* 2-2. 오른쪽 하단 (옵션 선택) */}
        <Box sx={{ flex: 1, border: '1px solid white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: 0 }}>
          <h2>옵션 선택</h2>
          
          <DistinctSelect
            label="암/복호화 선택"
            options={algorithmOptions}
            value={selectedAlgorithm}
            onChange={setSelectedAlgorithm}
          />

          <DistinctSelect
            label="암/복호화할 정보 선택"
            options={modeOptions}
            value={selectedMode}
            onChange={handleModeChange}
          />
        </Box>
        
      </Box>

      {/* 모달 컴포넌트 */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            추가 옵션 선택
          </Typography>
          <Typography sx={{ mt: 2, mb: 2 }}>
            '새로운 정보' 모드에 대한 추가 옵션을 선택해주세요.
          </Typography>
          
          <DistinctSelect
            label="해싱 알고리즘"
            options={algoInModalOptions}
            value={algoInModal}
            onChange={setAlgoInModal}
          />

          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>닫기</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Api;