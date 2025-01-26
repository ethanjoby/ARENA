"use client"

import React from 'react'

import UserCalender from '@/components/Islands/UserCalender'
import CounselorCalendar from '@/components/Islands/CounselorCalendar'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <UserCalender />
    </div>
  )
}