import React from 'react';

function Navbar() {
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
              <a className="nav-link" href="/admin">
                อนุมัติ
              </a>
            </li>
          </ul>
          <a href="/welcome" className="btn btn-primary">
            Login
          </a>
          <button onClick={() => {
        localStorage.removeItem('token'); // ลบ token
        navigate('/'); // กลับไปหน้า Login
      }}>
        Logout
      </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
