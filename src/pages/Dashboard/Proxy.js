import React, { useState, useMemo } from 'react';
import { useTableData } from '../../hooks/useTableData';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function Proxy() {
  const [tableName, setTableName] = useState('');
  // useTableData 훅은 DB 관련 상태와 함수를 제공합니다.
  const { tableData, headers, isLoading, error, getTable } = useTableData();

  // 'Send' 버튼 클릭 시 테이블 데이터를 가져오는 함수
  const handleSubmit = () => {
    getTable(tableName);
  };

  // 서버로부터 받은 'headers' 배열을 DataGrid가 요구하는 'columns' 형식으로 변환합니다.
  // useMemo를 사용해 headers가 바뀔 때만 이 계산을 다시 하도록 최적화합니다.
  const columns = useMemo(() => {
    if (headers.length === 0) {
      return [];
    }
    return headers.map((header) => ({
      field: header, // 각 객체의 key가 될 값 (예: 'uuid', 'username')
      headerName: header.charAt(0).toUpperCase() + header.slice(1), // 화면에 보여줄 컬럼 이름
      width: header === 'uuid' ? 300 : 150, // 'uuid' 컬럼은 더 넓게 설정
      flex: 1, // 컬럼 너비를 유연하게 조절하여 공간을 채움
    }));
  }, [headers]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      color: 'white',
      backgroundColor: 'transparent',
      padding: '10px'
    }}>
      {/* 상단 50% 영역 */}
      <Box sx={{ flex: 1, border: '1px solid white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2>DB 테이블 (Api)</h2>

        {/* 테이블명 입력 및 전송 UI */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="조회할 테이블 명을 입력하세요"
            style={{ padding: '8px', flexGrow: 1, color: 'black' }}
          />
          <button onClick={handleSubmit} disabled={isLoading} style={{ padding: '8px 16px' }}>
            {isLoading ? '로딩 중...' : 'Send'}
          </button>
        </div>

        {/* 로딩 및 에러 상태 메시지 표시 */}
        {isLoading && <p>데이터를 불러오는 중입니다...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {/* 데이터가 있을 경우 DataGrid 렌더링 */}
        {tableData.length > 0 && (
          <Paper sx={{ height: '100%', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <DataGrid
              rows={tableData} // API로 받아온 데이터를 'rows'로 전달
              columns={columns} // 위에서 동적으로 생성한 'columns'를 전달
              getRowId={(row) => row.uuid} // 각 행의 고유 ID로 'uuid' 필드를 사용하도록 지정
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 20]} // 페이지 크기 옵션
              checkboxSelection // 행 선택 체크박스 활성화
              sx={{
                color: 'white',
                border: 0,
                // 테이블 셀과 헤더의 테두리 색상 지정
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                // 아이콘 색상 지정
                '& .MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
            />
          </Paper>
        )}
      </Box>

      {/* 하단 50% 영역 */}
      <div style={{ flex: 1, display: 'flex', marginTop: '10px' }}>
        <div style={{ flex: 1, border: '1px solid white', textAlign: 'center' }}>
          <h2>Encryption</h2>
        </div>
        <div style={{ flex: 1, border: '1px solid white', textAlign: 'center' }}>
          <h2>Decryption</h2>
        </div>
      </div>
    </div>
  );
}

export default Proxy;