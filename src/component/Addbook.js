import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const handleGoBack = () => {
    window.location.href = 'Adminmenu';;
  };
  const Newbooks = () => {
    window.location.href = "/Newbook";
};

  useEffect(() => {
    // 서버에서 책 목록을 가져오는 요청
    axios.get('http://localhost:3004/books')
      .then((response) => {
        setBooks(response.data); // 가져온 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error('책 목록 불러오기 오류:', error);
      });
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h2>도서 목록</h2>
      <br></br>
      <ul>
        {books.map((book) => (
          <li key={book.book_id}>
            <a style={{textDecoration:'none', color:'black', backgroundColor:'#AAAAAA'}} href={`/bookad/${book.book_id}`}>{book.book_name}</a> 
            {/* 나중에 책 관리 페이지로 바꿀꺼임 */}
          </li>
        ))}
      </ul>
      <br></br>
      <button style={{marginRight:'5px'}} onClick={Newbooks}>책 추가</button>
      <button onClick={handleGoBack}>이전페이지</button>
    </div>
  );
}

export default BookList;