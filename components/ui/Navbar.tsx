"use client"

import React, { useRef } from 'react'

type Props = {
  id: string,
  display: boolean,
}

export default function Navbar({ id, display, ref }: { id: string, display: boolean, ref: any }) {

  return (
    <div id={id} ref={ref} className={`w-screen h-14 bg-white flex-row items-center z-20 fixed ${display ? "flex" : "hidden"} border-b border-b-black`}>
      <div>Navbar</div>
    </div>
  )
}