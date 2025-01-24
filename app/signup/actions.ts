"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt";
import { cookies } from "next/headers"

import type { userSchemaType } from "./page"

export async function signupuser(data: userSchemaType) {
    try {
        if (!data) throw new Error("Invalid input data");

        const { fullname, grade, email, password, phonenumber } = data; 

        const userId = uuid();
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkusers = await db.query.users.findFirst({
            where: and(
                eq(users.email, email), 
                eq(users.phoneNumber, phonenumber), 
            )
        }); 

        if(checkusers){
            throw new Error("nah man u already in teh damn db my nga"); 
        }

        const newuser = await db.insert(users).values({
            id: userId, 
            fullname: fullname, 
            grade: grade,
            email: email, 
            hashedPassword: hashedPassword,
            phoneNumber: phonenumber, 
            scheduleId: "", 
            meetingId: "", 
            counselorId: "", 
        }); 

        if(newuser){
           const cookieStore = await cookies(); 

           cookieStore.set({
                name: 'userid',
                value: userId,
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });

            cookieStore.set({
                name: 'userfullname',
                value: fullname,
                httpOnly: false,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });

            cookieStore.set({
                name: 'useremail',
                value: email,
                httpOnly: false,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });

            return { success: true }; 

        }

        return { success: false }; 

    } catch(error) {
        console.error("yeah man u too stupid to be consulted with my nga", error); 
    }
}
