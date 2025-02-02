import React from 'react'
import './reserve.css'
import Navbar from './components/navbar'

function Reserve_Page() {
  return (
    <>
    <Navbar />
      <div>
        
        <div className='container'>
          <div className=''>ห้องประชุม/รายการ</div>
          <div>รายการ ห้องประชุม</div>
          <div>แสดง</div>
        </div>
        <div className="blue-bar">รายการ</div>
      </div>
    </>
  )
}

export default Reserve_Page