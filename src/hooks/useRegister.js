// src/hooks/useRegister.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:8120/register', { // 백엔드 주소
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      if (response.status === 201) {
        alert('회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login'); // 성공 시 로그인 페이지로 이동
      } else if (response.status === 409) {
        const data = await response.json();
        alert(data.error || '이미 존재하는 아이디입니다.');
      } else {
        throw new Error('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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