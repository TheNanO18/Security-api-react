import { useState }      from 'react';
import { useNavigate }   from 'react-router-dom';
import { useAuth }       from '../context/AuthContext';
import { useRememberId } from './useRememberId';

export function useLogin() {
  const { id, setId, rememberId, setRememberId } = useRememberId();
  const [password, setPassword]                  = useState('');
  const navigate                                 = useNavigate();
  const { login }                                = useAuth();

  const handleLogin = async () => {
    if (rememberId) {
      localStorage.setItem('rememberedId', id);
    } else {
      localStorage.removeItem('rememberedId');
      setId('');
    }

    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      
      return;
    }

    try {
      const response = await fetch('http://localhost:8120/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        const isLoginSuccessful = await response.json();
        if (isLoginSuccessful) {
          login();
          setPassword('');
          navigate('/dashboard');
        } else {
          setPassword('');
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      } else {
        alert('로그인에 실패했습니다. 서버 상태를 확인해주세요.');
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return {
    id,
    password,
    rememberId,
    setId,
    setPassword,
    setRememberId,
    handleSubmit,
  };
}