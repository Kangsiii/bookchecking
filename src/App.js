import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginChoice from './component/LoginChoice';
import Login from './component/Login';
import Signup from './component/Signup';
import Usermenu from './component/Usermenu';
import AdminLogin from './component/AdminLogin';
import Adminmenu from './component/Adminmenu';
import Booklist from './component/Booklist';
import BookDetail from './component/Bookdetail';
import './css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='app-container'>
          <Routes>
            <Route path="/" element={<LoginChoice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Usermenu" element={<Usermenu />} />
            <Route path="/Adminmenu" element={<Adminmenu />} />
            <Route path="/Booklist" element={<Booklist />} />
            <Route path="/books/:bookId" Component={BookDetail}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;