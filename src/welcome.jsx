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
        console.log(result)

        // 👉 เก็บ Token ลง localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.userData));

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
    <section className='bg-register'>
      <div className="register-box ">
        <div>
          <div className="head-login">WELCOME BACK!</div>
          <div className='text-welcome'>Welcome back! Please enter your details.</div> <br></br>

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

          <div>
            <button className="button2" onClick={handleSignUp}>
              Sign up
            </button>
          </div>

          <div className="account-link">
            Don't have an account? <a href="/register">Sign in</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome_Page;
