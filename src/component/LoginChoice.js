import React from 'react';
import { Link } from 'react-router-dom';
import './css/LoginChoice.css';

function LoginChoice() {
  return (
    <div>
      <h2>도서관리 프로그램 로그인 선택</h2>
      <p>로그인 유형을 선택하세요:</p>
        <div className='LinkContainer'>
            <Link to="/login">사용자 로그인</Link>
        <br></br>  
            <Link to="/adminlogin">관리자 로그인</Link>
        </div>  
    </div>
  );
}

export default LoginChoice;