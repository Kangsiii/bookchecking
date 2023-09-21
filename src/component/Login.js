import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import './css/Login.css';
import { AiOutlineHome } from "react-icons/ai";

function Login() {
  const handleSignin = () => {
    window.history.pushState({}, '', '/Signup');
    window.location.reload(); // 페이지 새로고침
  }

  const handleGohome = () => {
    window.location.href = '/';
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoginType(0);

    axios.post('http://localhost:3004/userlogin', { username, password, loginType })
      .then((response) => {
        const data = response.data;
        if (response.data.message === '로그인 성공') {
          setLoggedIn(true);
          window.location.href = '/Usermenu';
          localStorage.setItem('username', data.username);
          localStorage.setItem('userId', data.userId);
        } else {
          alert('로그인 실패');
        }
      })
      .catch((error) => {
        console.error('로그인 오류:', error);
        alert('사용자/관리자 계정 정보를 확인해주시기 바랍니다.');
      });
  };

  return (
    <Container style={{ marginLeft: "25%" }}>
      <h2>사용자 로그인</h2>
      <Form>
        <Form.Group as={Row} controlId="formPlaintextUsername">
          <Form.Label column sm="2">
            사용자 이름:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="사용자 이름"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword" style={{ marginBottom: "15px" }}>
          <Form.Label column sm="2">
            비밀번호:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button variant="secondary" type="button" style={{ marginLeft:'15px' ,marginRight:'7px'}} onClick={handleLogin}>
          로그인
        </Button>
        <Button variant="secondary" style={{marginRight:'7px'}} onClick={handleSignin}>
          회원가입
        </Button>
      </Form>
      <AiOutlineHome style={{ fontSize:'25px' ,marginRight:'7px', margin:'8px', marginLeft:'20%' }} onClick={handleGohome} />
    </Container>
  );
}

export default Login;
