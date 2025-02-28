import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi'; // นำเข้าไอคอนรูปคนจาก react-icons
import 'bootstrap/dist/css/bootstrap.min.css'; // อย่าลืมเพิ่มการนำเข้า CSS ของ Bootstrap

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ลบ token
    navigate('/'); // กลับไปหน้า Login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          หน้าหลัก
        </a>
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
            <li className="nav-item">
              <a className="nav-link" href="reserve">
                จองห้องประชุม  
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/check">
                ตรวจสอบ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/history">
                ประวัติการจอง
              </a>
            </li>

            
          </ul>
          {/* เมนูโปรไฟล์เป็นไอคอน */}
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <FiUser size={20} /> {/* ไอคอนรูปคน */}
            </button>
            <ul className="dropdown-menu " aria-labelledby="profileDropdown">
              <li><a className="dropdown-item" href="/profile">โปรไฟล์</a></li>
              <li><a className="dropdown-item" href="/dashboard">ข้อมูล Dashboard</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li>

                
                <button className="dropdown-item" onClick={handleLogout}>
                  ออกจากระบบ
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
