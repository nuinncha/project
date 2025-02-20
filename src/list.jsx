import React from 'react'
import Navbar from "./components/navbar";
import './list.css'
import { FiSave } from "react-icons/fi";
import { RiFileEditFill } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { TbNumber123 } from "react-icons/tb";
import { RiTodoFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa6";
import { PiGitBranchBold } from "react-icons/pi";
import { FaClock } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";


function List_Page() {
  return (
    <>
      <div>
      <Navbar />
        <div className='wrapper-list'>
          <div className='container-list'>
            <div style={{ marginTop: "15px" }}>
              <RiFileEditFill className='icon-size' />&nbsp;&nbsp;
              <span className="text-position">เพิ่ม การจอง</span>
              <h5 style={{ marginTop: "15px" }}>รายละเอียดการจอง</h5>
            </div>
            {/* ชื่อห้องและจำนวนผู้เข้าร่วม */}
            <div className="row">
              <div className="left">
                <label>ชื่อห้อง</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty2">
                    <RiTodoFill />
                  </div> {/* กล่องเปล่า */}
                  {/* <input className='long-time-input' type="text" placeholder="" /> */}
                  <select className='long-time-input' name="roomName" id="roomName">
                    <option value="1">ห้องประชุม 1</option>
                    <option value="1">อาคารเฉลิมพระเกียรติ</option>
                  </select>
                </div>
              </div>

              <div className="right">
                <label>จำนวนผู้เข้าประชุม</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty"> <TbNumber123 /> </div> {/* กล่องเปล่า */}
                  <input className='long-time-input' type="number" placeholder="1" />
                </div>
              </div>
            </div>

            {/* หัวข้อ */}
            <div className="row">
              <div className="left">
                <label>หัวข้อ</label>
                <div className="input-group">
                  <div className="empty-box">
                    <FaPen />
                  </div> {/* กล่องเปล่า */}
                  <input className='long-input' type="text" placeholder="" />
                </div>
              </div>
            </div>

            {/* ชื่อผู้จองและโทรศัพท์ */}
            <div className="row">
              <div className="left">
                <label>ชื่อผู้จอง</label>
                <div className="input-group">
                  <div className="empty-box ">
                    <RiUser3Fill />
                  </div> {/* กล่องเปล่า */}
                  <input className='long-time-input' type="text" placeholder="" />
                </div>
              </div>

              <div className="right">
                <label>โทรศัพท์</label>
                <div className="input-group">
                  <div className="empty-box">
                    <FaPhoneAlt />
                  </div> {/* กล่องเปล่า */}
                  <input className='long-time-input' type="text" placeholder="" />
                </div>
              </div>
            </div>

            {/* ใช้สำหรับ */}
            <div className="row">
              <div className="left">
                <label>ใช้สำหรับ</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty2"><PiGitBranchBold /></div>
                  <select className='select-list'>
                    <option value=""></option>
                    <option value="hr">สำนักปลัด</option>
                    <option value="it">กองช่าง</option>
                    <option value="marketing">กองสาธารณสุข</option>
                    <option value="finance">กองการศึกษา</option>
                    <option value="operations">กองคลัง</option>
                  </select>
                </div>
              </div>
            </div>


            {/* แผนกที่ขอใช้ */}
            <div className="row">
              <div className="left">
                <label>แผนกที่ขอใช้</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty2"><PiGitBranchBold /></div>
                  <select className='select-list'>
                    <option value=""> </option>
                    <option value="hr">สำนักปลัด</option>
                    <option value="it">กองช่าง</option>
                    <option value="marketing">กองสาธารณสุข</option>
                    <option value="finance">กองการศึกษา</option>
                    <option value="operations">กองคลัง</option>
                  </select>
                </div>
              </div>
            </div>

            {/* วันที่และเวลา */}
            <div className="row">
              <label>วันที่เริ่มต้น/เวลาเริ่มต้น</label>
              <div className="datetime ">
                <div className='row'>
                  <div className="left">
                    <div className="input-group">
                      <div className="empty-box"><FaCalendarAlt /></div>
                      <input type="date" className="long-time-input" />
                    </div>
                  </div>
                  <div className='right'>
                    <div className="input-group">
                      <div className="empty-box"><FaClock /></div>
                      <input type="time" className="long-time-input"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* วันที่และเวลา */}
            <div className="row">
              <label>วันที่เริ่มต้น/เวลาเริ่มต้น</label>
              <div className="datetime">
                <div className='row'>
                  <div className="left">
                    <div className="input-group">
                      <div className="empty-box"><FaCalendarAlt /></div>
                      <input type="date" className="long-time-input" />
                    </div>
                  </div>
                  <div className='right'>
                    <div className="input-group">
                      <div className="empty-box"><FaClock /></div>
                      <input type="time" className="long-time-input" />
                    </div>
                  </div>
                </div>
              </div>
            </div>



            {/* อุปกรณ์ */}
            <div className="row">
              <div className="">
                <label>อุปกรณ์</label>
                <div className="equipment-wrapper">
                  <div className="empty-box icon-inside-empty2"><PiGitBranchBold /></div>
                  <div className='equipment-boxx2 box-margin'>
                    <div className="checkbox-group">
                      <label><input type="checkbox" /> เครื่องคอมพิวเตอร์</label>
                      <label><input type="checkbox" /> โปรเจ็กเตอร์</label>
                      <label><input type="checkbox" /> เครื่องฉายแผ่นใส</label>
                      <label><input type="checkbox" /> ของว่าง</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* อื่นๆ */}
            <div className="row">
              <div className="left">
                <label>อื่นๆ</label>
                <textarea className='details-textarea' placeholder="รายละเอียดเพิ่มเติม"></textarea>
              </div>
            </div>

            {/* ปุ่มบันทึก */}
            <div>
              <button type="submit" className="save-btn">
                <FiSave className="icon-inside-btn" />
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default List_Page 