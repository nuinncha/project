import { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import cat from './assets/cat.mp4'; // นำเข้าวิดีโอ

function Register_Page() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <section className='bg-welcome'>
      <div className="welcome-box">
        {/* ซ้าย - วิดีโอ */}
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

        {/* ขวา - ฟอร์มสมัคร */}
        <div className="right-box">
          <h2 className="head-welcome">GET START NOW</h2>
          <p className="text-welcome">Create your account to continue.</p>

          <label>Name</label>
          <input
            className="input button1-welcome"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            className="input button1-welcome"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            className="input button1-welcome"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button2-welcome" onClick={handleSignup}>
            Sign up
          </button>

          <p className="account-link">
            Already have an account? <a href="/welcome">Sign in</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register_Page;
