const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const PORT = 3004;
const bodyParser = require('body-parser');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'book'
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});

app.post('/userlogin', (req, res) => {
    const { username, password } = req.body;
    const loginType = 0 ;
  
    // 사용자 이름(username)과 비밀번호(password)로 사용자 정보 조회
    connection.query(
      'SELECT user_Id, username FROM user WHERE username = ? AND password = ? AND is_admin = ?',
      [username, password, loginType === 'admin' ? 1 : 0],
      (err, result) => {
        if (err) {
          console.error('로그인 오류:', err);
          return res.status(500).json({ message: '로그인 오류' });
        }
  
        // 조회된 사용자 정보가 없을 경우 로그인 실패
        if (result.length === 0) {
          return res.status(401).json({ message: '로그인 실패' });
        }
  
        // 로그인 성공
        const user = result[0]; // 첫 번째 사용자 정보를 가져옴
        const userId = user.user_Id; // user_Id 값을 가져옴
        const username = user.username; // username 값을 가져옴
        console.log({ userId });
  
        // 여기에서 userId 값을 사용하여 추가 작업 수행
  
        // 클라이언트로 응답을 보낼 때 userId를 포함하여 보낼 수 있음
        res.status(200).json({ message: '로그인 성공', userId, username });
      }
    );
  });

  app.post('/adminlogin', (req, res) => {
    const { username, password } = req.body;
    const loginType = 1;
  
    // 사용자 이름(username)과 비밀번호(password)로 사용자 정보 조회
    connection.query(
      'SELECT user_Id, username FROM user WHERE username = ? AND password = ? AND is_admin = 1',
      [username, password, loginType === 'admin' ? 1 : 0],
      (err, result) => {
        if (err) {
          console.error('로그인 오류:', err);
          return res.status(500).json({ message: '로그인 오류' });
        }
    
        // 조회된 사용자 정보가 없을 경우 로그인 실패
        if (result.length === 0) {
          return res.status(401).json({ message: '로그인 실패' });
        }
    
        // 로그인 성공
        const user = result[0]; // 첫 번째 사용자 정보를 가져옴
        const username = user.username; // user_id 값을 가져옴
        const userId = user.user_Id;
        console.log({username}, {userId});
    
        // 여기에서 user_id 값을 사용하여 추가 작업 수행
    
        // 클라이언트로 응답을 보낼 때 user_id를 포함하여 보낼 수 있음
        res.status(200).json({ message: '로그인 성공', username , userId});
      }
    );});

app.post('/signup', (req, res) => {
  const { username, password, email, is_admin } = req.body;

  // 사용자 이름(username)을 기준으로 중복 여부를 체크
  connection.query(
    'SELECT * FROM user WHERE username = ?',
    [username],
    (err, result) => {
      if (err) {
        console.error('회원가입 중복 체크 오류:', err);
        return res.status(500).json({ message: '회원가입 오류' });
      }

      // 이미 같은 사용자 이름이 존재하는 경우 회원가입 실패
      if (result.length > 0) {
        return res.status(400).json({ message: '이미 존재하는 사용자 이름입니다.' });
      }

      // 중복이 없는 경우, 새 사용자 정보를 삽입
      connection.query(
        'INSERT INTO user (username, password, email, is_admin) VALUES (?, ?, ?, ?)',
        [username, password, email, is_admin],
        (err, result) => {
          if (err) {
            console.error('회원가입 오류:', err);
            return res.status(500).json({ message: '회원가입 오류' });
          }
          console.log('회원가입 성공:', result);
          res.status(200).json({ message: '회원가입 성공' });
        }
      );
    }
  );
});

