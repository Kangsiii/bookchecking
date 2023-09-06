import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Return.css';

function Return() {
  const [user, setUser] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    // 로컬 스토리지에서 userId 가져오기
    const userId = localStorage.getItem('userId');

    // 사용자 정보를 가져오는 함수
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/userInfo/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('사용자 정보를 불러오는데 실패했습니다.', error);
      }
    };

    // 대출한 책 목록을 가져오는 함수
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/borrowedBooks/${userId}`);
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error('대출한 책 목록을 불러오는데 실패했습니다.', error);
      }
    };

    if (userId) {
      fetchUserData();
      fetchBorrowedBooks();      
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className=''>
      <h3>내 정보</h3>
      <p>사용자 이름: {user.username}</p>
      <p>Email: {user.email}</p>

      <h3 onClick={() => setIsModalOpen(true)}>대출한 책 목록</h3>

      {isModalOpen && (
        <modal className="modal">
          <div className="modal-content">
            
            <h2>대출한 책 목록</h2>
            <ul>
              {borrowedBooks.map((book) => {
                const borrowedDate = new Date(book.borrowed_date);
                const dueDate = new Date(book.due_date);
                const borrowedDateString = `${borrowedDate.getMonth() + 1}월 ${borrowedDate.getDate()}일`;
                const dueDateString = `${dueDate.getMonth() + 1}월 ${dueDate.getDate()}일`;

                return (
                  <li key={book.book_id}>
                    <a style={{textDecoration:'none', color:'black', backgroundColor:'#AAAAAA'}}
                    href={`/books/${book.book_id}`}>
                      {book.book_name}<br />
                      대출일: {borrowedDateString}<br />
                      반납일: {dueDateString}
                    </a>
                  </li>
                  
                );
              })}
            </ul>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              닫기
            </button>
          </div>
        </modal>
      )}

      <button onClick={handleGoBack}>이전페이지</button>
    </div>
  );
}

export default Return;
