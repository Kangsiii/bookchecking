import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Bookdetailadmin() {
  const { bookId } = useParams(); // URL 파라미터에서 책 ID를 받아옴
  const [book, setBook] = useState(null);
  const handleGoBack = () => {
    window.location.href = '/Addbook';;
  };

  const fetchBookDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/books/${bookId}`);
      setBook(response.data);
    } catch (error) {
      console.error('책 정보를 불러오는데 실패했습니다.', error);
    }
  };

  const handleAddQuantity = async () => {
    try {
      // 책 권수를 늘리는 요청을 서버에 보냄
      await axios.post(`http://localhost:3004/addquantity/${bookId}`);
      // 책 권수 늘리기 성공 메시지 또는 다른 작업 수행
      alert('책 권수를 늘리는데 성공했습니다.');
      fetchBookDetail(); // 함수 내에서 직접 호출
    } catch (error) {
      alert('책 권수 늘리기에 실패했습니다.', error);
    }
  };

  const handleDecreaseQuantity = async () => {
    try {
      // 책 권수를 줄이는 요청을 서버에 보냄
      await axios.post(`http://localhost:3004/decreasequantity/${bookId}`);
      // 책 권수 줄이기 성공 메시지 또는 다른 작업 수행
      alert('책 권수를 줄이는데 성공했습니다.');
      fetchBookDetail(); // 함수 내에서 직접 호출
    } catch (error) {
      alert('책 권수 줄이기에 실패했습니다.', error);
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm('정말로 책을 삭제하시겠습니까?')) {
      try {
        // 책을 삭제하는 요청을 서버에 보냄
        await axios.delete(`http://localhost:3004/books/${bookId}`);
        // 책 삭제 성공 메시지 또는 다른 작업 수행
        alert('책을 삭제하는데 성공했습니다.');
        // 이후 책 삭제 후 어떤 화면으로 이동할지 처리
        handleGoBack();
      } catch (error) {
        alert('책 삭제에 실패했습니다.', error);
      }
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchBookDetail(); // 책 ID가 유효한 경우에만 책 정보를 불러옴
    }
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.book_name} 상세 정보 (관리자 모드)</h2>
      <p>책 ID: {book.book_id}</p>
      <p>책 설명: {book.book_info}</p>
      <p>수량: {book.quantity}</p>
      <button onClick={handleAddQuantity}>책 권수 늘리기</button>
      <button onClick={handleDecreaseQuantity}>책 권수 줄이기</button>
      <button onClick={handleDeleteBook}>책 삭제</button>
      <button onClick={handleGoBack}>이전페이지</button>
    </div>
  );
}

export default Bookdetailadmin;
