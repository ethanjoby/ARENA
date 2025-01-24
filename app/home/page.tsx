"use client"

import React from 'react'

import CounselorCalendar from '@/components/Other/CounselorCalendar'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <CounselorCalendar />
    </div>
  )
}