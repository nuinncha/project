import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './register.css'

function Register_Page() {
  const [count, setCount] = useState(0)

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
            <img src="https://cdn.discordapp.com/attachments/1306796011955683349/1310571879286964284/pexels-photo-1181395.png?ex=676b476d&is=6769f5ed&hm=070e00e55153c0e0f84a535cb5117f5280b8696b3a464a35cf3c99fca00e6b39&" alt="roombooking" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register_Page
