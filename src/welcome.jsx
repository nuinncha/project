import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './register.css'

function Welcome_Page() {
  const [count, setCount] = useState(0)

  return (
    <section >
      <div className="left-box">
        <div>
          <div className="head-login">
            WELCOME BACK!
          </div>
          <div className='text4'>
            Welcome back! Please enter your details.
          </div>
          <div className="text">
            Email
          </div>
          <input className="button1" type="text" placeholder="Enter your email" />
          <div className="text" >
            Password
          </div>
          <input className="button1" type="text" placeholder="**********" />
          <br />
          <div>
            Remember me
          </div>
          <div>
            <button className="button2">
              Sign up
            </button>
          </div>
          <div>
            <button className="button3">Sign in with google</button>
          </div>
          <div className="account-link">
            Have an account?
            <a href="">Sign in</a>
          </div>
          <div>
            <img src="https://cdn.discordapp.com/attachments/1306796011955683349/1310571879286964284/pexels-photo-1181395.png?ex=676b476d&is=6769f5ed&hm=070e00e55153c0e0f84a535cb5117f5280b8696b3a464a35cf3c99fca00e6b39&"
              alt="roombooking" />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Welcome_Page
