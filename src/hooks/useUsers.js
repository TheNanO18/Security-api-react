import { useState, useEffect } from 'react';

export function useUsers() {
  const [data, setData]       = useState({ content: [], totalPages: 0 }); // 데이터 구조 변경
  const [page, setPage]       = useState(0); // 현재 페이지 상태
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // fetch URL에 page와 size 파라미터를 추가합니다.
    fetch(`http://localhost:8080/api/database?page=${page}&size=20`)
      .then(res => res.json())
      .then(apiData => {
        setData(apiData); // Spring이 보내준 Page 객체 전체를 저장
        setLoading(false);
      })
      .catch(error => {
        console.error("사용자 데이터 로딩 실패:", error);
        setLoading(false);
      });
  }, [page]); // page가 바뀔 때마다 데이터를 다시 불러옵니다.

  // users 대신 data 객체와 setPage 함수를 반환
  return { data, loading, page, setPage };
}