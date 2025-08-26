import { useState }     from 'react';
import { useTableData } from '../../hooks/useTableData'; // Custom Hook 가져오기

function Api() {
  const [tableName, setTableName] = useState(''); // 입력 필드 상태는 UI에 종속적이므로 그대로 둠
  
  // Custom Hook을 호출하여 데이터 관련 로직과 상태를 모두 위임
  const { tableData, headers, isLoading, error, getTable } = useTableData();

  const handleSubmit = () => {
    getTable(tableName); // Hook에서 반환된 getTable 함수 호출
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      color: 'white',
      backgroundColor: 'transparent',
      padding: '10px'
    }}>
      {/* 상단 50% */}
      <div style={{ flex: 1, border: '1px solid white', padding: '20px', overflow: 'auto' }}>
        <h2>DB 테이블 (Api)</h2>

        {/* UI 부분은 그대로 유지 */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="조회할 테이블 명을 입력하세요"
            style={{ padding: '8px', flexGrow: 1 }}
          />
          <button onClick={handleSubmit} disabled={isLoading} style={{ padding: '8px 16px' }}>
            {isLoading ? '로딩 중...' : 'Send'}
          </button>
        </div>

        {/* 로직이 분리되었지만, 렌더링 부분은 동일한 상태 변수를 사용 */}
        {isLoading && <p>데이터를 불러오는 중입니다...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {tableData.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
            <thead>
              <tr>
                {headers.map(header => (
                  <th key={header} style={{ border: '1px solid white', padding: '8px' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map(header => (
                    <td key={`${rowIndex}-${header}`} style={{ border: '1px solid white', padding: '8px' }}>
                      {typeof row[header] === 'object' ? JSON.stringify(row[header]) : String(row[header])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 하단 50% */}
      <div style={{ flex: 1, display: 'flex', marginTop: '10px' }}>
        <div style={{ flex: 1, border: '1px solid white', textAlign: 'center' }}>
          <h2>security</h2>
        </div>
        <div style={{ flex: 1, border: '1px solid white', textAlign: 'center' }}>
          <h2>distinct</h2>
        </div>
      </div>
    </div>
  );
}

export default Api;