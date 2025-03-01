import React, { useEffect, useState } from 'react';
import './reserve.css';
import room1 from './assets/room1.png';
import Navbar from './components/navbar';
import room2 from './assets/room2.png';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { RiFileList3Fill } from "react-icons/ri";

function Reserve_Page() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const udata = localStorage.getItem('user')
    setUser(JSON.parse(udata));

  }, []);




  const handleBook1 = (e) => {
    localStorage.setItem('room', "ห้องประชุม 1");
    navigate('/list');
  };

  const handleBook2 = (e) => {
    localStorage.setItem('room', "อาคารเฉลิมพระเกียรติ");
    navigate('/list');
  };

  const handletest = (e) => {
    console.log(user.email)
  };

  const approve = () => {
    const booking = {
      roomName: "Conference Room A",
      participants: 10,
      topic: "Project Planning",
      bookerName: "John Doe",
      phone: "0812345678",
      reason: "Weekly Meeting",
      department: "IT",
      purpose: "Discuss project updates",
      startDate: "2024-03-01T00:00:00Z",
      startTime: "09:00 AM",
      endDate: "2024-03-01T00:00:00Z",
      endTime: "11:00 AM",
      equipment: ["Projector", "Microphone"],
      otherDetails: "Need HDMI cable"
    }

    Swal.fire({
      title: "รายละเอียดของห้องประชุม",
      html: `
        
        <p><strong>ห้อง:</strong> ${booking.roomName}</p>
        <p><strong>หัวข้อ:</strong> ${booking.topic}</p>
        <p><strong>ผู้จอง:</strong> ${booking.bookerName}</p>
        <p><strong>เบอร์โทร:</strong> ${booking.phone}</p>
        <p><strong>แผนก:</strong> ${booking.department}</p>
        <p><strong>วัตถุประสงค์:</strong> ${booking.purpose}</p>
        <p><strong>วันที่เริ่ม:</strong> ${booking.startDate}</p>
        <p><strong>เวลาเริ่ม:</strong> ${booking.startTime}</p>
        <p><strong>วันที่สิ้นสุด:</strong> ${booking.endDate}</p>
        <p><strong>เวลาสิ้นสุด:</strong> ${booking.endTime}</p>
        <p><strong>อุปกรณ์:</strong> ${booking.equipment.join(", ") || "ไม่มี"}</p>
        <p><strong>รายละเอียดเพิ่มเติม:</strong> ${booking.otherDetails || "ไม่มี"}</p>
      `,
    });
  };

  return (
    <>
      <Navbar />
      <div className='bg-reserve'>
        <div className='reserve-container'>
          <div className='reserve-header'>
            <RiFileList3Fill />
            <span>รายการ ห้องประชุม</span>
          </div>
          <div style={{ display: "flex" }}>
            <h6 style={{ marginTop: "20px" }}>แสดง 2 รายการ</h6>
          </div>

          <table className='reserve-table'>
            <thead>
              <tr className='thead-blue-reserve'>
                <th></th>
                <th>รายละเอียด</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src={room1} className='picture' alt="room1" />
                </td>
                <td className='room-details'>
                  <span className='txtroom'>ห้องประชุม 1</span><br />
                  <span>ชั้น 3,</span>
                </td>
                <td className='action-buttons'>
                  <button className='button-green' onClick={handleBook1}>จองห้องประชุม</button>
                  <button className='button-yellow' onClick={handletest} >รายละเอียด</button>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={room2} className='picture' alt="room2" />
                </td>
                <td className='room-details'>
                  <span className='txtroom'>อาคารเฉลิมพระเกียรติ</span><br />
                  <span>ห้องประชุมใหญ่,</span>
                </td>
                <td className='action-buttons'>
                  <button className='button-green' onClick={handleBook2}>จองห้องประชุม</button>
                  <button className='button-yellow' onClick={approve}>รายละเอียด</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Reserve_Page;
