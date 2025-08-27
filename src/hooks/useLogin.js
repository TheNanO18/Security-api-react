import { useState }      from 'react';
import { useNavigate }   from 'react-router-dom';
import { useAuth }       from '../context/AuthContext';
import { useRememberId } from './useRememberId';
import { useDbContext } from '../context/DbContext';
import { loginAPI }    from '../services/apiService';

export function useLogin() {
  const { id, setId, rememberId, setRememberId } = useRememberId();
  const [password, setPassword]                  = useState('');
  const navigate                                 = useNavigate();
  const { login }                                = useAuth();
  const {dbConfig}                               = useDbContext();

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
      // ✅ fetch를 직접 사용하는 대신, 만들어둔 loginAPI 함수를 호출
      const token = await loginAPI(id, password, dbConfig);

      if (token) {
        login();
        setPassword('');
        localStorage.setItem('authToken', token);
        navigate('/dashboard');
      } else {
        setPassword('');
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert(error.message || '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.');
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