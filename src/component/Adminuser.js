import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Adminuser.css';

function Adminuser() {
  const [loanRecords, setLoanRecords] = useState([]);
  const handleGoBack = () => {
    window.location.href = 'Adminmenu';
  };

  // 날짜 형식 변경 함수
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    // 서버에서 대출 기록을 가져오는 요청
    axios.get('http://localhost:3004/loanRecords')
      .then((response) => {
        setLoanRecords(response.data);
      })
      .catch((error) => {
        console.error('대출 기록 불러오기 오류:', error);
      });
  }, []);

  return (
    <div>
      <h2>대출 기록</h2>
      <table>
        <thead>
          <tr>
            <th>사용자 이름</th>
            <th>책 제목</th>
            <th>대출일</th>
            <th>반납일</th>
          </tr>
        </thead>
        <tbody>
          {loanRecords.map((record) => (
            <tr key={record.loan_id}>
              <td>{record.username}</td>
              <td>{record.book_name}</td>
              <td>{formatDate(record.borrowed_date)}</td>
              <td>{formatDate(record.due_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleGoBack}>이전페이지</button>
    </div>
  );
}

export default Adminuser;
