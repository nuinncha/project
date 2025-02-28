import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import roombooking from './assets/roombooking.png'
import './register.css'

function Welcome_Page() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ฟังก์ชันส่งข้อมูลไปยังเซิร์ฟเวอร์
  const handleSignUp = async () => {
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

        // 👉 เก็บ Token ลง localStorage
        localStorage.setItem('token', result.token);

        // 👉 เปลี่ยนหน้าไปที่ Home
        navigate('/home');

      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error Loginng in:", error);
    }
  };

  return (
    <section className='top1'>
      <div className="left-box">
        <div>
          <div className="head-login">WELCOME BACK!</div>
          <div className='text4'>Welcome back! Please enter your details.</div>

          <div className="text">Email</div>
          <input 
            className="button1" 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="text">Password</div>
          <input 
            className="button1" 
            type="password" 
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <div>Remember me</div>

          <div>
            <button className="button2" onClick={handleSignUp}>
              Sign up
            </button>
          </div>

          <div className="account-link">
            Have an account? <a href="">Sign in</a>
          </div>

          <div className='picture-container'>
            <img src={roombooking} className='img-register' alt="roombooking" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome_Page;
