import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import th from "date-fns/locale/th"; // ใช้ภาษาไทย
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/th"; // โหลด locale ภาษาไทย


dayjs.locale("th"); // ตั้งค่าให้ใช้ภาษาไทย

const locales = { th };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }), // เปลี่ยนให้เริ่มต้นจากวันอาทิตย์
    getDay,
    locales,
});

// ฟังก์ชันแปลงวันที่ให้เป็นภาษาไทย
const formatDateThai = (date, options) =>
    new Intl.DateTimeFormat("th-TH", options).format(date);

const messages = {
    allDay: "ตลอดวัน",
    previous: "ก่อนหน้า",
    next: "ถัดไป",
    today: "วันนี้",
    month: "เดือน",
    week: "สัปดาห์",
    day: "วัน",
    agenda: "กำหนดการ",
    date: "วันที่",
    time: "เวลา",
    event: "กิจกรรม",
    noEventsInRange: "ไม่มีเหตุการณ์ในช่วงนี้",
    showMore: (total) => `+ แสดงอีก ${total} รายการ`,
};

const formats = {
    dateFormat: "d",
    dayFormat: (date) => formatDateThai(date, { weekday: "short" }), // จ-อ-พ-พฤ-ศ-ส-อา
    weekdayFormat: (date) => formatDateThai(date, { weekday: "long" }), // วันจันทร์-วันอาทิตย์
    monthHeaderFormat: (date) => formatDateThai(date, { month: "long", year: "numeric" }), // มีนาคม 2567
    dayHeaderFormat: (date) => formatDateThai(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" }), // วันพุธ 6 มีนาคม 2567
    dayRangeHeaderFormat: ({ start, end }) =>
        `${formatDateThai(start, { day: "numeric", month: "long", year: "numeric" })} - ${formatDateThai(end, { day: "numeric", month: "long", year: "numeric" })}`, // 6 มีนาคม 2567 - 10 มีนาคม 2567
};

function Calendar2() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/booking-info")
            .then((res) => res.json())
            .then((data) => {
                const approvedBookings = data.filter((item) => item.status === "อนุมัติ");

                const formattedEvents = approvedBookings.map((item) => {
                    const startDateTime = dayjs(`${item.startDate}T${item.startTime}`).toDate();
                    const endDateTime = dayjs(`${item.endDate}T${item.endTime}`).toDate();

                    let eventStyle = {};
                    if (item.roomName === "ห้องประชุม 1") {
                        eventStyle = { backgroundColor: "#c441aa", border: "0.5px solid #c441aa" };
                    } else if (item.roomName === "อาคารเฉลิมพระเกียรติ") {
                        eventStyle = { backgroundColor: "rgb(0, 162, 255)", border: "0.5px solid rgb(0, 162, 255)" };
                    }

                    return {
                        title: `${item.topic} (${item.bookerName})`,
                        start: startDateTime,
                        end: endDateTime,
                        room: item.roomName,
                        booker: item.bookerName,
                        description: item.description,
                        style: eventStyle,
                    };
                });

                setEvents(formattedEvents);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div style={{ position: "relative" }}>
            {selectedEvent && (
                <div
                    style={{
                        position: "fixed",
                        top: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#fff",
                        padding: "15px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                        zIndex: 1000,
                    }}
                >
                    <h3>รายละเอียดการจอง</h3>
                    <p><strong>หัวข้อ:</strong> {selectedEvent.title}</p>
                    <p><strong>ผู้จอง:</strong> {selectedEvent.booker}</p>
                    <p><strong>ห้อง:</strong> {selectedEvent.room}</p>
                    <p>
                        <strong>เวลา:</strong>{" "}
                        {formatDateThai(selectedEvent.start, { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })} -{" "}
                        {formatDateThai(selectedEvent.end, { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p><strong>รายละเอียด:</strong> {selectedEvent.description}</p>
                    <button
                        onClick={() => setSelectedEvent(null)}
                        style={{ padding: "5px 10px", background: "red", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
                        ปิด
                    </button>
                </div>
            )}

            <BigCalendar
                events={events}
                views={["month", "week", "day"]}
                step={60}
                defaultView="month"
                localizer={localizer}
                popup={true}
                tooltipAccessor={(event) => event.title}
                onSelectEvent={(event) => setSelectedEvent(event)}
                messages={messages}
                formats={formats}
                className="my-calendar"
                style={{
                    height: "100vh",
                    fontFamily: "Sarabun, sans-serif", // ใช้ฟอนต์ไทย
                    color: "#333",
                    backgroundColor: "#fff",
                }}
                dayPropGetter={(date) => ({
                    style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: date.getDay() === 0 ? "blue" : "black", // เปลี่ยนสีตัวอักษรวันอาทิตย์เป็นสีฟ้า
                    },
                })}
            />
        </div>
    );
}

export default Calendar2;
