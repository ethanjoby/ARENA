import React from 'react'
import Image from 'next/image'


type Props = {
    id: string,
    imageurl: string
    width: number, 
    height: number,
}

export default function Photo({ id, imageurl, width, height }: Props) {

  return (
    <div id={id} className="absolute opacity-0 border-8 rounded-md border-white">
        <Image src={`/Hero/${imageurl}`} alt={imageurl} width={width} height={height} />
    </div>
  )
}