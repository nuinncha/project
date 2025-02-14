import React from "react";

const DashboardCards = () => {
  return (
    <div className="flex gap-4">
      {/* การ์ดจองห้องประชุมวันนี้ */}
      <div className="flex items-center justify-between w-64 p-4 bg-green-400 rounded-lg shadow-lg text-white">
        <div>
          <p className="text-lg">จองห้องประชุม</p>
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm">การจองวันนี้</p>
        </div>
        <div className="text-4xl">📅</div>
      </div>

      {/* การ์ดจำนวนห้องประชุมทั้งหมด */}
      <div className="flex items-center justify-between w-64 p-4 bg-orange-400 rounded-lg shadow-lg text-white">
        <div>
          <p className="text-lg">ห้องประชุม</p>
          <p className="text-2xl font-bold">3</p>
          <p className="text-sm">ห้องประชุมทั้งหมด</p>
        </div>
        <div className="text-4xl">🏢</div>
      </div>
    </div>
  );
};

export default DashboardCards;
