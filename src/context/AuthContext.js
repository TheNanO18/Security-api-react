import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // 1. 초기 상태를 localStorage에서 가져오도록 수정합니다.
    // localStorage에 'isLoggedIn' 값이 'true'이면 true, 아니면 false가 됩니다.
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    const login = () => {
        // 2. 로그인 시 localStorage에 상태를 저장합니다.
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const logout = () => {
        // 3. 로그아웃 시 localStorage에서 상태를 제거합니다.
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};