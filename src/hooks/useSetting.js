import { useState, useContext } from 'react';
import { DbContext } from '../context/DbContext';

export const useSetting = () => {
  // 1. Context에서 현재 저장된 dbConfig 값을 가져옵니다.
  const { dbConfig, setDbConfig } = useContext(DbContext);

  // URL에서 "jdbc:postgresql://" 부분을 제거하는 간단한 함수
  const getHostFromUrl = (url) => {
    if (!url) return 'localhost:5432/postgres';
    return url.replace('jdbc:postgresql://', '');
  };

  // 2. Context의 값으로 useState의 초기값을 설정합니다.
  const [dbHost, setDbHost] = useState(getHostFromUrl(dbConfig.url));
  const [dbUser, setDbUser] = useState(dbConfig.user || 'postgres');
  const [dbPassword, setDbPassword] = useState(dbConfig.pass || '');
  const [alertInfo, setAlertInfo] = useState({ show: false, severity: 'success', message: '' });

  const handleSave = () => {
    const newDbConfig = {
      url: `jdbc:postgresql://${dbHost}`,
      user: dbUser,
      pass: dbPassword,
    };
    setDbConfig(newDbConfig);
    setAlertInfo({ show: true, severity: 'success', message: 'DB 설정이 앱에 저장되었습니다.' });
  };

  return {
    dbHost, dbUser, dbPassword, alertInfo,
    setDbHost, setDbUser, setDbPassword, setAlertInfo,
    handleSave,
  };
};