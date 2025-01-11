"use client"

import React, { useState, useEffect } from 'react'
import { seedDatabase } from './actions'

type Props = {}

export default function page({}: Props) {

  async function updateDb() {
    const response = await seedDatabase(); 
    if(response.success == true){
      console.log('it worked111')
    } else {
      console.log('fuck u nga'); 
    }
  }
  

  return (
      <div>
        <button onClick={() => updateDb()}>clickme</button>
      </div>
  )
}