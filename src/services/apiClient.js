// apiClient.js

/**
 * API 요청을 보내는 중앙 클라이언트 함수
 * @param {string} endpoint - API 엔드포인트 (예: '/api/table-data')
 * @param {string} method - HTTP 메소드 ('GET', 'POST', 등)
 * @param {object} body - 요청에 담아 보낼 데이터 객체
 * @returns {Promise<any>} - API 응답 데이터를 담은 Promise
 */
export default async function apiClient(endpoint, method = 'GET', body = null) {
  // 1. 로컬 스토리지에서 토큰을 가져옵니다.
  //    지난 단계에서 'authToken'이라는 키로 저장했습니다.
  const token = localStorage.getItem('authToken');

  // 2. 요청에 필요한 헤더를 구성합니다.
  const headers = {
    'Content-Type': 'application/json',
  };

  // 3. 토큰이 존재한다면, Authorization 헤더에 추가합니다.
  //    "Bearer " 접두사를 포함한 토큰 전체를 사용합니다.
  if (token) {
    headers['Authorization'] = token;
  }

  // 4. fetch API를 사용하여 요청을 보냅니다.
  //    서버의 기본 URL을 여기에 설정할 수 있습니다.
  const response = await fetch(`${endpoint}`, {
    method: method,
    headers: headers,
    // body가 null이 아닐 경우에만 JSON 문자열로 변환하여 포함합니다.
    body: body ? JSON.stringify(body) : null,
  });

  // 5. 응답 상태를 확인합니다.
  if (!response.ok) {
    // 401 Unauthorized 오류는 토큰 만료 또는 무효를 의미할 수 있습니다.
    if (response.status === 401) {
      // 여기서 강제 로그아웃 로직을 실행할 수 있습니다.
      // 예: localStorage.removeItem('authToken');
      //     window.location.href = '/login';
      console.error('인증 실패 (Unauthorized)');
    }
    // 응답이 성공적이지 않으면 에러를 발생시켜 catch 블록에서 처리하도록 합니다.
    throw new Error(`API Error: ${response.statusText} (상태 코드: ${response.status})`);
  }

  // 6. 성공적인 응답의 경우, JSON 데이터를 파싱하여 반환합니다.
  return response.json();
}