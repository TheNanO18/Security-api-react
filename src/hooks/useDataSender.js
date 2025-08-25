import { useState } from 'react';

export function useDataSender() {
  const [isSending, setIsSending] = useState(false);

  /**
   * 서버에 데이터를 전송하는 함수
   * @param {Array} dataToSend - 전송할 데이터 배열
   * @param {string} endpoint - API 엔드포인트 URL
   */
  const sendData = async (dataToSend, endpoint) => {
    if (!dataToSend || dataToSend.length === 0) {
      alert("전송할 데이터가 없습니다.");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        alert(result.message);
      } else {
        throw new Error(result.message || "서버에서 데이터를 처리하지 못했습니다.");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, sendData };
}