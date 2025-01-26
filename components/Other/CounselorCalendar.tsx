"use client";

import { getCalendarInfo } from '@/app/home/counselor/[...counselorId]/actions';
import React, { useState, useEffect } from 'react';

type Props = {};

interface CounselorScheduleData {
  booked: { day: string; timeSlots: { open: boolean, clientname?: string, clientemail?: string, meetinglink?: string }[] }[];
}

export default function CounselorCalendar({}: Props) {
  const [scheduleData, setScheduleData] = useState<CounselorScheduleData>({ booked: [] });

  const isCounselorScheduleData = (data: any): data is CounselorScheduleData => {
    return (
      data &&
      Array.isArray(data.booked) &&
      data.booked.every(
        (item: any) =>
          typeof item.day === "string" &&
          Array.isArray(item.timeSlots) &&
          item.timeSlots.every(
            (slot: any) =>
              typeof slot === "object" &&
              slot !== null &&
              typeof slot.open === "boolean" &&
              (slot.clientname === undefined || typeof slot.clientname === "string") &&
              (slot.clientemail === undefined || typeof slot.clientemail === "string") &&
              (slot.meetinglink === undefined || typeof slot.meetinglink === "string")
          )
      )
    );
  };

  useEffect(() => {
    let interval: any;

    async function fetchSchedule() {
      const calendarData = await getCalendarInfo();
      const parsedcalendarData = calendarData.calenderdata; 

      if (calendarData && isCounselorScheduleData(parsedcalendarData)) {
        setScheduleData(parsedcalendarData);
      } else {
        console.error("Invalid data format:", calendarData);
      }
    }

    fetchSchedule();
    interval = setInterval(fetchSchedule, 10000);

    return () => interval && clearInterval(interval);
  }, []);

  console.log(scheduleData); 

  return (
  <div className="w-3/4 p-4 rounded-lg bg-orange-300 absolute bottom-0">
  <h2 className="text-center text-xl font-bold mb-4">Counselor Schedule</h2>
  <table className="w-full table-auto border-collapse">
    <thead>
      <tr>
        <th className="border px-4 py-2">Day</th>
        <th className="border px-4 py-2">Time Slots</th>
      </tr>
    </thead>
    <tbody>
      {scheduleData.booked.length > 0 ? (
        scheduleData.booked.map((entry, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{entry.day}</td>
            <td className="border px-4 py-2">
              {entry.timeSlots.length > 0 ? (
                <ul className="list-disc pl-5">
                  {entry.timeSlots.map((slot, idx) => (
                    <li key={idx} className="mb-2">
                      <span className="font-bold">{slot.open ? "Open" : "Booked"}:</span>{" "}
                      {!slot.open ? (
                        <span>
                          {slot.clientname} ({slot.clientemail}) -{" "}
                          <a
                            href={slot.meetinglink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            Meeting Link
                          </a>
                        </span>
                      ) : (
                        "Available"
                      )}
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
  );
}