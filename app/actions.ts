"use server"

import { users } from "@/db/schema";
import { db } from "@/db";
import { InferInsertModel } from "drizzle-orm";

type UserInsert = InferInsertModel<typeof users>;  

/* const seedUsers: UserInsert[] = [
  {
    id: "userid1",
    fullname: "aaron rathore",
    grade: 12,
    email: "aaron.rathore987@gmail.com",
    hashedPassword: "password",
    phoneNumber: "925-336-2442",
    scheduleId: "scheduleid1",
    meetingId: "meetingid1",
    counselorId: "counselorid1",
  },
  {
    id: "userid2",
    fullname: "ethan smith",
    grade: 11,
    email: "ethan.smith123@gmail.com",
    hashedPassword: "password123",
    phoneNumber: "415-123-4567",
    scheduleId: "scheduleid2",
    meetingId: "meetingid2",
    counselorId: "counselorid2",
  },
  {
    id: "userid3",
    fullname: "ratul roy",
    grade: 10,
    email: "ratul.roy456@gmail.com",
    hashedPassword: "securepassword",
    phoneNumber: "510-987-6543",
    scheduleId: "scheduleid3",
    meetingId: "meetingid3",
    counselorId: "counselorid3",
  },
];

export async function seedDatabase() {
  try {
    for (const user of seedUsers) {
      await db.insert(users).values(user).execute();
    }
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

await seedDatabase(); */