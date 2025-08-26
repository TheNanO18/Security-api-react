import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserAPI } from '../services/apiService'; // ✅ apiService에서 함수 임포트

export const useRegister = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // ✅ fetch 대신 중앙 API 함수 호출
      await registerUserAPI(id, password);

      // 성공 시 (apiClient에서 에러를 던지지 않은 경우)
      alert('회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');

    } catch (error) {
      console.error('Registration error:', error);
      
      // ✅ 개선된 apiClient 덕분에 상태 코드로 분기 처리 가능
      if (error.status === 409) {
        alert('이미 존재하는 아이디입니다.');
      } else {
        alert(error.message || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return {
    id,
    password,
    confirmPassword,
    setId,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  };
};