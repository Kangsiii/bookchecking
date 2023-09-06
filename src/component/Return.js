import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Return() {
  const [user, setUser] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);

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
    <div>
      <h2>내 정보</h2>
      <p>사용자 이름: {user.username}</p>
      <p>Email: {user.email}</p>

      <h2>대출한 책 목록</h2>
        <ul>
        {borrowedBooks.map((book) => {
            const borrowedDate = new Date(book.borrowed_date);
            const dueDate = new Date(book.due_date);
            const borrowedDateString = `${borrowedDate.getMonth() + 1}월 ${borrowedDate.getDate()}일`;
            const dueDateString = `${dueDate.getMonth() + 1}월 ${dueDate.getDate()}일`;

            return (
            <li key={book.book_id}>
                <Link to={`/books/${book.book_id}`}>
                {book.book_name}<br></br> 대출일: {borrowedDateString}<br></br> 반납일: {dueDateString}
                </Link>
            </li>
            );
        })}
        </ul>
      <button onClick={handleGoBack}>이전페이지</button>
      
    </div>
  );
}

export default Return;
