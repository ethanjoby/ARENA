"use server";

import { db } from "@/db";
import { users, counselors, counselorSchedules, userSchedule } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { InferInsertModel } from "drizzle-orm";

let isCounselor: boolean = false; 

export async function getInfo() {
    const cookieStore = await cookies();
    const counselorId = cookieStore.get("counselorid")?.value;
    const userId = cookieStore.get("userid")?.value;

    if (counselorId) {
        const counselor = await db.query.counselors.findFirst({
            where: eq(counselors.id, counselorId),
        });

        if (counselor) {
            !isCounselor; 
            return { counselorId, isCounselor }; 
        }

    } else if (userId) {
        const user = await db.query.users.findFirst({
            where: eq(users.id, userId),
        });

        if (user) {
            isCounselor; 
            return { userId, isCounselor }; 
        }
    }
}

export async function getCalendarInfo() {
    const subject = await getInfo();
  
    if (subject) {
      if (!subject.isCounselor && subject.counselorId) {
        const calendarInfo = await db.query.counselorSchedules.findFirst({
          where: eq(counselorSchedules.counselorId, subject.counselorId),
        });
  
        let calenderdata = calendarInfo?.data; 
        return { calenderdata };
      } else {
        if(subject.userId){
            const calendarInfo = await db.query.userSchedule.findFirst({
                where: eq(userSchedule.userId, subject.userId),
            });

            let calenderdata = calendarInfo?.data; 
            return { calenderdata };
        }
      }
    }
  
    return { calenderdata: null }
}


