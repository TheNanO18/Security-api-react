import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth }  from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth(); // AuthContext에서 로그인 상태를 가져옵니다.

    if (!isLoggedIn) {
        // 로그인 상태가 아니면 로그인 페이지로 리다이렉트합니다.
        return <Navigate to="/" />;
    }

    // 로그인 상태이면 요청된 페이지(children)를 보여줍니다.
    return children;
};

export default ProtectedRoute;