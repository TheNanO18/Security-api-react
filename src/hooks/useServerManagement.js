export const useServerManagement = () => {
  const handleServerStart = () => {
    console.log("Server Start 버튼 클릭");
    // 여기에 실제 서버 시작 API 호출 등의 로직을 구현합니다.
  };

  const handleServerStop = () => {
    console.log("Server Stop 버튼 클릭");
    // 여기에 실제 서버 중지 API 호출 등의 로직을 구현합니다.
  };

  const handleServerStatus = () => {
    console.log("Server Status 버튼 클릭");
    // 여기에 실제 서버 상태 확인 API 호출 등의 로직을 구현합니다.
  };

  // 컴포넌트에서 사용할 함수들을 객체로 묶어 반환합니다.
  return {
    handleServerStart,
    handleServerStop,
    handleServerStatus,
  };
};