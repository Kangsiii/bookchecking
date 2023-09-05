import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [usernameError, setUsernameError] = useState('');


  const handleSignup = () => {
    // 서버로 회원가입 정보를 전달하는 로직
    const userData = {
      username,
      password,
      email,
      is_admin: isAdmin,
    };

    axios.post('http://localhost:3004/signup', userData)
      .then((response) => {
        console.log('회원가입 성공:', response.data);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('회원가입 오류:', error);
        alert('회원가입에 오류가 발생했습니다.');
      });
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form>
        <div>
          <label htmlFor="username">사용자 이름:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}            
          />
          {usernameError && <span style={{ color: 'red' }}>{usernameError}</span>}
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
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="isAdmin">관리자 여부:</label>
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </div>
        <button type="button" onClick={handleSignup}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
