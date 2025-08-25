import { useState, useContext } from 'react';
import { DbContext } from '../context/DbContext';

// Custom Hook은 항상 'use'로 시작하는 이름을 가집니다.
export const useSetting = () => {
  // 1. 기존의 모든 상태와 컨텍스트 로직을 이곳으로 옮깁니다.
  const { setDbConfig }             = useContext(DbContext);
  const [dbHost, setDbHost]         = useState('localhost:5432/postgres');
  const [dbUser, setDbUser]         = useState('postgres');
  const [dbPassword, setDbPassword] = useState('');
  const [alertInfo, setAlertInfo]   = useState({ show: false, severity: 'success', message: '' });

  // 2. 이벤트 핸들러 로직도 그대로 가져옵니다.
  const handleSave = () => {
    const newDbConfig = {
      url : `jdbc:postgresql://${dbHost}`,
      user: dbUser,
      pass: dbPassword,
    };
    setDbConfig(newDbConfig);
    setAlertInfo({ show: true, severity: 'success', message: 'DB 설정이 앱에 저장되었습니다.' });
  };

  // 3. 컴포넌트(Setting.js)에서 사용할 값들과 함수들을 객체로 묶어 반환합니다.
  return {
    dbHost,
    dbUser,
    dbPassword,
    alertInfo,
    setDbHost,
    setDbUser,
    setDbPassword,
    setAlertInfo,
    handleSave,
  };
};