import apiClient from './apiClient';

/**
 * 로그인 API 호출
 */
export async function loginAPI(id, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: id, password: password }),
  });

  if (response.ok) {
    // 응답 헤더에서 'Authorization' 값을 꺼냅니다.
    const token = response.headers.get('Authorization');

    return token; // "Bearer eyJhbGciOi..." 형태의 토큰 문자열을 반환
  } else {
    return null; // 실패 시 null을 반환
  }
}

/**
 * 회원가입 API 호출
 */
export const registerUserAPI = (id, password) => {
  return apiClient('/api/register', 'POST', { id, password });
};

/**
 * 테이블 데이터 조회 API 호출
 * (useTableData 훅에서 fetchTableDataAPI로 호출하므로 이름 통일)
 */
export const TableDataAPI = (tableName, dbConfig) => {
  return apiClient('/api/table-data', 'POST', { tableName, db_config: dbConfig });
};

/**
 * 테이블에 새로운 데이터를 추가하는 API
 */
export const addNewDataAPI = (tableName, dbConfig, newData) => {
  return apiClient('/api/new-data', 'POST', { tableName, db_config: dbConfig, data: newData });
};

export const ProcessAPI = (securityData, dbConfig) => {
  return apiClient('/api/process', 'POST', { data: securityData, db_config: dbConfig });
};