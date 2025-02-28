import React from "react";
import Navbar from "./components/navbar";
import './history.css';
import { RiFileHistoryFill } from "react-icons/ri";




function History_Page() {
    // ตัวอย่างข้อมูลประวัติการจอง
    const bookingHistory = [
        { id: 1, room: "ห้องประชุม A", date: "2024-03-01", time: "10:00 - 12:00", status: "อนุมัติ" },
        { id: 2, room: "ห้องประชุม B", date: "2024-03-02", time: "13:00 - 15:00", status: "รออนุมัติ" },
        { id: 3, room: "ห้องประชุม C", date: "2024-03-05", time: "09:00 - 11:00", status: "ยกเลิก" },
    ];

    return (
        <>
            <Navbar />
            <div className="history_container">
                <RiFileHistoryFill  className="history_icon" />
                <span className="headder-font kanit_font">ประวัติการจอง</span>
            </div>

            {/* ตารางแสดงข้อมูล */}
            <div className="table-container">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ห้องประชุม</th>
                            <th>วันที่</th>
                            <th>เวลา</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingHistory.map((booking, index) => (
                            <tr key={booking.id}>
                                <td>{index + 1}</td>
                                <td>{booking.room}</td>
                                <td>{booking.date}</td>
                                <td>{booking.time}</td>
                                <td className={`status ${booking.status.toLowerCase()}`}>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default History_Page;
