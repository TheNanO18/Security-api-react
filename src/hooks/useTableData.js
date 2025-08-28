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
      const response = await TableDataAPI(lowercasedTableName, dbConfig);
      const actualData = response.data;

      if (actualData && actualData.length > 0) {
                const initialHeaders = Object.keys(actualData[0]);
                const otherHeaders = initialHeaders.filter(header => header !== 'uuid');
                const sortedHeaders = initialHeaders.includes('uuid')
                    ? ['uuid', ...otherHeaders]
                    : initialHeaders;

                setHeaders(sortedHeaders);
                setTableData(actualData); // Use the correct array to set the state
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

    const clearTable = () => {
        setTableData([]);
        setHeaders([]);
        setError(null);
    };

  return { 
    tableData, 
    setTableData,
    headers, 
    isLoading,
    error, 
    getTable,
    clearTable
  };
};