import { useState, useCallback, useContext } from 'react';
import { TableDataAPI } from '../services/apiService';
import { DbContext } from '../context/DbContext';

export const useTableData = () => {
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
    if (!dbConfig || !dbConfig.url) {
      setError('DB 설정이 필요합니다. 로그인 페이지에서 설정을 저장해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTableData([]);
    setHeaders([]);

    try {
      const lowercasedTableName = tableName.toLowerCase();
      const data = await TableDataAPI(lowercasedTableName, dbConfig);

      if (data && data.length > 0) {
        // ✅ 1. 서버에서 받은 원본 컬럼 목록을 가져옵니다.
        const initialHeaders = Object.keys(data[0]);

        // ✅ 2. 'uuid'를 제외한 나머지 컬럼들로 새 배열을 만듭니다.
        const otherHeaders = initialHeaders.filter(header => header !== 'uuid');
        
        // ✅ 3. 원본 컬럼 목록에 'uuid'가 있었다면, 새 배열의 맨 앞에 'uuid'를 추가합니다.
        //    만약 'uuid'가 없다면 원본 순서를 그대로 사용합니다.
        const sortedHeaders = initialHeaders.includes('uuid')
          ? ['uuid', ...otherHeaders]
          : initialHeaders;

        // ✅ 4. 최종적으로 정렬된 컬럼 목록으로 상태를 설정합니다.
        setHeaders(sortedHeaders);
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