import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/Return.css';

function Return() {
  const [user, setUser] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // 추가부분
  const { bookId } =useParams();
  const [book,setBook] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // 로컬 스토리지에서 userId를 가져옴
 
  // 
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

  // 추가부분

  useEffect(() => {
    // 책 정보를 서버에서 가져오는 함수
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error('책 정보를 불러오는데 실패했습니다.', error);
      }
    };

    if (bookId) {
      fetchBookDetail(); // 책 ID가 유효한 경우에만 책 정보를 불러옴
    }
  }, [bookId]);


  const handleReturn = async (bookId) => {
    try {
      // 반납 요청을 서버에 보냄
      await axios.post(`http://localhost:3004/return/${bookId}`, { userId }); // userId를 함께 보냄
      // 반납 성공 메시지 또는 다른 작업 수행
      alert('책 반납 성공');
      const updatedBook = await fetchBookDetail();
      setBook(updatedBook);
      handleGoBack();
    } catch (error) {
      alert('책 반납에 실패했습니다.(대출 기록이 없는 경우 반납이 불가능합니다.)', error);
      handleGoBack();
    }
  };

  const handleExtension = async (bookId) => {
    try {
      // 연장 요청을 서버에 보냄
      await axios.post(`http://localhost:3004/extension/${bookId}`, { userId }); // userId를 함께 보냄
      // 연장 성공 메시지 또는 다른 작업 수행
      alert('대출 연장 성공');
      handleGoBack();
    } catch (error) {
      alert('대출 연장에 실패했습니다.(대출 기록이 없는 경우 연장이 불가능합니다.)', error);
      handleGoBack();
    }
  };

  const fetchBookDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('책 정보를 불러오는데 실패했습니다.', error);
      return null;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className=''>
      <h3>내 정보</h3>
      <p>사용자 이름: {user.username}</p>
      <p>Email: {user.email}</p>
  
      <div>
        <h3>대출한 책 목록</h3>
        <table>
          <thead>
            <tr>
              <th>도서 이름</th>
              <th>대출일</th>
              <th>반납일</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book) => {
              const borrowedDate = new Date(book.borrowed_date);
              const dueDate = new Date(book.due_date);
              const borrowedDateString = `${borrowedDate.getMonth() + 1}월 ${borrowedDate.getDate()}일`;
              const dueDateString = `${dueDate.getMonth() + 1}월 ${dueDate.getDate()}일`;
  
              return (
                <tr key={book.book_id}>
                  <td>
                    <a style={{ textDecoration: 'none', color: 'black', backgroundColor: '#AAAAAA' }} href={`/books/${book.book_id}`}>
                      {book.book_name}
                    </a>
                  </td>
                  <td>{borrowedDateString}</td>
                  <td>{dueDateString}</td>
                  <td>
                    <button style={{ marginRight: '7px' }} onClick={() => handleExtension(book.book_id)}>연장</button>
                    <button onClick={() => handleReturn(book.book_id)}>반납</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  
      <button onClick={handleGoBack}>이전페이지</button>
    </div>
  );
}

export default Return;
