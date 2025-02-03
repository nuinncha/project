import React from 'react'
import './reserve.css'
import Navbar from './components/navbar'

function Reserve_Page() {
  return (
    <>
      <Navbar />
      <div>

        <div className='container'>
          <div className='row'>
            <div className='left'>ห้องประชุม/รายการ</div>
            <div>รายการ ห้องประชุม</div>
            <div style={{ display: "flex" }}>

              <label>แสดง</label>
              <div className='drop-down'>
                <select name="q" id="">
                  <option value="5">5 รายการ</option>
                  <option value="5">5 รายการ</option>
                  <option value="5">5 รายการ</option>
                  <option value="5">5 รายการ</option>
                </select>
              </div>
              <button className="btn-go">Go</button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Reserve_Page