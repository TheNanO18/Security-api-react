import { useState } from 'react';
// import { securityAPI } from '../services/apiService'; // 나중에 API 함수를 만들면 주석 해제

export const useSecurityData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 서버에 암/복호화 요청을 보내는 함수
   * @param {object} requestData - API에 보낼 요청 데이터
   */
  const processData = async (requestData) => {
    // 1. 요청 데이터를 JSON 문자열로 예쁘게 변환합니다.
    const jsonData = JSON.stringify(requestData, null, 2);

    // 2. 1차 목표: alert으로 데이터 확인
  
    console.log(jsonData);

    // 3. 2차 목표: API 호출 (현재는 주석 처리)
    // setIsLoading(true);
    // setError(null);
    // try {
    //   // const result = await securityAPI(requestData);
    //   // console.log('API 응답:', result);
    //   // alert('요청이 성공적으로 처리되었습니다.');
    // } catch (e) {
    //   setError(e.message);
    //   console.error('API 요청 실패:', e);
    //   alert(`오류 발생: ${e.message}`);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return { processData, isLoading, error };
};