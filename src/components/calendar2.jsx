import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// กำหนด localizer สำหรับ react-big-calendar
const localizer = momentLocalizer(moment);

function Calendar2() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/booking-info')
            .then((res) => res.json())
            .then((data) => {
                const formattedEvents = data.map((item) => {
                    // สร้างวันที่ใหม่จาก startDate และ startTime
                    const startDateTime = new Date(`${item.startDate.split('T')[0]}T${item.startTime}:00`);
                    const endDateTime = new Date(`${item.endDate.split('T')[0]}T${item.endTime}:00`);

                    // กำหนดสีตามห้อง
                    let eventStyle = {};
                    if (item.roomName === 'ห้องประชุม 1') {
                        eventStyle = {
                            backgroundColor: '#c441aa',  // สีพื้นหลัง
                            border: '0.5px solid #c441aa',  // ขอบสีเดียวกันกับพื้นหลัง
                        };
                    } else if (item.roomName === 'อาคารเฉลิมพระเกียรติ') {
                        eventStyle = {
                            backgroundColor: 'rgb(0, 162, 255)',  // สีพื้นหลัง
                            border: '0.5px solid rgb(0, 162, 255)',  // ขอบสีเดียวกันกับพื้นหลัง
                        };
                    }

                    return {
                        title: `${item.topic} (${item.bookerName})`,  // แสดงหัวข้อและชื่อผู้จอง
                        start: startDateTime,
                        end: endDateTime,
                        room: item.roomName,  // เพิ่มข้อมูลห้องที่จอง
                        style: eventStyle,  // เพิ่มสไตล์ที่กำหนดให้กับ event
                    };
                });

                console.log('Formatted events:', formattedEvents);  // ตรวจสอบข้อมูลที่จัดรูปแบบ
                setEvents(formattedEvents);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <BigCalendar
            events={events}
            views={['month', 'week', 'day']}
            step={60}
            defaultView="month"
            localizer={localizer}
            popup={true}  // เพิ่ม popup เมื่อคลิกที่ event
            components={{
                event: ({ event }) => (
                    <div
                        style={{
                            ...event.style,  // ใช้สไตล์ที่กำหนดไว้ในแต่ละ event
                            padding: '5px',
                            borderRadius: '5px',
                            color: '#fff',  // เปลี่ยนสีข้อความให้ขาว
                        }}
                    >
                        <strong>{event.title}</strong><br />
                        <span>{event.room}</span><br />  {/* แสดงชื่อห้อง */}
                        <span>{`${moment(event.start).format('HH:mm')} - ${moment(event.end).format('HH:mm')}`}</span>  {/* แสดงเวลา */}
                    </div>
                ),
            }}
            style={{
                height: '100vh',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
                backgroundColor: '#fff',  // กำหนดพื้นหลังของปฏิทินให้เป็นสีขาว
            }}
        />
    );
}

export default Calendar2;
