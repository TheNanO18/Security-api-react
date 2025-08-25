import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

// props로 users 데이터를 받습니다.
function UserTable({ users }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user login info table">
        <TableHead>
          {/* 1. 테이블 헤더(제목)를 새 컬럼에 맞게 수정합니다. */}
          <TableRow>
            <TableCell>사원 번호</TableCell>
            <TableCell>사용자 이름</TableCell>
            <TableCell>사용자 ID</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>주소</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 2. users 배열을 순회하며 실제 데이터를 표시하는 부분을 수정합니다. */}
          {users.map((user) => (
            // key는 고유한 값인 employeeNumber로 변경합니다.
            <TableRow key={user.employeeNumber}>
              <TableCell>{user.employeeNumber}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;