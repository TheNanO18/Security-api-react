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
      // ✅ API로 보내기 직전에 tableName을 소문자로 변환합니다.
      const lowercasedTableName = tableName.toLowerCase();

      // ✅ 변환된 소문자 테이블 이름으로 API를 호출합니다.
      const data = await TableDataAPI(lowercasedTableName, dbConfig);

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