import React, { useEffect, useState } from 'react';
import Navbar from "./components/navbar";
import './profile.css';
import { FaEnvelope, FaBriefcase, FaUserEdit } from "react-icons/fa";

function Edit_Page() {
    const [user, setUser] = useState({ name: "", email: "", role: "" });
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedData = JSON.parse(userData);
            setUser(parsedData);
            setNewName(parsedData.name);
        }
    }, []);

    const handleSave = () => {
        const updatedUser = { ...user, name: newName };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setEditingName(false);
    };

    return (
        <>
            <Navbar />
            <div className="bg-history">
                <div className="profile-container">
                    <div className="profile-card-empty">
                        <div className="circle">{user.name.charAt(0)}</div>
                        {editingName ? (
                            <input 
                                type="text" 
                                value={newName} 
                                onChange={(e) => setNewName(e.target.value)} 
                                onBlur={handleSave} 
                                autoFocus
                            />
                        ) : (
                            <h3 style={{ color: 'white' }} onClick={() => setEditingName(true)}>
                                {user.name} <FaUserEdit className="edit-icon" />
                            </h3>
                        )}
                        <p style={{ color: 'white' }}>{user.role}</p>
                    </div>
                    <div className="profile-card">
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
            </div>
        </>
    );
}

export default Edit_Page;
