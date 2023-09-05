import React from 'react';
import { Link } from 'react-router-dom';

function LoginChoice() {
  return (
    <div>
      <h2>도서관리 프로그램 로그인 선택</h2>
      <p>로그인 유형을 선택하세요:</p>
      <ul>
        <li>
          <Link to="/login">사용자 로그인</Link>
        </li>
        <li>
          <Link to="/adminlogin">관리자 로그인</Link>
        </li>
      </ul>
    </div>
  );
}

export default LoginChoice;