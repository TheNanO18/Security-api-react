import { useState, useEffect } from 'react';

export function useRememberId() {
  const [id, setId]                 = useState('');
  const [rememberId, setRememberId] = useState(false);

  useEffect(() => {
    const rememberedId    = localStorage.getItem('rememberId');
    const initialRemember = rememberedId ? true : false;
    
    if (initialRemember) {
      setId(rememberedId);
      setRememberId(true);
    }
  }, []);

  useEffect(() => {
    if (rememberId) {
      localStorage.setItem('rememberId', id);
    } else {
      localStorage.removeItem('rememberId');
    }
  }, [id, rememberId]);

  return { id, setId, rememberId, setRememberId };
}