import React, { useState, useMemo } from 'react';
import { useTableData } from '../../hooks/useTableData';
import ColumnTransferList from '../../components/ColumnTransferList';
import DistinctSelect from '../../components/DistinctSelect';
import AddDataModal from '../../components/AddDataModal';
import { addNewDataAPI } from '../../services/apiService';
import { useDbContext } from '../../context/DbContext';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // ✅ 버튼 아이콘 임포트

// 드롭다운 메뉴에서 사용할 옵션 목록
const modeOptions = [
  { value: 'en', label: '암호화' },
  { value: 'de', label: '복호화' },
];

const algorithmOptions = [
  { value: 'hight_ctr', label: 'HIGHT CTR' },
  { value: 'hight_cbc', label: 'HIGHT CBC' },
];

const infoOptions = [
  { value: 'new', label: '기존 정보' },
  { value: 'old', label: '새로운 정보' },
];

const passwordHashOptions = [
  { value: 'T', label: 'Yes' },
  { value: 'F', label: 'No' },
];

// 모달창 스타일
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#282c34',
  color: 'white',
  border: '2px solid #FFF',
  boxShadow: 24,
  p: 4,
};

// 모달 안에 들어갈 Select의 옵션
const algoInModalOptions = [
    { value: 'Bcrypt', label: 'Bcrypt 해싱' },
    { value: 'SHA-256', label: 'SHA-256 해싱' },
];

function Api() {
  const { dbConfig } = useDbContext();
  const [tableName, setTableName] = useState('');
  const { tableData, headers, isLoading, error, getTable } = useTableData();
  
  // 오른쪽 패널 상태
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [selectedInfo, setSelectedInfo] = useState('');
  const [selectedPasswordHash, setSelectedPasswordHash] = useState('');
  
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [algoInModal, setAlgoInModal] = useState('');
  const [passwordColumn, setPasswordColumn] = useState('');
  
  // 새 데이터 추가 모달 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  // 페이지네이션 상태
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  const handleSubmit = (event) => {
    event.preventDefault();
    getTable(tableName);
  };
  
  const handlePasswordHashChange = (newValue) => {
    setSelectedPasswordHash(newValue);
    if (newValue === 'T') {
      handleOpenModal();
    }
  };

  const handleSaveNewData = async (newData) => {
    try {
      await addNewDataAPI(tableName.toLowerCase(), dbConfig, newData);
      alert('데이터가 성공적으로 추가되었습니다.');
      handleCloseAddModal();
      getTable(tableName);
    } catch (err) {
      alert(`데이터 추가 실패: ${err.message}`);
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
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpenAddModal}
            disabled={tableData.length === 0}
          >
            New Data
          </Button>
        </Box>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {tableData.length > 0 && (
          <Paper sx={{ flexGrow: 1, minHeight: 0, backgroundColor: 'rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column' }}>
            <DataGrid
              rows={tableData}
              columns={columns}
              getRowId={(row) => row.uuid}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 20]}
              checkboxSelection
              sx={{ 
                flexGrow: 1,
                color: 'white', 
                border: 0, 
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders': { borderColor: 'rgba(255, 255, 255, 0.3)'}, 
                '& .MuiSvgIcon-root': { color: 'white' },
                '& .MuiDataGrid-cellContent': {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              }}
            />
          </Paper>
        )}
      </Box>

      {/* 2. 오른쪽 영역 (20%) */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 0 }}>
        <Box sx={{ flex: 1, border: '1px solid white', padding: '20px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <h3>암/복호화 대상 컬럼 선택</h3>
          <Box sx={{ flex: 1, minHeight: 0 }}>
            {tableData.length > 0 ? (
              <ColumnTransferList
                columns={headers}
              />
            ) : ( <p>테이블을 먼저 조회해주세요.</p> )}
          </Box>
        </Box>
        
        <Box sx={{ flex: 1, border: '1px solid white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: 0 }}>
          <h2>옵션 선택</h2>
          <DistinctSelect
            label="암/복호화 선택"
            options={modeOptions}
            value={selectedMode}
            onChange={setSelectedMode}
          />
          <DistinctSelect
            label="암/복호화할 정보 선택"
            options={infoOptions}
            value={selectedInfo}
            onChange={setSelectedInfo}
          />
          <DistinctSelect
            label="암호화 알고리즘 선택"
            options={algorithmOptions}
            value={selectedAlgorithm}
            onChange={setSelectedAlgorithm}
          />
          <DistinctSelect
            label="비밀번호 해시 여부 선택"
            options={passwordHashOptions}
            value={selectedPasswordHash}
            onChange={handlePasswordHashChange}
          />

          {/* ✅ 요청하신 Send 버튼 UI만 추가 */}
          <Button
            variant="contained"
            color="success"
            startIcon={<PlayArrowIcon />}
            onClick={() => alert('Send 버튼 클릭!')} // 기능 없이 알림창만 띄웁니다.
            disabled={tableData.length === 0}
            sx={{ mt: 'auto' }} // 버튼을 영역 하단에 배치
          >
            Send
          </Button>
        </Box>
      </Box>

      {/* 모달 컴포넌트 */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            패스워드 해싱 설정
          </Typography>
          <DistinctSelect
            label="해싱 알고리즘"
            options={algoInModalOptions}
            value={algoInModal}
            onChange={setAlgoInModal}
          />
          <TextField
            label="해싱할 패스워드 컬럼명"
            variant="outlined"
            value={passwordColumn}
            onChange={(e) => setPasswordColumn(e.target.value)}
            fullWidth
            sx={{ 
              mt: 2,
              '& .MuiInputBase-root': { backgroundColor: 'white' } 
            }}
          />
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>확인</Button>
        </Box>
      </Modal>

      {/* 새 데이터 추가 모달 */}
      <AddDataModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        columns={headers}
        onSave={handleSaveNewData}
      />
    </div>
  );
}

export default Api;