"use client"

//make sure the middleware only lets in counselros into this page make it a protected rotue

import React, { useState, useEffect } from 'react'
import { getProfilesInfo } from './actions';

type Props = {}

export default function page({}: Props) {

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
        }[]
    }

    const isProfiles = (data: any): data is SignUpProfile => {
        return (
            data &&
            Array.isArray(data.profile) &&
            data.profile.every((item: any) =>
                typeof item.name === "string" &&
                typeof item.email === "string" &&
                typeof item.satOneHourCount === "number" &&
                typeof item.additionalInfo === "string" &&
                Array.isArray(item.selectedPrograms) &&
                item.selectedPrograms.every(
                    (program: any) =>
                        typeof program === "object" &&
                        program !== null &&
                        typeof program.value === "string" &&
                        typeof program.label === "string"
                ) &&
                Array.isArray(item.selectedInternshipOptions) &&
                item.selectedInternshipOptions.every(
                    (option: any) =>
                        typeof option === "object" &&
                        option !== null &&
                        typeof option.value === "string" &&
                        typeof option.label === "string" &&
                        typeof option.price === "number"
                ) &&
                Array.isArray(item.selectedResumeOptions) &&
                item.selectedResumeOptions.every(
                    (option: any) =>
                        typeof option === "object" &&
                        option !== null &&
                        typeof option.value === "string" &&
                        typeof option.label === "string" &&
                        typeof option.price === "number"
                ) &&
                typeof item.selectedSATPrep === "object" &&
                item.selectedSATPrep !== null &&
                typeof item.selectedSATPrep.value === "string" &&
                typeof item.selectedSATPrep.label === "string" &&
                typeof item.selectedSATPrep.price === "number"
            )
        );
    };

    const [profiles, setProfiles] = useState<SignUpProfile>({ profile: [] })

    useEffect(() => {
        let interval: any; 
        async function getUsersInfo() {
            let _profiles = await getProfilesInfo(); 
            if(_profiles && isProfiles(_profiles)){
                setProfiles(_profiles); 
            } else {
                console.error("Invalid data format:", _profiles);
            }
        }
        getUsersInfo(); 
        interval = setInterval(getUsersInfo, 10000);
        return () => interval && clearInterval(interval);
    }, []); 

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Sign-Up Profiles</h1>
            <div className="overflow-x-auto w-full px-4">
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Selected Programs</th>
                            <th className="px-4 py-2">Internship Options</th>
                            <th className="px-4 py-2">Resume Options</th>
                            <th className="px-4 py-2">SAT Prep</th>
                            <th className="px-4 py-2">SAT Hours</th>
                            <th className="px-4 py-2">Additional Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.profile.length > 0 ? (
                            profiles.profile.map((profile, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    }`}
                                >
                                    <td className="border px-4 py-2">{profile.name}</td>
                                    <td className="border px-4 py-2">{profile.email}</td>
                                    <td className="border px-4 py-2">
                                        {profile.selectedPrograms.map((program, index) => (
                                            <div key={program.label}>
                                                {index + 1}. {program.label}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {profile.selectedInternshipOptions
                                            .map(
                                                (option) =>
                                                    `${option.label} ($${option.price})`
                                            )
                                            .join(", ")}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {profile.selectedResumeOptions
                                            .map(
                                                (option) =>
                                                    `${option.label} ($${option.price})`
                                            )
                                            .join(", ")}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {`${profile.selectedSATPrep.label} ($${profile.selectedSATPrep.price})`}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {profile.satOneHourCount}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {profile.additionalInfo}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center border px-4 py-2"
                                >
                                    No profiles available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
  )
}