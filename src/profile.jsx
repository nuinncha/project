import React from "react";
import Navbar from "./components/navbar";
import './profile.css';
import { FaEnvelope, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

function Profile_Page() {
    const user = {
        name: "Alice Smith",
        email: "alice@example.com",
        role: "employee",
    };

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">A</div>
                        <h2>{user.name}</h2>
                        <p>{user.role}</p>
                    </div>
                    <div className="profile-info">
                        <div className="info-item">
                            <FaEnvelope className="icon" /> <strong>อีเมล:</strong> {user.email}
                        </div>
                        <div className="info-item">
                            <FaBriefcase className="icon" /> <strong>บทบาท:</strong> {user.role}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile_Page;
