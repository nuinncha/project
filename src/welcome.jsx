import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import roombooking from './assets/roombooking.png'
import cat from './assets/cat.mp4'; // นำเข้าวิดีโอ
import './welcome.css'
                                    
function Welcome_Page() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // ฟังก์ชันส่งข้อมูลไปยังเซิร์ฟเวอร์
  const handleSignIn = async () => {
    const userData = { email, password };

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();
      if (response.ok) {
        alert("Login successful!");
        console.log(result)

        // 👉 เก็บ Token ลง localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.userData));
        console.log("TEST USER DATA:",JSON.stringify(result.userData));
        // 👉 เปลี่ยนหน้าไปที่ Home
        navigate('/');

      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error Loginng in:", error);
    }
  };

 return (
    <section className='bg-welcome'>
      <div className="welcome-box">
        {/* กล่องซ้าย - วิดีโอ */}
        <div className="left-box">
          <video
            className="welcome-video"
            src={cat}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* กล่องขวา - ฟอร์ม */}
        <div className="right-box">
          <h2 className="head-welcome">WELCOME BACK!</h2>
          <p className="text-welcome">Welcome back! Please enter your details.</p>
          
          <label>Email</label>
          <input className="input button1-welcome " type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}  />

          <label>Password</label>
          <input className="input button1-welcome " type="password" placeholder="**********" value={password} onChange={(e)=>setPassword(e.target.value)} />

          <button className="button2-welcome" onClick={(handleSignIn)}>
            Sign in
          </button>

          <p className="account-link">Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </section>
  );
}

export default Welcome_Page;
