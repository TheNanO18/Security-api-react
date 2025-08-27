import { useState } from 'react';
import { securityProcessAPI } from '../services/apiService';

export const useSecurityData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 서버에 암/복호화 요청을 보내는 함수
   * @param {Array<object>} requestData - API에 보낼 요청 데이터
   * @param {object} dbConfig - The database configuration.
   */
  const processData = async (requestData, dbConfig) => { // ✅ Add dbConfig here
    setIsLoading(true);
    setError(null);
    try {
      // ✅ Pass both arguments to the API function
      const result = await securityProcessAPI(requestData, dbConfig);
      console.log('API Response:', result);
      alert('요청이 성공적으로 처리되었습니다.');
    } catch (e) {
      setError(e.message);
      console.error('API Request Failed:', e);
      alert(`오류 발생: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { processData, isLoading, error };
};