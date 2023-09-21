import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // useParams를 추가로 임포트

function BookList() {
  const [books, setBooks] = useState([]);
  const { bookId } = useParams(); // URL 파라미터에서 책 ID를 받아옴
  const [book, setBook] = useState({}); // 책 상태 초기값 설정
  const handleGoBack = () => {
    window.location.href = 'Adminmenu';
  };
  const Newbooks = () => {
    window.location.href = "/Newbook";
  };
  
  // 추가 부분
  const fetchBookDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/books/${bookId}`);
      setBook(response.data);
    } catch (error) {
      console.error('책 정보를 불러오는데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchBookDetail(); // 책 ID가 유효한 경우에만 책 정보를 불러옴
    }
  }, [bookId]);

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
      <table>
        <thead>
          <tr>
            <th>도서 이름</th>
            <th>설명</th>
            <th>권수</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.book_id}>
              <td>
                <a style={{ textDecoration: 'none', color: 'black', backgroundColor: '#AAAAAA' }} href={`/bookad/${book.book_id}`}>
                  {book.book_name}
                </a>
              </td>
              <td>{book.book_info}</td>
              <td>{book.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <button style={{ marginRight: '5px' }} onClick={Newbooks}>책 추가</button>
      <button onClick={handleGoBack}>이전페이지</button>
    </div>
  );
}

export default BookList;
