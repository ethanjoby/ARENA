"use server";

import { db } from "@/db";
import { counselors, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import type { signinSchemaType } from "./page";

export async function signInDb(data: signinSchemaType) {
    try {
        const { isCounselor, email, password } = data;

        if(isCounselor){
            const counselor = await db.query.counselors.findFirst({
                where: and(
                    eq(counselors.email, email),
                    eq(counselors.hashedPassword, password)
                )
            }); 

            if (!counselor) {
                return { success: false, error: "Invalid email or password" };
            }

            //const passwordMatch = await bcrypt.compare(password, counselor.hashedPassword);

            /* if (!passwordMatch) {
                return { success: false, error: "Invalid email or password" };
            } */

            const cookieStore = await cookies();

            cookieStore.set({
                name: 'counselorid',
                value: counselor.id,
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });


            cookieStore.set({
                name: 'counselorfullname',
                value: counselor.fullname,
                httpOnly: false,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });

            cookieStore.set({
                name: 'counseloremail',
                value: counselor.email,
                httpOnly: false,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });

            let counselorid = counselor.id; 
            
            return { success: true, counselorid };

        }

        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            return { success: false, error: "Invalid email or password" };
        }

        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

        if (!passwordMatch) {
            return { success: false, error: "Invalid email or password" };
        }

        const { id: userId, fullname, email: userEmail } = user;

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
            value: userEmail,
            httpOnly: false,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        return { success: true, userId };

    } catch (error) {
        console.error("Sign-in error:", error);
        return { success: false, error: "An error occurred during sign-in" };
    }
}