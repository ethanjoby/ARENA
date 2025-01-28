"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { initialprofile, users } from "@/db/schema";

type SignUpProfile = {
    profile: {
        name: string;
        email: string;
        selectedPrograms: { value: string; label: string }[];
        selectedInternshipOptions: { value: string; label: string; price: number }[];
        selectedResumeOptions: { value: string; label: string; price: number }[];
        selectedSATPrep: { value: string; label: string; price: number };
        satOneHourCount: number;
        additionalInfo: string;
    }[]
}

export async function getProfilesInfo(): Promise<SignUpProfile> {
    let response = await db.query.initialprofile.findMany({
        columns: {
            data: true
        }
    });

    const transformedData: SignUpProfile = {
        profile: response.map((row: any) => ({
            name: row.data.name,
            email: row.data.email,
            selectedPrograms: row.data.selectedPrograms,
            selectedInternshipOptions: row.data.selectedInternshipOptions,
            selectedResumeOptions: row.data.selectedResumeOptions,
            selectedSATPrep: row.data.selectedSATPrep,
            satOneHourCount: parseInt(row.data.satOneHourCount),
            additionalInfo: row.data.additionalInfo,
        }))
    };

    console.log("Server response:", JSON.stringify(transformedData, null, 2));

    return transformedData;
}