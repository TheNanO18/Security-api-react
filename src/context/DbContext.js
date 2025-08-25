import React, { createContext, useState } from 'react';

// 1. Context 생성
export const DbContext = createContext();

// 2. Provider 컴포넌트 생성
export const DbProvider = ({ children }) => {
  // DB 접속 정보를 저장할 state. 초기값은 비워두거나 기본값으로 설정.
  const [dbConfig, setDbConfig] = useState({
    url: 'jdbc:postgresql://localhost:5432/postgres',
    user: 'postgres',
    pass: '',
  });

  // Provider는 dbConfig 상태와 이 상태를 변경할 setDbConfig 함수를 자식들에게 제공
  return (
    <DbContext.Provider value={{ dbConfig, setDbConfig }}>
      {children}
    </DbContext.Provider>
  );
};
