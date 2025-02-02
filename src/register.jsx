import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import roombooking from './assets/roombooking.png'
// import './App.css'
import './register.css'

function Register_Page() {
  return (
    <section >
      <div className="left-box">
        <div>
          <div className="head-login">Get Started Now</div>
          <div className="text">Name</div>
          <input className="button1" type="text" placeholder="Enter your name" />
          <div className="text" >Email address</div>
          <input className="button1" type="text" placeholder="Enter your email" />
          <div className="text" >Password</div>
          <input className="button1" type="text" placeholder="Enter your password" />
          <br />
          <button className="button2">Sign up</button>
          <div className='text3'>or</div>
          <button className="button3">Sign in with google</button>
          <div className="account-link">Have an account?
            <a href="">Sign in</a>
          </div>
          <div>
            <img src={roombooking} className='picture' alt="roombooking" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register_Page
