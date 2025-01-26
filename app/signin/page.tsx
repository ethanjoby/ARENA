"use client"

import React from 'react'

import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { signInDb } from './actions';

type Props = {}

const signinSchema = z.object({ 
  email: z.string().email("Invalid email!"),
  password: z.string().min(8, "Please make sure you entered the right password!"), 
  isCounselor: z.boolean().default(false), 
})

export type signinSchemaType = z.infer<typeof signinSchema>; 

export default function page({}: Props) {

  const router = useRouter(); 

  const { register, handleSubmit, formState: { errors } } = useForm<signinSchemaType>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: signinSchemaType) => {
    console.log('Submitted data:', data);
    const response = await signInDb(data); 
    console.log(response);
    if(response.success == true){
      if(response.counselorid){
        router.push(`/home/counselor/${response.counselorid}`); 
      } else {
        router.push(`/home/user/${response.userId}`); 
      }
    } else { 
      return <p>yo homie something aint right</p>
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
       <form onSubmit={handleSubmit(onSubmit)}>
            <input type="checkbox" placeholder="Yes" {...register('isCounselor')} />
            {errors.isCounselor && <p>{errors.isCounselor.message}</p>}
            <input type="email" placeholder="Email" {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>} 
            <input type="password" placeholder="password" {...register('password')} />
            {errors.password && <p>{errors.password.message}</p>}
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}