import React, { useState } from 'react';
import axios from 'axios';

function Newbook() {
  const [book, setBook] = useState({
    book_name: '',
    book_info: '',
    quantity: 1, // 기본으로 1권 설정
  });
  const handleGoBack = () => {
    window.history.pushState({}, '', '/Addbook');
    window.location.reload(); // 페이지 새로고침
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleAddBook = async () => {
    try {
      // 서버로 책 추가 요청을 보냅니다.
      const response = await axios.post('http://localhost:3004/addBook', book);

      // 요청이 성공하면 성공 메시지를 출력합니다.
      alert(response.data.message);

      // 입력 필드 초기화
      setBook({
        book_name: '',
        book_info: '',
        quantity: 1,
      });
      handleGoBack();
    } catch (error) {
      console.error('책 추가 오류:', error);
      alert('책 추가에 실패했습니다.');
    }
  };

  return (
    <div>
      <h2>새로운 책 추가</h2>
      <form>
        <div>
          <label>책 제목:</label>
          <input
            type="text"
            name="book_name"
            value={book.book_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>책 정보:</label>
          <textarea
            name="book_info"
            value={book.book_info}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>권수:</label>
          <input
            type="number"
            name="quantity"
            value={book.quantity}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleAddBook}>
          책 추가
        </button>
        <button onClick={handleGoBack}>이전페이지</button>
      </form>
    </div>
  );
}

export default Newbook;
