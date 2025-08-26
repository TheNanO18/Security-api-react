import { useState, useCallback, useContext } from 'react'; // ✅ useContext 추가
import { TableDataAPI } from '../services/apiService';
import { DbContext } from '../context/DbContext'; // ✅ DbContext 추가

export const useTableData = () => {
  // 1. useContext를 사용해 dbConfig를 가져옵니다.
  const { dbConfig } = useContext(DbContext);

  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTable = useCallback(async (tableName) => {
    if (!tableName) {
      setError('테이블 명이 필요합니다.');
      return;
    }
    // dbConfig가 비어있는 경우에 대한 유효성 검사 추가
    if (!dbConfig || !dbConfig.url) {
      setError('DB 설정이 필요합니다. 로그인 페이지에서 설정을 저장해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTableData([]);
    setHeaders([]);

    try {
      // 2. API 호출 시 dbConfig를 함께 전달합니다.
      const data = await TableDataAPI(tableName, dbConfig);

      if (data && data.length > 0) {
        setHeaders(Object.keys(data[0]));
        setTableData(data);
      } else {
        setError('테이블이 비어있거나 존재하지 않습니다.');
      }
    } catch (e) {
      setError(`데이터를 불러오는 데 실패했습니다: ${e.message}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [dbConfig]);

  return { 
    tableData, 
    headers, 
    isLoading,
    error, 
    getTable 
  };
};