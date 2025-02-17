import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image'
import React, { useState } from 'react'
import { Record } from '../[uid]/page';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';


const SelectionDetails = ({record}: {record: Record}) => {
  const [onMouseHover, setOnMouseHover] = useState(false);

  return (
    <div className='p-5 bg-gray-100 h-[80vh] rounded-lg'>

      <h2 className=' font-bold my-2'>WireFrame:</h2>
      <Image src={record?.imageUrl} alt='wireframe' width={300} height={400}
        className='rounded-lg object-contain w-full h-1/2 border border-dashed 
        border-gray-400 p-1 bg-white'
      />

      <h2 className='mt-4 font-bold mb-2'>AI Model</h2>
      <Input className='bg-white'
        disabled={true} 
        defaultValue={record?.model}
      />

      <h2 className='mt-4 font-bold mb-2'>Description</h2>
      <Textarea className='bg-white h-[110px]'
        disabled={true} 
        defaultValue={record?.description}
      />

      <div onMouseEnter={()=> setOnMouseHover(true)} onMouseLeave={()=> setOnMouseHover(false)}>
        <Button
          className='mt-7 w-full bg-blue-500'> <RefreshCcw className={`${onMouseHover && ' rotate-90 duration-500 transition-all'}`}/> 
          Regenerate Code
        </Button>
      </div>
    </div>
  )
}

export default SelectionDetails