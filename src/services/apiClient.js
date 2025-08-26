/**
 * 범용 API 클라이언트 함수
 * @param {string} endpoint - API 엔드포인트 (예: '/login')
 * @param {string} method - HTTP 메소드 (예: 'POST', 'GET')
 * @param {object} [body] - 요청 본문에 담을 데이터 객체
 * @returns {Promise<any>} - 성공 시 JSON 데이터, 실패 시 에러를 던짐
 */
async function apiClient(endpoint, method, body) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // 나중에 JWT 토큰 같은 공통 헤더를 여기에 추가할 수 있습니다.
      // 'Authorization': `Bearer ${token}`
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  // 프록시를 사용하므로 전체 URL이 아닌 상대 경로만 사용합니다.
  const response = await fetch(endpoint, options);

  if (!response.ok) {
    // 서버에서 에러 응답을 보냈을 때를 대비
    const errorData = await response.json().catch(() => ({})); // JSON 파싱 실패 대비
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  // 성공 응답이 body를 포함하지 않을 경우를 대비 (예: 204 No Content)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }
  return null; // JSON이 아니면 null 반환
}

export default apiClient;