import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import "./profile.css";
import { FaEnvelope, FaBriefcase, FaUserEdit } from "react-icons/fa";

function Profile_Page() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            console.log("Token:", token);

            if (!token) {
                setError("กรุณาเข้าสู่ระบบ");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                console.log("Response Status:", response.status);

                if (!response.ok) {
                    throw new Error("ไม่สามารถดึงข้อมูลโปรไฟล์ได้");
                }

                const data = await response.json();
                console.log("User Data:", data);
                setUser(data);
                setNewName(data.name);
            } catch (err) {
                console.error("Fetch Error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSaveName = async () => {
        if (!user) return;

        const updatedUser = { ...user, name: newName };
        setUser(updatedUser); // อัปเดต UI ทันที

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/update-profile", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newName }),
            });

            if (!response.ok) {
                throw new Error("ไม่สามารถอัปเดตชื่อได้");
            }

            console.log("ชื่อได้รับการอัปเดตเรียบร้อย");
        } catch (error) {
            console.error("Error updating name:", error.message);
        }

        setEditingName(false);
    };

    if (loading) return <p>กำลังโหลดข้อมูล...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!user) return <p>ไม่พบข้อมูลผู้ใช้</p>;

    return (
        <>
            <Navbar />
            <div className="bg-history">
                <div className="profile-container">
                    <div className="profile-card-empty">
                        <div className="circle">
                            {newName.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        {editingName ? (
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onBlur={handleSaveName}
                                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                                autoFocus
                            />
                        ) : (
                            <h3 style={{ color: "white" }}>
                                {newName}{" "}
                                <FaUserEdit
                                    className="edit-icon"
                                    onClick={() => setEditingName(true)}
                                    style={{ cursor: "pointer", marginLeft: "8px" }}
                                />
                            </h3>
                        )}
                        <p style={{ color: "white" }}>{user.role}</p>
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

export default Profile_Page;
