import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');   
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginType, setLoginType] = useState(0);
  
    const handleLogin = () =>  {
        setLoginType(1);
  
      axios.post('http://localhost:3004/adminlogin', { username, password, loginType})
        .then((response) => {
          const data = response.data;
          if (response.data.message === '로그인 성공') {
            setLoggedIn(true);
            window.location.href = '/Adminmenu';
            localStorage.setItem('username', data.username);
          } else {
            alert('로그인 실패');
          }
        })
        .catch((error) => {
          console.error('로그인 오류:', error);
          alert('사용자/관리자 계정정보를 확인해주시기 바랍니다.');
        });
      
    };
  
    return (
      <div>
        <h2>관리자 로그인</h2>
        <form>
          <div>
            <label htmlFor="username">사용자 이름:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin}>
            로그인
          </button>
          <Link to="/signup">회원가입</Link>
        </form>
      </div>
    );
  }
  
  export default AdminLogin;