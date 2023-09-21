import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookDetail() {
  const { bookId } = useParams(); // URL 파라미터에서 책 ID를 받아옴
  const [book, setBook] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // 로컬 스토리지에서 userId를 가져옴
 
  const handleGoBack = () => {
    window.history.back();
  };
  

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

  const handleBorrow = async () => {
    try {
      // 대출 요청을 서버에 보냄
      await axios.post(`http://localhost:3004/borrow/${bookId}`, { userId }); // userId를 함께 보냄
      // 대출 성공 메시지 또는 다른 작업 수행
        alert('책 대출 성공');
        const updatedBook = await fetchBookDetail();
        setBook(updatedBook);
        handleGoBack();
    } catch (error) {
        alert('책 대출에 실패했습니다. (같은 책을 두권 이상 빌릴 수 없습니다.)', error);
        handleGoBack();
    }
  };

  const handleReturn = async () => {
    try {
      // 반납 요청을 서버에 보냄
      await axios.post(`http://localhost:3004/return/${bookId}`, { userId }); // userId를 함께 보냄
      // 반납 성공 메시지 또는 다른 작업 수행
        alert('책 반납 성공');
        const updatedBook = await fetchBookDetail();
        setBook(updatedBook);
        handleGoBack();
    } catch (error) {
        alert('책 반납에 실패했습니다.(대출 기록이 없는경우 반납이 불가능합니다.)', error);
        handleGoBack();
    }
  };

  const handleExtension = async () => {
    try {
      // 연장 요청을 서버에 보냄
      await axios.post(`http://localhost:3004/extension/${bookId}`, { userId }); // userId를 함께 보냄
      // 연장 성공 메시지 또는 다른 작업 수행
      alert('대출 연장 성공');
      handleGoBack();
    } catch (error) {
      alert('대출 연장에 실패했습니다.(대출 기록이 없는경우 연장이 불가능합니다.)', error);
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


  
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.book_name} 상세 정보</h2>
      <p>책 ID: {book.book_id}</p>
      <p>책 설명: {book.book_info}</p>
      <p>수량: {book.quantity}</p>
      <button style={{marginRight:'2%'}} onClick={handleBorrow}>대출</button>
      {/* <button style={{marginRight:'2%'}} onClick={handleReturn}>반납</button>
      <button style={{marginRight:'2%'}} onClick={handleExtension}>연장</button> */}
      <button onClick={handleGoBack}>이전페이지</button>
    </div>
  );
}

export default BookDetail;
