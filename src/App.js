import React             from 'react';
import {Routes, Route, Navigate}   from 'react-router-dom';
import Login             from './pages/Login/Login';
import Dashboard         from './pages/Dashboard/Dashboard';
import backgroundImage   from './assets/background.jpg';
import { AuthProvider }  from './context/AuthContext';
import { DbProvider }    from './context/DbContext';
import ProtectedRoute    from './ProtectedRoute';
import Setting           from './pages/Dashboard/Setting';
import Api               from './pages/Dashboard/Api';
import Proxy             from './pages/Dashboard/Proxy';
import UserRegister      from './pages/UserRegister/UserRegister'; 

function App() {
  return (
     <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // 기존 코드
        backgroundAttachment: 'fixed',             // ✅ 이 한 줄을 추가하세요.
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
    <AuthProvider>
      <DbProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* 아래가 중첩 라우트 설정입니다. */}
            <Route path="/dashboard" element={<Navigate to="/dashboard/api" />} />
            <Route path="api"      element={<Api />} />     {/* /dashboard/api 경로 */}
            <Route path="proxy"    element={<Proxy />} />   {/* /dashboard/proxy 경로 */}
            <Route path="setting"  element={<Setting />} /> {/* /dashboard/setting 경로 */}
          </Route>
        </Routes>
      </DbProvider>
    </AuthProvider>
    </div>
  );
}

export default App;
