import apiClient from './apiClient';

/**
 * 로그인 API 호출
 */
export const loginAPI = (id, password) => {
  return apiClient('/login', 'POST', { id, password });
};

/**
 * 테이블 데이터 조회 API 호출
 * (useTableData 훅에서 fetchTableDataAPI로 호출하므로 이름 통일)
 */
export const TableDataAPI = (tableName, dbConfig) => {
  return apiClient('/api/table-data', 'POST', { tableName, db_config: dbConfig });
};

/**
 * 회원가입 API 호출
 */
export const registerUserAPI = (id, password) => {
  return apiClient('/register', 'POST', { id, password });
};

/**
 * 테이블에 새로운 데이터를 추가하는 API
 */
export const addNewDataAPI = (tableName, dbConfig, newData) => {
  return apiClient('/api/new-data', 'POST', { tableName, db_config: dbConfig, data: newData });
};
