import React, { useEffect, useState } from 'react';
import './reserve.css';
import room1 from './assets/room1.png';
import Navbar from './components/navbar';
import room2 from './assets/room2.png';
import room3 from './assets/room3.png';
import room4 from './assets/room4.png';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { RiFileList3Fill } from "react-icons/ri";
import { TfiInfoAlt } from "react-icons/tfi";

function Reserve_Page() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const udata = localStorage.getItem('user');
    setUser(JSON.parse(udata));
  }, []);

  const handleBook1 = () => {
    localStorage.setItem('room', "ห้องประชุม 1");
    navigate('/list');
  };

  const handleBook2 = () => {
    localStorage.setItem('room', "อาคารเฉลิมพระเกียรติ");
    navigate('/list');
  };

  const room1_detail = () => {
    Swal.fire({
      title: "รายละเอียดของห้องประชุม",
      html: `
        <img src="${room3}" width="400" height="200" style="border-radius: 10px; margin-bottom: 10px;" alt="รูปห้องประชุม 1">
        <table style="width:100%; border-collapse: collapse; border: 2px solid #A5D6A7;">
          <tr><th style="background:#C8E6C9; padding:8px; text-align:left;">ชื่อห้อง</th><td style="padding:8px;">ห้องประชุม 1</td></tr>
          <tr><th style="background:#C8E6C9; padding:8px; text-align:left;">รายละเอียด</th><td style="padding:8px;">ห้องประชุมขนาดเล็ก</td></tr>
          <tr><th style="background:#C8E6C9; padding:8px; text-align:left;">อาคาร/สถานที่</th><td style="padding:8px;">อาคารเทศบาล</td></tr>
          <tr><th style="background:#C8E6C9; padding:8px; text-align:left;">จำนวนที่นั่ง</th><td style="padding:8px;">60</td></tr>
        </table>
      `,
      width: "600px",
    });
  };

  const room2_detail = () => {
    Swal.fire({
      title: "รายละเอียดของห้องประชุม",
      html: `
        <img src="${room4}" width="400" height="200" style="border-radius: 10px; margin-bottom: 10px;" alt="รูปอาคารเฉลิมพระเกียรติ">
        <table style="width:100%; border-collapse: collapse; border: 2px solid #A5D6A7;">
          <tr><th style="background:#C8E6C9; padding:8px; text-align:left;">ชื่อห้อง</th><td style="padding:8px;">อาคารเฉลิมพระเกียรติ</td></tr>
          <tr><th style="background:#C8E6C9; padding:8px; text-align:left;">รายละเอียด</th><td style="padding:8px;">ห้องประชุมขนาดใหญ่</td></tr>
          <tr><th style="background:#C8E6C9; padding:8px; text-align:left;">อาคาร/สถานที่</th><td style="padding:8px;">อาคารเฉลิมพระเกียรติ</td></tr>
          <tr><th style="background:#C8E6C9; padding:8px; text-align:left;">จำนวนที่นั่ง</th><td style="padding:8px;">400</td></tr>
        </table>
      `,
      width: "600px",
    });
  };

  return (
    <>
      <Navbar />
      <div className='container-reserve' style={{ padding: "40px" }}>
        <div className='icon-reserve'>
          <RiFileList3Fill  />
          <span className='head-reserve'>รายการห้องประชุม</span>
          <h6 className='text-reserve'>แสดง 2 รายการ</h6>
        </div>

        <div className='reserve-container'>
          <table className='reserve-table modern-table'>
            <thead>
              <tr className='thead-green-reserve' style={{ backgroundColor: '#47b34aff', color: '#505e1bff' }}>
                <th></th>
                <th>รายละเอียด</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src={room1} className='picture' alt="room1" style={{ borderRadius: "10px", width: "150px" }} /></td>
                <td className='room-details'>
                  <span className='txtroom' style={{ fontWeight: "bold", fontSize: "18px", color: "#2E7D32" }}>ห้องประชุม 1</span><br />
                  <span>ห้องประชุมขนาดเล็ก พร้อมสิ่งอำนวยความสะดวกครบครัน</span>
                </td>
                <td className='action-buttons'>
                  <button className='button-green' onClick={handleBook1} style={greenBtnStyle}>จองห้อง</button>
                  <button className='button-yellow' onClick={room1_detail} style={detailBtnStyle}><TfiInfoAlt style={{ marginRight: '5px' }} />รายละเอียด</button>
                </td>
              </tr>

              <tr>
                <td><img src={room2} className='picture' alt="room2" style={{ borderRadius: "10px", width: "150px" }} /></td>
                <td className='room-details'>
                  <span className='txtroom' style={{ fontWeight: "bold", fontSize: "18px", color: "#2E7D32" }}>อาคารเฉลิมพระเกียรติ</span><br />
                  <span>ห้องประชุมใหญ่ เหมาะสำหรับการสัมมนาหรือจัดเลี้ยง</span>
                </td>
                <td className='action-buttons'>
                  <button className='button-green' onClick={handleBook2} style={greenBtnStyle}>จองห้อง</button>
                  <button className='button-yellow' onClick={room2_detail} style={detailBtnStyle}><TfiInfoAlt style={{ marginRight: '5px' }} />รายละเอียด</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const greenBtnStyle = {
  backgroundColor: "#4CAF50",
  color: "#fff",
  padding: "8px 16px",
  border: "none",
  borderRadius: "8px",
  marginBottom: "5px",
  cursor: "pointer"
};

const detailBtnStyle = {
  backgroundColor: "#fdc408ff",
  color: "#ffffffff",
  padding: "8px 16px",
  border: "none",
  borderRadius: "8px",
  marginTop: "5px",
  cursor: "pointer"
};

export default Reserve_Page;
