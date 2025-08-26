import React, { createContext, useState, useEffect, useContext } from 'react'; // ✅ useContext 추가

// 1. Context 생성
export const DbContext = createContext();

// ✅ 2. Context를 쉽게 사용하기 위한 Custom Hook 생성 및 export
export const useDbContext = () => {
  return useContext(DbContext);
};

// 3. Provider 컴포넌트 생성
export const DbProvider = ({ children }) => {
  const [dbConfig, setDbConfig] = useState(() => {
    const savedConfig = localStorage.getItem('dbConfig');
    return savedConfig ? JSON.parse(savedConfig) : { url: '', user: '', pass: '' };
  });

  useEffect(() => {
    localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
  }, [dbConfig]);

  return (
    <DbContext.Provider value={{ dbConfig, setDbConfig }}>
      {children}
    </DbContext.Provider>
  );
};