import React, { createContext, useState, useEffect } from 'react';

export const DbContext = createContext();

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