import React from 'react';
import { Link } from 'react-router-dom';
import './css/LoginChoice.css';

function LoginChoice() {
  return (
    <div>
      <h2>도서관리 프로그램 로그인 선택</h2>
      <p>로그인 유형을 선택하세요:</p><br></br> 
        <div className='LinkContainer'>
            <Link to="/login" style={{fontSize:20 , color:'black', backgroundColor:'#AAAAAA'}}>사용자 로그인</Link>
        <br></br>  <br></br> 
            <Link to="/adminlogin"style={{fontSize:20, color:'black', backgroundColor:'#AAAAAA'}}>관리자 로그인</Link>
        </div>  
    </div>
  );
}

export default LoginChoice;