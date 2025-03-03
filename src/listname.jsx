import React, { useState, useEffect } from "react"; 
import Navbar from "./components/navbar";
import './history.css';
import { RiUserStarFill } from "react-icons/ri";

function Listname_Page() {
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get token from localStorage

        if (!token) {
            setError("Token not found. Please log in.");
            setLoading(false);
            return;
        }

        fetch('http://localhost:3000/frequent-bookers', {
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
                    setUserBookings(data);
                }
            })
            .catch(() => setError("Failed to fetch frequent bookers"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return (
        <>
            <Navbar />
            <div className="error-container">
                <h2>{error}</h2>
                <p>Please log in to view frequent bookers.</p>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="bg-history">
                <div className="history_container">
                    <div className="box-history">
                        <RiUserStarFill className="history_icon" />
                        <span className="">รายชื่อผู้ใช้ที่จองห้องบ่อย</span>
                    </div>

                    {/* Table to display frequent bookers */}
                    <div className="table-container">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ชื่อผู้ใช้</th>
                                    <th>จำนวนครั้งที่จอง</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userBookings.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.bookingCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Listname_Page;
