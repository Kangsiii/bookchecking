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
import Return from './component/Return';
import Addbook from './component/Addbook';
import Newbook from './component/Newbook';
import Adminuser from './component/Adminuser';
import './css/App.css';
import Bookdetailadmin from './component/Bookdetailadmin';

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
            <Route path="/Return" element={<Return />} />
            <Route path="/Addbook" element={<Addbook />} />
            <Route path="/Newbook" element={<Newbook />} />
            <Route path="/Adminuser" element={<Adminuser />} />
            <Route path="/bookad/:bookId" Component={Bookdetailadmin}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;