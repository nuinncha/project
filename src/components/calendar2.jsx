import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import th from "date-fns/locale/th";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/th";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("th");

const locales = { th };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const formatDateThai = (date, options) =>
  new Intl.DateTimeFormat("th-TH", { timeZone: "Asia/Bangkok", ...options }).format(date);

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
  dayFormat: (date) => formatDateThai(date, { weekday: "short" }),
  weekdayFormat: (date) => formatDateThai(date, { weekday: "long" }),
  monthHeaderFormat: (date) => formatDateThai(date, { month: "long", year: "numeric" }),
  dayHeaderFormat: (date) =>
    formatDateThai(date, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  dayRangeHeaderFormat: ({ start, end }) =>
    `${formatDateThai(start, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })} - ${formatDateThai(end, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`,
  timeGutterFormat: (date) => formatDateThai(date, { hour: "2-digit", minute: "2-digit", hour12: false }),
  eventTimeRangeFormat: ({ start, end }) =>
    `${formatDateThai(start, { hour: "2-digit", minute: "2-digit", hour12: false })} - ${formatDateThai(end, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`,
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
          const startDateOnly = dayjs(item.startDate).format("YYYY-MM-DD");
          const endDateOnly = dayjs(item.endDate).format("YYYY-MM-DD");

          const startDateTime = dayjs.tz(`${startDateOnly}T${item.startTime}`, "Asia/Bangkok").toDate();
          const endDateTime = dayjs.tz(`${endDateOnly}T${item.endTime}`, "Asia/Bangkok").toDate();

          let eventStyle = {};
          const room = item.roomName.trim();
          if (room === "ห้องประชุม 1") {
            eventStyle = { backgroundColor: "#e08c0dff", border: "0.5px solid #fff" };
          } else if (room === "อาคารเฉลิมพระเกียรติ") {
            eventStyle = { backgroundColor: "#3366FF", border: "0.5px solid #fff" };
          }

          return {
            title: `${item.topic} (${item.bookerName})`,
            start: startDateTime,
            end: endDateTime,
            room: item.roomName,
            booker: item.bookerName,
            description: item.description || "-",
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
          <p>
            <strong>หัวข้อ:</strong> {selectedEvent.title}
          </p>
          <p>
            <strong>ผู้จอง:</strong> {selectedEvent.booker}
          </p>
          <p>
            <strong>ห้อง:</strong> {selectedEvent.room}
          </p>
          <p>
            <strong>เวลา:</strong>{" "}
            {formatDateThai(selectedEvent.start, {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}{" "}
            -{" "}
            {formatDateThai(selectedEvent.end, {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
          <p>
            <strong>รายละเอียด:</strong> {selectedEvent.description}
          </p>
          <button
            onClick={() => setSelectedEvent(null)}
            style={{
              padding: "5px 10px",
              background: "red",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
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
        min={new Date(1970, 1, 1, 0, 0)}
        max={new Date(1970, 1, 1, 23, 59)}
        timeslots={1}
        localizer={localizer}
        popup={true}
        tooltipAccessor={(event) => event.title}
        onSelectEvent={(event) => setSelectedEvent(event)}
        messages={messages}
        formats={formats}
        className="my-calendar"
        style={{
          height: "100vh",
          fontFamily: "Sarabun, sans-serif",
          color: "#333",
          backgroundColor: "#fff",
        }}
        dayPropGetter={(date) => ({
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: date.getDay() === 0 ? "blue" : "black",
          },
        })}
        eventPropGetter={(event) => ({
          style: event.style || {},
        })}
      />
    </div>
  );
}

export default Calendar2;
