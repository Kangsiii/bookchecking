import React from 'react';
import { FaBookMedical } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

function Usermenu() {
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

    const redirectToBooklist = () => {
      window.location.href = '/Booklist';
    }

    const mypagelist = () => {
      window.location.href = '/Return'
    }

  return (
    <div>
      <h2>{username}님 환영합니다</h2>
      <br></br>
        <div style={{ display:'flex',flexDirection: 'row', alignItems: 'center', }}>
          <FaBookMedical style={{ fontSize: '75px', marginLeft:'40px', marginRight:'50px' }} onClick={redirectToBooklist} />
        <br></br>
          <CgProfile style={{ fontSize: '85px' , marginRight:'50px' }} onClick={mypagelist}/>
        <br></br>
          <GrLogout style={{ fontSize: '85px',  marginRight:'45px' }}  onClick={handleLogout} />
        </div>
        <div style={{display:'flex', flexDirection: 'row', alignItems: 'center',}}>
          <p style={{ fontSize:'17px' ,marginLeft:'45px' , marginRight:'50px'}}>책 목록</p>
          <p style={{ fontSize:'17px' ,marginLeft:'18px' , marginRight:'50px'}}>내 정보</p>
          <p>로그아웃</p>
        </div>
    </div>
  );
}



export default Usermenu;