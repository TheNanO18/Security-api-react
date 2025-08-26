import apiClient from './apiClient';

/**
 * 로그인 API 호출
 * @param {string} id - 사용자 ID
 * @param {string} password - 사용자 비밀번호
 * @returns {Promise<any>}
 */
export const loginAPI = (id, password) => {
  return apiClient('/login', 'POST', { id, password });
};

/**
 * 테이블 데이터 조회 API 호출
 * @param {string} tableName - 테이블 이름
 * @param {object} dbConfig - DB 설정 객체
 * @returns {Promise<any>}
 */
export const TableDataAPI = (tableName, dbConfig) => {
  return apiClient('/api/table-data', 'POST', { tableName, db_config: dbConfig });
};

/**
 * 회원가입 API 호출
 * @param {string} id - 사용자 ID
 * @param {string} password - 사용자 비밀번호
 * @returns {Promise<any>}
 */
export const registerUserAPI = (id, password) => {
  // apiClient를 사용하여 '/register' 엔드포인트에 POST 요청
  return apiClient('/register', 'POST', { id, password });
};