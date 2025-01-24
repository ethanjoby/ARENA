"use client"

import React, { useState, useEffect } from 'react'

import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { signupuser } from './actions'

const userSchema = z.object({
    fullname: z.string().min(2, "Please enter your real last name!"), 
    grade: z.number(),
    email: z.string().email("Invalid email!"),
    password: z.string().min(8, "Please make your password 8 characters long!"), 
    phonenumber: z.string().min(10, "Please enter your real school name!"),
});

export type userSchemaType = z.infer<typeof userSchema>;

type Props = {}

export default function page({}: Props) {

    const router = useRouter(); 

    const { register, handleSubmit, formState: { errors } } = useForm<userSchemaType>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = async (data: userSchemaType) => {
        console.log('Submitted data:', data);
        const sendToDb = await signupuser(data); 
        if(sendToDb){
            console.log("Data sent to db!"); 
            router.push("/home"); 
            
        } else {
            console.log("Error!"); 
        }
    };

  return (
    <div className="w-screen h-screen bg-white text-black text-2xl flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Full Name" {...register('fullname')} />
            {errors.fullname && <p>{errors.fullname.message}</p>}

            <input type="number" placeholder="Grade" {...register('grade', { valueAsNumber: true })} />
            {errors.grade && <p>{errors.grade.message}</p>}

            <input type="email" placeholder="Email" {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>} 

            <input type="password" placeholder="Password" {...register('password')} />
            {errors.password && <p>{errors.password.message}</p>}

            <input type="text" placeholder="Phone Number" {...register('phonenumber')} />
            {errors.phonenumber && <p>{errors.phonenumber.message}</p>}

            <button type="submit">Submit</button>
        </form>
    </div>
  )
}