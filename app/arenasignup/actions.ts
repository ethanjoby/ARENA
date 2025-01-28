"use server"

import { cookies } from "next/headers"
import { db } from "@/db"
import { eq, and, InferInsertModel } from "drizzle-orm"
import { users, initialprofile } from "@/db/schema"
import { v4 as uuid } from "uuid"

interface SignUpProfile {
    profile: {
        name: string;
        email: string;
        selectedPrograms: { value: string; label: string }[];
        selectedInternshipOptions: { value: string; label: string; price: number }[];
        selectedResumeOptions: { value: string; label: string; price: number }[];
        selectedSATPrep: { value: string; label: string; price: number };
        satOneHourCount: number;
        additionalInfo: string;
    }
}

export async function createProfile(data: SignUpProfile) {

    const { profile } = data; 

    let profileId = uuid(); 

    let response = await db.insert(initialprofile).values({
        id: profileId, 
        data: { 
            "name": profile.name, 
            "email": profile.email,
            "summerPrograms": [
                ...profile.selectedPrograms, 
            ],
            "internshinOption": profile.selectedInternshipOptions, 
            "resumeOptions": profile.selectedResumeOptions, 
            "testOptions": profile.selectedSATPrep, 
            "individualHours": profile.satOneHourCount,
            "additionalInfo": profile.additionalInfo, 
        },
    });

    if(response){
        console.log(response); 
        return { success: true }; 
    }

    return { success: false }; 
}