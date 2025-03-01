import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import './history.css';
import { RiFileHistoryFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function History_Page() {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get token from localStorage

        if (!token) {
            setError("Token not found. Please log in.");
            setLoading(false);
            return;
        }

        fetch('http://localhost:3000/booking', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Send token in Authorization header
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setBookingHistory(data);
                }
            })
            .catch(err => setError("Failed to fetch booking history"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return (
        <>
            <Navbar />
            <div className="error-container">
                <h2>{error}</h2>
                <p>Please log in to view your booking history.</p>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="history_container">
                <RiFileHistoryFill className="history_icon" />
                <span className="header-font kanit_font">ประวัติการจอง</span>
            </div>

            {/* Table to display booking data */}
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
                            <tr key={booking._id}>
                                <td>{index + 1}</td>
                                <td>{booking.roomName}</td> {/* เปลี่ยนจาก booking.room เป็น booking.roomName */}
                                <td>{new Date(booking.startDate).toLocaleDateString()}</td> {/* แปลงวันที่ให้เป็นรูปแบบที่อ่านได้ */}
                                <td>{booking.startTime} - {booking.endTime}</td> {/* ใช้ startTime และ endTime */}
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
