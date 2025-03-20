import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi'; // ไอคอนรูปคน
import 'bootstrap/dist/css/bootstrap.min.css'; // นำเข้า Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // ตรวจสอบ token
  const user = JSON.parse(localStorage.getItem("user")); // ดึงข้อมูลผู้ใช้และแปลงเป็น Object

  const handleLogout = () => {
    localStorage.removeItem('token'); // ลบ token ออกจาก localStorage
    localStorage.removeItem('user'); // ลบข้อมูลผู้ใช้
    navigate('/'); // กลับไปหน้า Login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">หน้าหลัก</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>  
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="/reserve">จองห้องประชุม</a></li>
            <li className="nav-item"><a className="nav-link" href="/history">ประวัติการจอง</a></li>
            {/* แสดงปุ่ม "ตรวจสอบ" เฉพาะเมื่อผู้ใช้มี role เป็น admin */}
            {user && user.role === "admin" && (
              <li className="nav-item"><a className="nav-link" href="/check">ตรวจสอบ</a></li>
            )}
          </ul>

          {/* ตรวจสอบ token เพื่อแสดงเมนูโปรไฟล์ หรือ ปุ่ม Login */}
          
            {token ? (
              <div className='dropdown'>
                <button 
                  className="btn btn-secondary dropdown-toggle" 
                  type="button" 
                  id="profileDropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <FiUser size={20} />
                </button>
                <ul 
                  className="dropdown-menu dropdown-menu-end" 
                  aria-labelledby="profileDropdown" 
                  style={{ minWidth: "180px", maxWidth: "250px", position: "absolute", zIndex: 1050 }}
                >
                  <li><a className="dropdown-item" href="/profile">โปรไฟล์</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>ออกจากระบบ</button>
                  </li>
                </ul>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={() => navigate('/welcome')}>Login</button>
            )}
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
