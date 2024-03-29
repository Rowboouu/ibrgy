import React, { useEffect, useState } from 'react'
import Navbar2 from '../../components/Navbar2'
import Sidebar from '../../components/Sidebar'
import NotificationsIcon from "@mui/icons-material/Notifications";
import { format } from "date-fns";

const Notifications = ({ notifs, reads }) => {

  const status = ["Requested", "Ready for Pick-up", "Released", "Request Denied"];

  return (
    <div className="w-full h-full overflow-hidden">
      <h1 className="text-3xl font-bold my-3">Notifications</h1>
      <div className="flex flex-col w-full h-full items-center gap-2 my-2 overflow-auto">
        {notifs['notifs'].map((item) => {
          return (
            <div
              key={item.name}
              className="flex flex-row w-full bg-[#1F2F3D] hover:ring ring-[#FEC51C] rounded-[20px] text-white items-center cursor-pointer"
            >
              <div className={`w-20 h-full ${reads.includes(item.id) ? 'bg-[#1F2F3D]' : 'bg-[#FEC51C]'} flex items-center justify-center rounded-[20px] `}>
                < NotificationsIcon
                  className="rotate-[30deg]"
                  fontSize="large"
                  color="inherit"
                />
              </div>
              <div className="text-lg flex-1 px-4 flex flex-row items-center py-2 min-h-[64px]">
                <p className='leading-tight'>
                  <span className="font-bold">{status[item.status]}</span>{`: ${item["message"]} `}
                  <span className='pl-2 font-light text-sm italic'>{item["reason"] && `"${item["reason"]}"`}</span></p>
              </div>
              <p className="px-4 font-light italic">
                {format(item["createdAt"].toDate(), "MMMM dd")} at{" "}
                {format(item["createdAt"].toDate(), "p")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notifications