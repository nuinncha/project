import { useState } from 'react';
import roombooking from './assets/roombooking.png';
import './register.css';
import { useNavigate } from 'react-router-dom';

function Register_Page() {
  // State สำหรับเก็บค่าจาก input
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ฟังก์ชันส่งข้อมูลไปยังเซิร์ฟเวอร์
  const handleSignup = async () => {
    const userData = { name, email, password };

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();
      if (response.ok) {
        alert("Sign-up successful!");
        navigate('/welcome');
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Failed to sign up. Please try again.");
    }
  };

  return (
    <section >
      <div className="left-box">
        <div>
          <div className="head-login">Get Started Now</div>
          
          <div className="text">Name</div>
          <input 
            className="button1" 
            type="text" 
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="text">Email address</div>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <button className="button2" onClick={handleSignup}>Sign up</button>
          
          <div className='text3'>or</div>

          <div className="account-link">Have an account?
            <a href="">Sign in</a>
          </div>

          <div className='picture-container'>
            <img src={roombooking} className='img-register' alt="roombooking" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register_Page;
