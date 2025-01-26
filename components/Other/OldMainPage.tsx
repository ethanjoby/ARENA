"use client"

import React, { useState, useEffect, useRef } from "react"; 
import { useAnimate, useTransform, useScroll, useMotionValueEvent } from "framer-motion";

import Navbar from "@/components/ui/Navbar";

type Props = {}

export default function page({}: Props) {
  
  const navref = useRef(null); 
  
  const { scrollY } = useScroll(); 

  useEffect(() => {
    const navbar = navref.current; 


  })

  const { scrollYProgress } = useScroll(); 

  return (
    <div className='w-screen h-[600vh] flex flex-col relative bg-white'>
      <Navbar id='navbar' ref={navref} display={false}/>
      <div className="w-screen h-[60vh] flex justify-center items-center flex-col relative border-b border-b-black">
        <ul className="leading-[4.5rem] text-center">
          <div className="text-[4rem] font-black text-black">College admissions are hard</div>
          <div className="text-[4rem] font-black text-black/80">but they don't have to suck</div>
        </ul>
        <ul className="flex flex-row gap-6 absolute bottom-20">
          <div className="w-36 h-10 rounded-md bg-black text-white font-black text-xl flex items-center justify-center">
            Try Now
          </div>
          <div className="w-36 h-10 rounded-md bg-white border border-gray-700 text-black font-black text-xl flex items-center justify-center">
            Contact Us
          </div>
        </ul>
      </div>
      <div className="w-screen h-[80vh] bg-black">

      </div>
      <div className="w-screen h-screen bg-green-400">

      </div>
      

    </div>
  )
}