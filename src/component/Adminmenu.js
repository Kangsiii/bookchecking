import React from 'react';

function Adminmenu() {
  const username = localStorage.getItem('username'); 

  const handleLogout = () => {
    // 로컬 스토리지에서 username 값 삭제
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    // 홈 화면으로 리다이렉트
    window.location.href = '/';};
  
    if (!username) {
      window.location.href = '/';
      return null; // 이후 코드 실행을 막기 위해 null 반환
    }

  return (
    <div>
      <h2>{username}님 환영합니다</h2>
      <ul>
        <li>
          <button onClick={handleLogout}>홈(로그아웃)</button>
        </li>
        <li>
          <button onClick={() => window.location.href = '/Booklistadmin'}>도서 목록(도서추가)</button>
        </li>
        <li>
          <button onClick={() => window.location.href = '/Returnadmin'}>회원관리(연체관리)</button>
        </li>
      </ul>
    </div>
  );
}

export default Adminmenu;