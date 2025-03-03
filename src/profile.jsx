import React, { useEffect, useState } from 'react';
import Navbar from "./components/navbar";
import './profile.css';
import { FaEnvelope, FaBriefcase } from "react-icons/fa";

function Profile_Page() {

    const [user, setUser] = useState({ name: "", email: "", role: "" });

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    // const user = {
    //     name: "Alice Smith",
    //     email: "alice@example.com",
    //     role: "employee",
    // };

    return (
        <>
            <Navbar />
            <div className="bg-history">
                <div className="profile-container">
                    <div className="profile-card-empty">
                        <div className="circle">A</div>
                        <h3 style={{ color: 'white' }}>{user.name}</h3>
                        <p style={{ color: 'white' }}>{user.role}</p>
                    </div>
                    <div className="profile-card">
                        {/* กล่องข้อมูลอีเมลและบทบาท */}
                        <div className="info-box-email">
                            <div className="info-item">
                                <FaEnvelope className="icon-email" /> <strong>อีเมล:</strong> {user.email}
                            </div>
                        </div>
                        <div className="info-box-role">
                            <FaBriefcase className="icon-role" /> <strong>บทบาท:</strong> {user.role}
                        </div>
                    </div>
                </div>
                <div className="info-item">
                </div>
            </div>
        </>
    );
}

export default Profile_Page;
