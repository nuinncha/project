import React from 'react'
import './reserve.css'
import room1 from './assets/room1.png';
import Navbar from './components/navbar'
import room2 from './assets/room2.png';

function Reserve_Page() {
  return (
    <>
      <Navbar />
      <div>

        <div className='container'>
          <div className='row'>
            <div className=''>ห้องประชุม/รายการ</div>
            <div>รายการ ห้องประชุม</div>
            <div style={{ display: "flex" }}>
              <label>แสดง</label>
              <div className='dropdown-container'>
                <select name="q" id="">
                  <option value="1">1 รายการ</option>
                  <option value="2">2 รายการ</option>
                </select>
              </div>
              <button className="btn-go">Go</button>
            </div>
            <div className="blue-bar">รายการ</div>

          </div>
        </div>
        {/* <div className='room1'>
          <img src={room1} className='picture' alt="room1" />
        </div> */}

        <table>
          <tr className='thead'>
            <td style={{paddingLeft:"400px"}}></td>
            <td style={{paddingRight:"350px"}}>รายละเอียด</td>
            <td style={{paddingLeft:"400px"}}></td>
          </tr>
          <tr>
            <td>
              <img src={room1} className='picture' alt="room1" />
            </td>
            <td>
              <span className='txtroom'>ห้องประชุม</span><br />
              <span>Lorem ipsum dolor sit,</span>
            </td>
            <td style={{alignItems:"center"}}>
              <button>ปุ่ม</button>
              <button>ปุ่ม2</button>
            </td>
          </tr>
          <tr>
            <td>
              <img src={room2} className='picture' alt="room1" />
            </td>
            <td>
              <span className='txtroom'>ห้องประชุม</span><br />
              <span>Lorem ipsum dolor sit,</span>
            </td>
            <td>
              <button>ปุ่ม</button>
              <button>ปุ่ม2</button>
            </td>
          </tr>
        </table>
      </div>
    </>
  )
}

export default Reserve_Page