app.get('/books', (req, res) => {
    // 데이터베이스에서 모든 책 목록을 가져오는 쿼리
    connection.query('SELECT * FROM book', (err, result) => {
      if (err) {
        console.error('책 목록 불러오기 오류:', err);
        return res.status(500).json({ message: '책 목록 불러오기 오류' });
      }
  
      res.status(200).json(result); // 책 목록을 JSON 형식으로 응답
    });
  });

  app.get('/books/:bookId', (req, res) => {
    const bookId = req.params.bookId;
  
    // 데이터베이스에서 특정 bookId에 해당하는 책 정보를 가져오는 쿼리
    connection.query('SELECT * FROM book WHERE book_id = ?', [bookId], (err, result) => {
      if (err) {
        console.error('책 상세 정보 불러오기 오류:', err);
        return res.status(500).json({ message: '책 상세 정보 불러오기 오류' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: '책을 찾을 수 없음' });
      }
  
      const bookDetail = result[0]; // 첫 번째 결과를 가져옴
      res.status(200).json(bookDetail); // 책 상세 정보를 JSON 형식으로 응답
    });
  });

  app.post('/borrow/:bookId', (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.body.userId;

    // 이미 해당 유저가 같은 책을 대출 중인지 확인하는 SQL 쿼리
    const checkBorrowedQuery = `
    SELECT COUNT(*) as count
    FROM loan
    WHERE user_id = ? AND book_id = ?
    `;

    connection.query(checkBorrowedQuery, [userId, bookId], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('대출 확인 실패:', checkErr);
            return res.status(500).json({ message: '대출 확인 실패' });
        }

        const alreadyBorrowed = checkResult[0].count > 0;

        if (alreadyBorrowed) {
            return res.status(400).json({ message: '이미 대출 중인 책입니다.' });
        }

        // 대출을 위한 SQL 쿼리
        const borrowQuery = `
        INSERT INTO loan (user_id, book_id, borrowed_date, due_date)
        VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY))
        `;

        const updateQuery = `
        UPDATE book SET quantity = quantity - 1 WHERE book_id = ?
        `;

        // 대출을 위한 쿼리 실행
        connection.query(borrowQuery, [userId, bookId], (err, result) => {
            if (err) {
                console.error('책 대출 실패:', err);
                return res.status(500).json({ message: '책 대출 실패' });
            }
            // 대출 성공한 후에 책 수량 업데이트 쿼리 실행
            connection.query(updateQuery, [bookId], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('책 수량 업데이트 실패:', updateErr);
                    return res.status(500).json({ message: '책 수량 업데이트 실패' });
                }
                res.status(200).json({ message: '책 대출 및 수량 업데이트 성공' });
            });
        });
    });
});

  app.post('/return/:bookId', (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.body.userId; // 요청 데이터에서 userId를 가져옴
  
    // 반납을 위한 SQL 쿼리
    const deleteLoanQuery = `
      DELETE FROM loan WHERE user_id = ? AND book_id = ?
    `;
  
    const updateBookQuery = `
      UPDATE book SET quantity = quantity + 1 WHERE book_id = ?
    `;
  
    // 반납을 위한 쿼리 실행
    connection.query(deleteLoanQuery, [userId, bookId], (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error('대출 기록 삭제 실패:', deleteErr);
        return res.status(500).json({ message: '대출 기록 삭제 실패' });
      }
  
      if (deleteResult.affectedRows === 0) {
        // 대출 기록이 없는 경우 반납을 허용하지 않음
        console.error('대출 기록이 없습니다. 반납할 수 없습니다.');
        return res.status(400).json({ message: '대출 기록이 없습니다. 반납할 수 없습니다.' });
      }
  
      // 대출 기록 삭제 성공한 후에 책 수량 업데이트 쿼리 실행
      connection.query(updateBookQuery, [bookId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('책 수량 업데이트 실패:', updateErr);
          return res.status(500).json({ message: '책 수량 업데이트 실패' });
        }
        res.status(200).json({ message: '책 반납 및 수량 업데이트 성공' });
      });
    });
  });
  
  app.post('/extension/:bookId', (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.body.userId; // 요청 데이터에서 userId를 가져옴
  
    // 연장을 위한 SQL 쿼리
    const extensionQuery = `
      UPDATE loan
      SET due_date = DATE_ADD(due_date, INTERVAL 7 DAY)
      WHERE user_id = ? AND book_id = ?;
    `;
  
    // 연장 전에 대출 기록 확인
    const checkLoanQuery = `
      SELECT * FROM loan WHERE user_id = ? AND book_id = ?;
    `;
  
    // 대출 기록 확인 쿼리 실행
    connection.query(checkLoanQuery, [userId, bookId], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('대출 기록 확인 실패:', checkErr);
        return res.status(500).json({ message: '대출 기록 확인 실패' });
      }
  
      if (checkResult.length === 0) {
        // 대출 기록이 없는 경우 연장을 허용하지 않음
        console.error('대출 기록이 없습니다. 연장할 수 없습니다.');
        return res.status(400).json({ message: '대출 기록이 없습니다. 연장할 수 없습니다.' });
      }
  
      // 대출 기록이 있는 경우 연장을 실행
      connection.query(extensionQuery, [userId, bookId], (err, result) => {
        if (err) {
          console.error('책 연장 실패:', err);
          return res.status(500).json({ message: '책 연장 실패' });
        }
        res.status(200).json({ message: '책 연장 성공' });
      });
    });
  });
  
  app.get('/userInfo/:userId', (req, res) => {    
    const userId = req.params.userId;
  
    // 데이터베이스에서 특정 사용자의 정보를 가져오는 쿼리
    const query = `
      SELECT username, email
      FROM user
      WHERE user_Id = ?
    `;
  
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.error('사용자 정보 가져오기 오류:', err);
        return res.status(500).json({ message: '사용자 정보 가져오기 오류' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: '사용자를 찾을 수 없음' });
      }
  
      const userInfo = result[0];
      res.status(200).json(userInfo);
    });
  });
  
  app.get('/borrowedBooks/:userId', (req, res) => {
    const userId = req.params.userId;
  
    // 데이터베이스에서 해당 사용자가 대출한 책 목록을 가져오는 쿼리
    const query = `
      SELECT l.book_id, b.book_name, l.borrowed_date, l.due_date
      FROM loan l
      JOIN book b ON l.book_id = b.book_id
      WHERE l.user_id = ?;
    `;
  
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.error('대출한 책 목록 가져오기 오류:', err);
        return res.status(500).json({ message: '대출한 책 목록 가져오기 오류' });
      }
  
      res.status(200).json(result);
    });
  });
  
 

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 시작되었습니다.`);
});
