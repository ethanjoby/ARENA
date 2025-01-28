"use client"

import React from 'react'

import CounselorCalendar from '@/components/Other/CounselorCalendar'
import { useRouter } from 'next/navigation'

type Props = {}

export default function page({}: Props) {

  const router = useRouter(); 

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <button onClick={() => router.push("/admin")}>Go to admin page</button>
      <CounselorCalendar />
    </div>
  )
}