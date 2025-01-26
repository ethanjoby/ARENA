"use client"

import React, { useState, useEffect } from 'react'
import { getCalendarInfo } from '@/app/home/counselor/[...counselorId]/actions'

type Props = {}

export default function UserCalender({}: Props) {

    type UserCalenderData = {
        events: { day: string, timeslots: { time: string, counselorname: string, counseloremail: string, meetinglink: string }[] }[]
    } | null; 

    const [scheduleData, setScheduleData] = useState<UserCalenderData>(null); 

    const isUserCalenderData = (data: any): data is NonNullable<UserCalenderData> => {
        return (
            data &&
            Array.isArray(data.events) &&
            data.events.every(
                (item: any) => 
                typeof item.day === "string" &&
                Array.isArray(item.timeslots) && 
                item.timeslots.every(
                    (slot: any) => 
                        typeof slot === "object" &&
                        slot !== null &&
                        typeof slot.time === "string" && 
                        typeof slot.counselorname === "string" &&
                        typeof slot.counseloremail === "string" &&
                        typeof slot.meetinglink === "string"
                )
            )
        )
    }

    useEffect(() => {
        let interval: any; 
        async function getCalInfo() {
            const calendarData = await getCalendarInfo(); 
            if(calendarData.calenderdata && isUserCalenderData(calendarData.calenderdata)){
                setScheduleData(calendarData.calenderdata); 
            } else {
                console.log("invalid data format my man", calendarData.calenderdata);
                setScheduleData(null);
            }
        }
        getCalInfo(); 
        interval = setInterval(getCalInfo, 10000); 
        return () => clearInterval(interval); 
    }, []);

    if (!scheduleData) {
        return (
          <div className="w-3/4 p-4 rounded-lg bg-orange-300 absolute bottom-0 text-center">
            <h2 className="text-xl font-bold mb-4">User Schedule</h2>
            <p>No data available.</p>
          </div>
        );
    }

  return (
    <div className="w-3/4 p-4 rounded-lg bg-orange-300 absolute bottom-0">
      <h2 className="text-center text-xl font-bold mb-4">User Schedule</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Day</th>
            <th className="border px-4 py-2">Time Slots</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.events.length > 0 ? (
            scheduleData.events.map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{entry.day}</td>
                <td className="border px-4 py-2">
                  {entry.timeslots.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {entry.timeslots.map((slot, idx) => (
                        <li key={idx} className="mb-2">
                          <span className="font-bold">{slot.time}:</span>{" "}
                          {slot.counselorname} (
                          <a
                            href={`mailto:${slot.counseloremail}`}
                            className="text-blue-500 underline"
                          >
                            {slot.counseloremail}
                          </a>
                          ) -{" "}
                          <a
                            href={slot.meetinglink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            Meeting Link
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No time slots"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="border px-4 py-2 text-center">
                No schedule data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}